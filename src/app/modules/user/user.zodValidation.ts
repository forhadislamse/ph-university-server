import { z } from 'zod';

const userValidationSchema = z.object({
  //   id: z.string(),//id backend theke pathabo
  // password optional
  password: z
    .string({
      invalid_type_error: 'Password must be string',
    })
    .max(20, { message: 'Password can not be more than 20 characters' })
    .optional(),
  //   needsPasswordChange: z.boolean().optional().default(true),
  //   role: z.enum(['student', 'faculty', 'admin']), //role api endpoint theke hobe
  //   status: z.enum(['in-progress', 'blocked']).default('in-progress'),
  //   isDeleted: z.boolean().default(false),
});

export const UserValidation = {
  userValidationSchema,
};
