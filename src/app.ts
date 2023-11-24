import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { userRoutes } from './app/modules/user/user.route';

const app: Application = express();

// parses
app.use(express.json());
app.use(cors());

// applications routes
app.use('/api/users', userRoutes);

const getController = (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'welcome to the mongoose-assignment',
  });
};
app.get('/', getController);

export default app;
