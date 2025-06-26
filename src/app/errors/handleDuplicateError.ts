/* eslint-disable @typescript-eslint/no-explicit-any */
import { TErrorSources, TGenericErrorResponse } from '../interface/error';

const handleDuplicateError = (err: any): TGenericErrorResponse => {
  /*   // Extract value within double quotes using regex
  const match = err.message.match(/"([^"]*)"/); // match = ['"Department of CSE"', 'Department of CSE']

  // The extracted value will be in the first capturing group
  const extractedMessage = match && match[1]; // extractedMessage = 'Department of CSE'

  const errorSources: TErrorSources = [
    {
      path: '',
      message: `${extractedMessage} is already exists`,
    },
  ]; */
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
