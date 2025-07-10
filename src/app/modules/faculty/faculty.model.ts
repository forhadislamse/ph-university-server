import { model, Schema } from 'mongoose';
import { FacultyModel, TFaculty, TUserName } from './faculty.interface';
import { BloodGroup, Gender } from './faculty.constant';
import validator from 'validator';

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'First name is required.'],
    maxLength: [20, 'Name can not be more than 20 characters'],
  },

  middleName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, 'Last Name is required'],
    maxLength: [20, 'Name can not be more than 20 characters'],
  },
});

// Main faculty schema
const facultySchema = new Schema<TFaculty, FacultyModel>(
  {
    id: {
      type: String,
      required: [true, 'Faculty ID is required.'],
      unique: true,
    },
    // here we use User model for referencing
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'User id is required'],
      unique: true,
      ref: 'User',
    },
    designation: {
      type: String,
      required: [true, 'designation is required'],
    },

    name: {
      type: userNameSchema,
      required: [true, 'Name is required.'],
    },
    gender: {
      type: String,
      enum: {
        values: Gender,
        message: '{VALUE} is not a valid gender.',
      },
      required: [true, 'Gender is required.'],
    },
    dateOfBirth: {
      // type: Date,
      type: String,
    },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      validate: {
        validator: (value) => validator.isEmail(value),
        message: '{VALUE} is not valid email',
      },
    },
    contactNo: {
      type: String,
      required: [true, 'Contact number is required.'],
    },
    emergencyContactNo: {
      type: String,
      required: [true, 'Emergency contact number is required.'],
    },
    bloodGroup: {
      type: String,
      enum: {
        values: BloodGroup,
        message: '{VALUE} is not a valid blood group.',
      },
      required: [true, 'Blood group is required.'],
    },
    presentAddress: {
      type: String,
      required: [true, 'Present address is required.'],
    },
    permanentAddress: {
      type: String,
      required: [true, 'Permanent address is required.'],
    },

    profileImg: {
      type: String,
    },

    academicDepartment: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicDepartment',
      required: [true, 'Academic Department is required'],
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);
// virtually generate full name
facultySchema.virtual('fullName').get(function () {
  return `${this?.name?.firstName} ${this?.name?.middleName} ${this?.name?.lastName}`;
});

// middleware/hooks

//query middleware
// filter out deleted documents

facultySchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

facultySchema.pre('findOne', function (next) {
  this.findOne({ isDeleted: { $ne: true } });
  next();
});

//checking if user is already exist!
facultySchema.statics.isUserExists = async function (id: string) {
  return await Faculty.findById(id); //isDeleted:false
};

export const Faculty = model<TFaculty, FacultyModel>('Faculty', facultySchema);
