import express from 'express';
import { UserControllers } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { createStudentValidationSchema } from '../student/student.zod.validation';

const router = express.Router();

router.post(
  '/create-student',
  //   validateRequest(StudentValidations.createStudentValidationSchema),
  validateRequest(createStudentValidationSchema),
  UserControllers.createStudent,
);

export const UserRoutes = router;
