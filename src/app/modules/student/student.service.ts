// /* eslint-disable @typescript-eslint/no-unused-vars */
import mongoose from 'mongoose';
import { Student } from './student.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { User } from '../user/user.model';
import { TStudent } from './student.interface';

const getAllStudentsFromDB = async () => {
  const result = await Student.find()
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findOne({ id })
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  if (!result) {
    throw new Error('student does not exist');
  }
  // const result = await Student.findById(id);// for objectID
  return result;
};

const updateStudentIntoDb = async (id: string, payload: Partial<TStudent>) => {
  const { name, guardian, localGuardian, ...remainingStudentData } = payload;
  const modifiedData: Record<string, unknown> = { ...remainingStudentData };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedData[`name.${key}`] = value;
    }
  }

  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedData[`guardian.${key}`] = value;
    }
  }
  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedData[`localGuardian.${key}`] = value;
    }
  }
  // console.log(modifiedData);

  /* const flattenNestedField = (
    fieldData: Record<string, unknown> | undefined, //nested object for name, guardian etc
    fieldName: string,
    target: Record<string, unknown>,
  ) => {
    if (fieldData && Object.keys(fieldData).length) {
      for (const [key, value] of Object.entries(fieldData)) {
        target[`${fieldName}.${key}`] = value;
      }
    }
  };
  flattenNestedField(name, 'name', modifiedData);
  flattenNestedField(guardian, 'guardian', modifiedData);
  flattenNestedField(localGuardian, 'localGuardian', modifiedData); */

  const result = await Student.findOneAndUpdate(
    { id, isDeleted: false },
    modifiedData,
    { new: true, runValidators: true },
  );
  return result;
};

const deleteStudentFromDB = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    // findById for mongoose objectId
    session.startTransaction();
    // // 1. Use the static method to check if student exists
    const existingStudent = await Student.isUserExists(id);

    if (!existingStudent || existingStudent.isDeleted) {
      throw new AppError(
        httpStatus.NOT_FOUND,
        'Student does not exist or has already been deleted',
      );
    }

    const deletedStudent = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true },
    );
    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete student');
    }

    const deletedUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );
    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user');
    }
    await session.commitTransaction();
    await session.endSession();
    return deletedStudent;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    // throw new Error('Failed to delete students');
    throw err;
  }
};
export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  updateStudentIntoDb,
  deleteStudentFromDB,
};
