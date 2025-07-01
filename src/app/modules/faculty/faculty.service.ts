import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { FacultySearchableFields } from './faculty.constant';
import { TFaculty } from './faculty.interface';
import { Faculty } from './faculty.model';
import httpStatus from 'http-status';
import { User } from '../user/user.model';

const getAllFacultiesFromDB = async (query: Record<string, unknown>) => {
  const facultyQuery = new QueryBuilder(
    Faculty.find().populate('academicDepartment'),
    //   .populate({
    //     path: 'academicDepartment',
    //     populate: {
    //       path: 'academicFaculty',
    //     },
    //   })
    query,
  )
    .search(FacultySearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await facultyQuery.modelQuery;
  return result;
};

const getSingleFacultyFromDB = async (id: string) => {
  const result = await Faculty.findById(id).populate('academicDepartment');
  if (!result) {
    throw new Error('faculty does not exist');
  }
  // const result = await Faculty.findOne({id});// for objectID
  return result;
};

const updateFacultyIntoDb = async (id: string, payload: Partial<TFaculty>) => {
  const { name, ...remainingFacultyData } = payload;
  const modifiedData: Record<string, unknown> = { ...remainingFacultyData };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedData[`name.${key}`] = value;
    }
  }

  // console.log(modifiedData);

  const result = await Faculty.findByIdAndUpdate(id, modifiedData, {
    new: true,
    runValidators: true,
  }).populate('academicDepartment');
  return result;
};

const deleteFacultyFromDB = async (id: string) => {
  // 1. Validate ID format (no transaction needed)
  if (!mongoose.isValidObjectId(id)) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Invalid faculty ID format');
  }

  // 2. Using the static method to check if faculty exists (still outside transaction)
  const existingFaculty = await Faculty.isUserExists(id);
  if (!existingFaculty || existingFaculty.isDeleted) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'faculty does not exist or has already been deleted',
    );
  }
  const session = await mongoose.startSession();
  try {
    // findById for mongoose objectId
    session.startTransaction();
    // // 1. Use the static method to check if faculty exists

    const deletedFaculty = await Faculty.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true },
    );
    if (!deletedFaculty) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete faculty');
    }
    const userId = deletedFaculty.user;

    const deletedUser = await User.findByIdAndUpdate(
      userId,
      { isDeleted: true },
      { new: true, session },
    );
    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user');
    }
    await session.commitTransaction();
    // await session.endSession();
    return deletedFaculty;
  } catch (err) {
    await session.abortTransaction();
    // await session.endSession();

    // throw new Error('Failed to delete faculties');
    throw err;
  } finally {
    await session.endSession();
  }
};

export const FacultyServices = {
  getAllFacultiesFromDB,
  getSingleFacultyFromDB,
  updateFacultyIntoDb,
  deleteFacultyFromDB,
};
