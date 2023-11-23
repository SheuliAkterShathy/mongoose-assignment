import { Schema, model } from 'mongoose';
import { IModel, TAddress, TFullName, TOrders, TUser } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

const fullNameSchema = new Schema<TFullName>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
});
const addressSchema = new Schema<TAddress>({
  street: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
});
const orderSchema = new Schema<TOrders>({
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const userSchema = new Schema<TUser, IModel>({
  userId: {
    type: Number,
    required: [true, 'userId is required'],
    unique: true,
  },
  username: {
    type: String,
    required: [true, 'User Name is required'],
    trim: true,
    unique: true,
  },
  password: { type: String, required: [true, 'password is required'] },
  fullName: { type: fullNameSchema, required: true, trim: true },
  age: { type: Number, required: [true, 'age is required'] },
  email: { type: String, required: true, trim: true },
  isActive: { type: Boolean, default: true },
  hobbies: [{ type: String, required: true }],
  address: { type: addressSchema, required: [true, 'Address is required'] },
  orders: { type: [orderSchema], default: [] },
});

userSchema.pre('save', async function (next) {
  // console.log(this, 'pre hook: we will save data');

  // //// hashing password save into data
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

// ////post save middleware/ hook
userSchema.post('save', function (doc, next) {
  doc.password = '';

  next();
});

userSchema.statics.isUserExists = async function (id: number) {
  const existingUser = await User.findOne({ userId: id }, { password: 0 });
  return existingUser;
};
export const User = model<TUser, IModel>('User', userSchema);
