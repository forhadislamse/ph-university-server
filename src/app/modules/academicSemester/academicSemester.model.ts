// import { academicSemesterNameCodeMapper } from './academicSemester.constant';
import { model, Schema } from 'mongoose';
import { TAcademicSemester } from './academicSemester.interface';
import {
  AcademicSemesterCode,
  AcademicSemesterName,
  Months,
} from './academicSemester.constant';

const academicSemesterSchema = new Schema<TAcademicSemester>(
  {
    name: {
      type: String,
      required: true,
      enum: AcademicSemesterName,
    },
    year: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
      enum: AcademicSemesterCode,
    },
    startMonth: {
      type: String,
      required: true,
      enum: Months,
    },
    endMonth: {
      type: String,
      required: true,
      enum: Months,
    },
  },
  {
    timestamps: true,
  },
);

//validate year and name , name bochore ekbar e hobe
academicSemesterSchema.pre('save', async function (next) {
  const isSemesterExists = await AcademicSemester.findOne({
    year: this.year,
    name: this.name,
  });

  if (isSemesterExists) {
    throw new Error('Semester is already exists !');
  }
  next();
});

//check update

// academicSemesterSchema.pre('findOneAndUpdate', async function (next) {
//   const update = this.getUpdate() as {
//     name?: string;
//     code?: string;
//     year?: string;
//   }; // The incoming payload
//   const query = this.getQuery(); // The filter (like _id)

//   // Get the current document
//   const currentSemester = await AcademicSemester.findOne(query);
//   if (!currentSemester) {
//     throw new Error('Academic semester not found');
//   }
/* 
// Make sure update is not an aggregation pipeline
  if (!Array.isArray(update)) {
    const nameToCheck = update.name || currentSemester.name;
    const codeToCheck = update.code || currentSemester.code;

    if (academicSemesterNameCodeMapper[nameToCheck] !== codeToCheck) {
      throw new Error('Invalid Semester Code');
    }

    const isDuplicate = await AcademicSemester.findOne({
      _id: { $ne: currentSemester._id },
      name: nameToCheck,
      year: update.year || currentSemester.year,
    });

    if (isDuplicate) {
      throw new Error('Semester with the same name and year already exists!');
    }
  } */
//   // Use either updated value or existing one
//   const nameToCheck = update.name || currentSemester.name;
//   const codeToCheck = update.code || currentSemester.code;

//   // Validate name-code mapping
//   if (academicSemesterNameCodeMapper[nameToCheck] !== codeToCheck) {
//     throw new Error('Invalid Semester Codes');
//   }
//   const isDuplicate = await AcademicSemester.findOne({
//     _id: { $ne: currentSemester._id },
//     name: nameToCheck,
//     year: update.year || currentSemester.year,
//   });

//   if (isDuplicate) {
//     throw new Error('Semester with the same name and year already exists!');
//   }

//   next();
// });

export const AcademicSemester = model<TAcademicSemester>(
  'AcademicSemester',
  academicSemesterSchema,
);
