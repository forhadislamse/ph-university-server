import { Response } from 'express';

type TResponse<T> = {
  statusCode: number;
  success: boolean;
  message?: string;
  data: T;
};

const sendResponse = <T>(res: Response, data: TResponse<T>) => {
  res.status(data?.statusCode).json({
    success: data.success,
    message: data.message,
    data: data.data,
  });
};

export default sendResponse;

/* const sendResponse = <T>(res:Response,data:{
    statusCode:number;
    success:boolean;
    message:string;
    data:T //data can be array,array of object,object, string, anything ,that why we use generic
}) => {
    res.status(data?.statusCode).json({
        success: data.success,
        message: data.message,
        data: data.data,
});
}
export default sendResponse;
 */
