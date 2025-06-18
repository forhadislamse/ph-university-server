import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { User } from './user.model';

const findLastStudentId = async () => {
  const lastStudent = await User.findOne(
    {
      role: 'student',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({ createdAt: -1 })
    .lean();

  // return lastStudent?.id ? lastStudent.id.substring(6) : undefined;
  return lastStudent?.id ? lastStudent.id : undefined;
};

export const generateStudentId = async (payload: TAcademicSemester) => {
  // first time 0000
  //0001  => 1
  let currentId = (0).toString(); // 0000 by deafult

  const lastStudentId = await findLastStudentId();
  // 2030 01 0001
  const lastStudentSemesterCode = lastStudentId?.substring(4, 6); //01;
  const lastStudentYear = lastStudentId?.substring(0, 4); // 2030
  const currentSemesterCode = payload.code;
  const currentYear = payload.year;
  // console.log(
  //   `currentId ${currentId},
  //   lastStudentSemesterCode ${lastStudentSemesterCode},
  //   lastStudentId ${lastStudentId},
  //   currentYear ${currentYear},
  //   currentSemesterCode ${currentSemesterCode},
  //   lastStudentYear ${lastStudentYear} `,
  // );

  if (
    lastStudentId &&
    lastStudentSemesterCode === currentSemesterCode &&
    lastStudentYear === currentYear
  ) {
    currentId = lastStudentId.substring(6); // 0001
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

  incrementId = `${payload.year}${payload.code}${incrementId}`;

  return incrementId;
};

// import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
// import { User } from './user.model';

// /**
//  * Find the last student ID for the current academic semester
//  * Only matches students whose ID starts with the current semester's year + code
//  */
// const findLastStudentId = async (payload: TAcademicSemester) => {
//   const semesterPrefix = `${payload.year}${payload.code}`; // e.g. "203001"

//   const lastStudent = await User.findOne(
//     {
//       role: 'student',
//       id: { $regex: `^${semesterPrefix}` }, // match only current semester students
//     },
//     {
//       id: 1,
//       _id: 0,
//     },
//   )
//     .sort({ createdAt: -1 }) // latest student first
//     .lean();

//   return lastStudent?.id ? lastStudent.id.substring(6) : undefined; // return last 4 digits
// };

// /**
//  * Generate a new student ID using semester prefix + 4-digit serial
//  * Starts from 0001 if new semester, otherwise increments
//  */
// export const generateStudentId = async (payload: TAcademicSemester) => {
//   const currentId = (await findLastStudentId(payload)) || '0000'; // start from 0000
//   const serial = (Number(currentId) + 1).toString().padStart(4, '0'); // e.g. "0005"
//   return `${payload.year}${payload.code}${serial}`; // e.g. "2030010005"
// };
