import { TUser } from './user.interface';
import { User } from './user.model';

const createUser = async (userData: TUser) => {
  const result = await User.create(userData); //////built in static method

  return result;
};

const getAllUsers = async () => {
  const result = await User.aggregate([
    { $project: { username: 1, fullName: 1, email: 1, age: 1, address: 1 } },
  ]);
  return result;
};

const getSingleUser = async (id: number) => {
  const user = await User.isUserExists(id);

  return user;
};

const updateUser = async (
  id: number,
  userData: TUser,
): Promise<TUser | null> => {
  const result = await User.findOneAndUpdate({ userId: id }, userData, {
    new: true,
    runValidators: true,
  });

  return result;
};

// const updateUser = async (id: number, userData: TUser) => {
//   const user = await User.isUserExists(id);
//   const
//   const userInfo = await User.updateOne({ userId: id }, userData);

//   return { user, userInfo };
// };

const deleteUser = async (id: number) => {
  const result = await User.deleteOne({ userId: id });
  return result;
};

const getAllOrders = async (id: number) => {
  const result = await User.findOne({ userId: id }, { orders: 1, _id: 0 });

  return result;
};

const getTotalPrice = async (id: number): Promise<TUser | null> => {
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
  getAllOrders,
  getTotalPrice,
};
