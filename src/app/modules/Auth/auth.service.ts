import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import jwt from 'jsonwebtoken';
import config from '../../config';

const loginUser = async (payload: TLoginUser) => {
  console.log('\n incoming payload:', payload);

  // checking if the user is exist
  const user = await User.isUserExistsByCustomId(payload.id);
  console.log('\n user is:', user);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }
  // checking if the user is already deleted

  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
  }

  // checking if the user is blocked

  const userStatus = user?.status;

  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !');
  }

  //checking if the password is correct
  const passwordMatched = await User.isPasswordMatched(
    payload?.password,
    user?.password,
  );
  // console.log(passwordMatched);
  if (!passwordMatched) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');
  }

  // create token and sent to the  client
  const jwtPayload = {
    userId: user.id,
    role: user.role,
  };

  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: '10d',
  });

  //   const jwtPayload = {
  //     userId: user.id,
  //     role: user.role,
  //   };

  //   const accessToken = createToken(
  //     jwtPayload,
  //     config.jwt_access_secret as string,
  //     config.jwt_access_expires_in as string,
  //   );

  //   const refreshToken = createToken(
  //     jwtPayload,
  //     config.jwt_refresh_secret as string,
  //     config.jwt_refresh_expires_in as string,
  //   );

  return {
    accessToken,
    // refreshToken,
    needsPasswordChange: user?.needsPasswordChange,
  };
};
export const AuthServices = {
  loginUser,
  //   changePassword,
  //   refreshToken,
};
