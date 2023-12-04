import { Request, Response } from 'express';
import { userServices } from './user.service';
import userValidationSchema, { orderValidationSchema } from './user.validation';

const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;

    // data validation using zod
    const zodparsedData = userValidationSchema.parse(user);

    const result = await userServices.createUser(zodparsedData);

    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    });
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getAllUsers();
    res.status(200).json({
      success: true,
      message: 'Users are fetched successfully!',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.userId;

    const result = await userServices.getSingleUser(parseInt(id));
    if (result) {
      res.status(200).json({
        success: true,
        message: 'User is fetched successfully !',
        data: result,
      });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(404).json({
      success: false,
      message: err.message || 'something went wrong',
      error: {
        code: 404,
        description: 'user not found',
      },
    });
  }
};
const updateUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.userId;
    const userData = req.body;
    const zodparsedData = userValidationSchema.parse(userData);
    const result = await userServices.updateUser(parseInt(id), zodparsedData);

    if (result) {
      res.status(200).json({
        success: true,
        message: 'User updated successfully !',
        data: result,
      });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(404).json({
      success: false,
      message: err.message || 'something went wrong',
      error: {
        code: 404,
        description: 'user not found',
      },
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.userId;

    const result = await userServices.deleteUser(parseInt(id));

    if (result.acknowledged === true) {
      res.status(200).json({
        success: true,
        message: 'User is deleted successfully !',
        data: null,
      });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(404).json({
      success: false,
      message: err.message || 'something went wrong',
      error: {
        code: 404,
        description: 'user not found',
      },
    });
  }
};
const createOrder = async (req: Request, res: Response) => {
  try {
    const id = req.params.userId;
    const product = req.body;

    const zodparsedData = orderValidationSchema.parse(product);
    const result = await userServices.createOrder(parseInt(id), zodparsedData);

    if (result) {
      res.status(200).json({
        success: true,
        message: 'Order is created successfully',
        data: null,
      });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(404).json({
      success: false,
      message: err.message || 'something went wrong',
      error: {
        code: 404,
        description: 'user not found',
      },
    });
  }
};

const getAllOrders = async (req: Request, res: Response) => {
  try {
    const id = req.params.userId;
    const result = await userServices.getAllOrders(parseInt(id));
    if (result) {
      res.status(200).json({
        success: true,
        message: 'orders are fetched successfully',
        data: result,
      });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(404).json({
      success: false,
      message: err.message || 'something went wrong',
      error: {
        code: 404,
        description: 'user not found',
      },
    });
  }
};

const getTotalPrices = async (req: Request, res: Response) => {
  try {
    const id = req.params.userId;
    const result = await userServices.getTotalPrice(parseInt(id));
    if (result) {
      res.status(200).json({
        success: true,
        message: 'Total price are fetched successfully',
        data: result,
      });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(404).json({
      success: false,
      message: err.message || 'something went wrong',
      error: {
        code: 404,
        description: 'user not found',
      },
    });
  }
};

export const userController = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  createOrder,
  getAllOrders,
  getTotalPrices,
};
