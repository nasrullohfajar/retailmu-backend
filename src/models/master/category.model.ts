import { Schema, model, Document } from 'mongoose';
import { ERROR_MESSAGES } from '../../utils/message';

export interface ICategory extends Document {
  code: string;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
  deletedAt: Date;
}

const CategorySchema = new Schema<ICategory>(
  {
    code: {
      type: String,
      required: [true, ERROR_MESSAGES.REQUIRED('Kode kategori')],
      unique: true,
      index: true,
      trim: true,
      uppercase: true,
      minLength: [2, ERROR_MESSAGES.MIN_LENGTH('Kode kategori', 2)],
      maxLength: [10, ERROR_MESSAGES.MAX_LENGTH('Kode kategori', 10)],
    },

    name: {
      type: String,
      required: [true, ERROR_MESSAGES.REQUIRED('Nama kategori')],
      unique: true,
      trim: true,
      minLength: [2, ERROR_MESSAGES.MIN_LENGTH('Nama kategori', 2)],
      maxLength: [50, ERROR_MESSAGES.MAX_LENGTH('Nama kategori', 50)],
    },

    description: {
      type: String,
      trim: true,
      maxLength: [255, ERROR_MESSAGES.MAX_LENGTH('Deskripsi kategori', 255)],
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },

    deletedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

const Category = model<ICategory>('Category', CategorySchema);
export default Category;
