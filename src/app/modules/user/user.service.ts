import { TUser } from './user.interface';
import { User } from './user.model';

const createUser = async (userData: TUser) => {
  const result = await User.create(userData); //////built in static method

  // const student = new Student(studentData); //////create an instance
  // if (await student.isUserExists(studentData.id)) {
  //   throw new Error('User already exists.');
  // }

  // const result = await student.save(); //built in instance method
  return result;
};

const getAllUsers = async () => {
  const result = await User.aggregate([
    { $project: { username: 1, fullName: 1, email: 1, age: 1, address: 1 } },
  ]);
  return result;
};

export const userServices = {
  createUser,
  getAllUsers,
  // getSingleUser,
  // updateUser,
  // deleteUser,
};
