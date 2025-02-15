import Joi from 'joi';

// UserName validation schema
const userNameValidationSchema = Joi.object({
  firstName: Joi.string()
    .required()
    .max(20)
    .regex(/^[A-Z][a-z]*$/)
    .message('First name must start with a capital letter.'),
  middleName: Joi.string().trim(),
  lastName: Joi.string()
    .trim()
    .required()
    .regex(/^[A-Za-z]+$/)
    .message('{#value} is not a valid last name'),
});

// Guardian validation schema
const guardianValidationSchema = Joi.object({
  fatherName: Joi.string().trim().required(),
  fatherOccupation: Joi.string().trim().required(),
  fatherContactNo: Joi.string().required(),
  motherName: Joi.string().trim().required(),
  motherOccupation: Joi.string().required(),
  motherContactNo: Joi.string().required(),
});

// LocalGuardian validation schema
const localGuardianValidationSchema = Joi.object({
  name: Joi.string().trim().required(),
  occupation: Joi.string().required(),
  contactNo: Joi.string().required(),
  address: Joi.string().required(),
});

// Main Student validation schema
const studentValidationSchema = Joi.object({
  id: Joi.string().required(),
  name: userNameValidationSchema.required(),
  gender: Joi.string().valid('male', 'female', 'other').required(),
  dateOfBirth: Joi.string(),
  email: Joi.string().required().email(),
  contactNo: Joi.string().required(),
  emergencyContactNo: Joi.string().required(),
  bloodGroup: Joi.string()
    .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
    .required(),
  presentAddress: Joi.string().required(),
  permanentAddress: Joi.string().required(),
  guardian: guardianValidationSchema.required(),
  localGuardian: localGuardianValidationSchema.required(),
  profileImg: Joi.string(),
  isActive: Joi.string().valid('active', 'blocked').default('active'),
});

export default studentValidationSchema;
