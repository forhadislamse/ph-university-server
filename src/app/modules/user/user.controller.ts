import { Request, Response } from 'express';
import { UserServices } from './user.services';
// import studentValidationSchema from '../student/student.zod.validation';

const createStudent = async (req: Request, res: Response) => {
  try {
    const { password, student: studentData } = req.body; //destructure (req.body.student) name alias

    // const zodParsedData = studentValidationSchema.parse(studentData);
    // const result = await UserServices.createStudentIntoDB(zodParsedData);

    const result = await UserServices.createStudentIntoDB(
      password,
      studentData,
    );
    res.status(200).json({
      success: true,
      message: 'student create successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    });
    // console.log(err);
  }
};

export const UserControllers = {
  createStudent,
};
