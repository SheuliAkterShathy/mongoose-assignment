import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { userRoutes } from './app/modules/user/user.route';
// import { StudentRoutes } from './app/modules/student/student.route';
const app: Application = express();
// const port = 3000

// parses
app.use(express.json());
app.use(cors());

// applications routes
// app.use('/api/v1/students', StudentRoutes);
app.use('/api/users', userRoutes);

const getController = (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'welcome to the mongoose-assignment',
  });
};
app.get('/', getController);

export default app;
