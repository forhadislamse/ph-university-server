export type TErrorSources = {
  // path: (string | number)[];
  path: string | number;
  message: string;
}[]; //array of object

export type TGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorSources: TErrorSources;
};
