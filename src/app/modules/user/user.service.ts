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

  // const result = await User.findOne({ userId: id }, { password: 0 });

  return user;
};
export const userServices = {
  createUser,
  getAllUsers,
  getSingleUser,
  // updateUser,
  // deleteUser,
};
