import { TOrders, TUser } from './user.interface';
import { User } from './user.model';

const createUser = async (userData: TUser) => {
  const result = await User.create(userData);
  const result1 = await User.findOne({ userId: result.userId }).select(
    '-orders -password _id -__v',
  );
  return result1;
};

const getAllUsers = async () => {
  const result = await User.aggregate([
    {
      $project: {
        username: 1,
        fullName: 1,
        email: 1,
        age: 1,
        address: 1,
        _id: 0,
      },
    },
  ]);
  return result;
};

const getSingleUser = async (id: number) => {
  const user = await User.isUserExists(id);
  if (!user) {
    throw new Error('User not found');
  }
  const result = await User.findOne({ userId: id }).select(
    '-orders -password _id -__v',
  );
  return result;
};

const updateUser = async (id: number, userData: TUser) => {
  const result = await User.findOneAndUpdate({ userId: id }, userData, {
    new: true,
    runValidators: true,
  }).select('-password');

  const user = await User.isUserExists(id);
  if (!user) {
    throw new Error('User not found');
  }

  return result;
};

const deleteUser = async (id: number) => {
  const user = await User.isUserExists(id);
  if (!user) {
    throw new Error('User not found');
  }
  const result = await User.deleteOne({ userId: id });
  return result;
};

const createOrder = async (id: number, product: TOrders) => {
  const user = await User.isUserExists(id);
  if (!user) {
    throw new Error('User not found');
  }
  const result = await User.updateOne({
    userId: id,
    $addToSet: {
      orders: product,
    },
  });

  return result;
};
const getAllOrders = async (id: number) => {
  const user = await User.isUserExists(id);
  if (!user) {
    throw new Error('User not found');
  }
  const result = await User.findOne({ userId: id }, { orders: 1, _id: 0 });

  return result;
};

const getTotalPrice = async (id: number): Promise<TUser | null> => {
  const user = await User.isUserExists(id);
  if (!user) {
    throw new Error('User not found');
  }
  const result = await User.findOne(
    { userId: id },
    { totalPrice: { $sum: '$orders.price' }, _id: 0 },
  );
  return result;
};
export const userServices = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  createOrder,
  getAllOrders,
  getTotalPrice,
};
