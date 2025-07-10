// import { NextFunction, Request, Response } from 'express';
import config from '../config';
import AppError from '../errors/AppError';
import catchAsync from '../utils/catchAsync';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';

// export interface CustomRequest extends Request {
//   user: JwtPayload;
// }
const auth = () => {
  return catchAsync(async (req, res, next) => {
    // console.log(req.headers.authorization);
    const token = req.headers.authorization;
    // console.log(token);

    // checking if the token is missing
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
    }

    // checking if the given token is valid

    jwt.verify(
      token,
      config.jwt_access_secret as string,
      function (err, decoded) {
        // err
        if (err) {
          throw new AppError(
            httpStatus.UNAUTHORIZED,
            'You are not authorized!',
          );
        }
        // decoded undefined
        // console.log(decoded);
        // { userId: 'A-0001', role: 'admin', iat: 1752168327, exp: 1753032327 }
        req.user = decoded as JwtPayload;
        next();
      },
    );
  });
};

export default auth;
