import config from '../../config';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  //   if (await Student.isUserExists(studentData.id)) {
  //     throw new Error('user already exist');
  //   }

  // create a user object
  const userData: Partial<TUser> = {};
  // const userData: newUser = {};

  //if password is not given , use default password
  userData.password = password || (config.default_password as string);

  // if (!password) {
  //   userData.password = config.default_password as string;
  // }
  // else{
  //   userData.password=password
  // }

  //set student role
  userData.role = 'student';

  //set manually generated it
  //this is not ideal , we generate id by using transaction rollback (later)
  userData.id = '2030100001';

  // create a user
  const newUser = await User.create(userData);

  //create a student
  //Object key array hisebe asbe
  if (Object.keys(newUser).length) {
    // set id , _id as user
    studentData.id = newUser.id;
    studentData.user = newUser._id; //reference _id

    const newStudent = await Student.create(studentData);
    return newStudent;
  }

  // const result = await User.create(studentData); //built in static method

  // return result;
};
export const UserServices = {
  createStudentIntoDB,
};
