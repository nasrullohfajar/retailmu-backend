import type { IAudit } from '../types';
import mongoose, { Schema, model, Document, Types } from 'mongoose';
import { ERROR_MESSAGES } from '../../utils/message';
import { auditSchemaFields } from '../auditSchemaFields';

export interface IProduct extends Document, IAudit {
  code: string;
  name: string;
  category: Types.ObjectId;
  price: number;
  storage: Types.ObjectId;
}

const ProductSchema = new Schema<IProduct>(
  {
    code: {
      type: String,
      required: [true, ERROR_MESSAGES.REQUIRED('Kode produk')],
      unique: true,
      index: true,
      trim: true,
      uppercase: true,
      minLength: [2, ERROR_MESSAGES.MIN_LENGTH('Kode produk', 2)],
      maxLength: [10, ERROR_MESSAGES.MAX_LENGTH('Kode produk', 10)],
    },

    name: {
      type: String,
      required: [true, ERROR_MESSAGES.REQUIRED('Nama produk')],
      unique: true,
      trim: true,
      minLength: [2, ERROR_MESSAGES.MIN_LENGTH('Nama produk', 2)],
      maxLength: [50, ERROR_MESSAGES.MAX_LENGTH('Nama produk', 50)],
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, ERROR_MESSAGES.REQUIRED('Kategori produk')],
      ref: 'Category',
    },

    price: {
      type: Number,
      required: [true, ERROR_MESSAGES.REQUIRED('Harga produk')],
      min: [0, ERROR_MESSAGES.MIN_NUMBER('Harga produk', 0)],
      max: [100000000, ERROR_MESSAGES.MAX_NUMBER('Harga produk', 100000000)],
    },

    storage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Storage',
    },

    ...auditSchemaFields,
  },
  {
    timestamps: true,
  }
);

const Product = model<IProduct>('Product', ProductSchema);
export default Product;
