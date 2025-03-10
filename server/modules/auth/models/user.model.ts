import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new Schema<IUser>({
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  username: {
    type: String,
    required: true, 
    unique: true 
  },
  refreshToken: { 
    type: String 
  },
  avatar: {
    type: String
  }
});

userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

export const User = model<IUser>('User', userSchema);