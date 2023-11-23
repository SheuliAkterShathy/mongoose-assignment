import { Schema, model } from 'mongoose';
import { TAddress, TFullName, TOrders, TUser } from './user.interface';
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

const userSchema = new Schema<TUser>({
  userId: { type: Number, required: true },
  username: { type: String, required: true, trim: true },
  password: { type: String, required: true },
  fullName: { type: fullNameSchema, required: true },
  age: { type: Number, required: true },
  email: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  hobbies: [{ type: String, required: true }],
  address: { type: addressSchema, required: true },
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

export const User = model<TUser>('User', userSchema);