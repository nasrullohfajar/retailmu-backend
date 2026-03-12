import type { IAudit } from '../types';
import { Schema, model, Document } from 'mongoose';
import { ERROR_MESSAGES } from '../../utils/message';
import { auditSchemaFields } from '../auditSchemaFields';

export interface IUser extends Document, IAudit {
  username: string;
  password: string;
  name: string;
  role: string;
}

const UserSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: [true, ERROR_MESSAGES.REQUIRED('Username')],
      unique: true,
      index: true,
      trim: true,
      lowercase: true,
      minLength: [2, ERROR_MESSAGES.MIN_LENGTH('Username', 2)],
      maxLength: [25, ERROR_MESSAGES.MAX_LENGTH('Username', 25)],
    },

    password: {
      type: String,
      required: [true, ERROR_MESSAGES.REQUIRED('Password')],
      trim: true,
      select: false,
      minLength: [6, ERROR_MESSAGES.MIN_LENGTH('Password', 6)],
      maxLength: [255, ERROR_MESSAGES.MAX_LENGTH('Password', 255)],
    },

    name: {
      type: String,
      required: [true, ERROR_MESSAGES.REQUIRED('Nama pengguna')],
      trim: true,
      minLength: [2, ERROR_MESSAGES.MIN_LENGTH('Nama pengguna', 2)],
      maxLength: [50, ERROR_MESSAGES.MAX_LENGTH('Nama pengguna', 50)],
    },

    role: {
      type: String,
      required: [true, ERROR_MESSAGES.REQUIRED('Role pengguna')],
      enum: ['administrator', 'cashier', 'warehouse'],
    },

    ...auditSchemaFields,
  },
  { timestamps: true }
);

const User = model<IUser>('User', UserSchema);
export default User;
