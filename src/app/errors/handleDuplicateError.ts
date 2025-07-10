/* eslint-disable @typescript-eslint/no-explicit-any */
import { TErrorSources, TGenericErrorResponse } from '../interface/error';

const handleDuplicateError = (err: any): TGenericErrorResponse => {
  const statusCode = 400;
  const duplicatedField = Object.keys(err.keyValue || {})[0] || '';
  //If it’s undefined or null, use an empty object {} instead.
  const duplicatedValue = err.keyValue[duplicatedField] || '';
  const errorSources: TErrorSources = [
    {
      path: duplicatedField,
      message: `${duplicatedValue} already exists`,
    },
  ];
  return {
    statusCode,
    message: `Duplicate entry for ${duplicatedField}:"${duplicatedValue}"`,
    errorSources,
  };
};

export default handleDuplicateError;
