import express, { Application, Request, Response } from 'express';
// import cors from 'cors';
import { StudentRoutes } from './app/modules/student.route';
const app: Application = express();

// const port = 3000

// parsers
app.use(express.json());
// app.use(cors());

// application routes
app.use('/api/v1/students', StudentRoutes);

const getAController = (req: Request, res: Response) => {
  const a = 10;
  res.json({
    data: a, // get data
  });
};
app.get('/', getAController);
// console.log(process.cwd());
export default app;
