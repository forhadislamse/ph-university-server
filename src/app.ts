import express, { Application, Request, Response } from 'express';
// import cors from 'cors';
// import { StudentRoutes } from './app/modules/student/student.route';
// import { UserRoutes } from './app/modules/user/user.routes';
import globalErrorHandler from './app/middlewares/globalErrorhandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';

const app: Application = express();

// parsers
app.use(express.json());
// app.use(cors());

// application routes
// app.use('/api/v1/students', StudentRoutes);
// app.use('/api/v1/users', UserRoutes);

app.use('/api/v1', router);

const tester = (req: Request, res: Response) => {
  const a = 10;
  res.json({
    data: a, // get data
  });
};
app.get('/', tester);

// console.log(process.(cwd));
app.use(globalErrorHandler);
app.use(notFound);
export default app;
