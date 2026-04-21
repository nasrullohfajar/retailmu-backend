import { Schema, model, Document } from 'mongoose';
import { ERROR_MESSAGES } from '../../utils/message';
import { IAudit } from '../types';
import { auditSchemaFields } from '../auditSchemaFields';

export interface ISupplier extends Document, IAudit {
  code: string;
  name: string;
  pic: string;
  phone: string;
  address: string;
}

const SupplierSchema = new Schema<ISupplier>(
  {
    code: {
      type: String,
      required: [true, ERROR_MESSAGES.REQUIRED('Kode supplier')],
      unique: true,
      index: true,
      trim: true,
      uppercase: true,
      minLength: [2, ERROR_MESSAGES.MIN_LENGTH('Kode supplier', 2)],
      maxLength: [10, ERROR_MESSAGES.MAX_LENGTH('Kode supplier', 10)],
    },

    name: {
      type: String,
      required: [true, ERROR_MESSAGES.REQUIRED('Nama supplier')],
      unique: true,
      trim: true,
      minLength: [2, ERROR_MESSAGES.MIN_LENGTH('Nama supplier', 2)],
      maxLength: [50, ERROR_MESSAGES.MAX_LENGTH('Nama supplier', 50)],
    },

    pic: {
      type: String,
      required: [true, ERROR_MESSAGES.REQUIRED('PIC supplier')],
      trim: true,
      minLength: [2, ERROR_MESSAGES.MIN_LENGTH('PIC supplier', 2)],
      maxLength: [50, ERROR_MESSAGES.MAX_LENGTH('PIC supplier', 50)],
    },

    phone: {
      type: String,
      required: [true, ERROR_MESSAGES.REQUIRED('Telepon supplier')],
      trim: true,
      minLength: [10, ERROR_MESSAGES.MIN_LENGTH('Telepon supplier', 10)],
      maxLength: [15, ERROR_MESSAGES.MAX_LENGTH('Telepon supplier', 15)],
    },

    address: {
      type: String,
      required: [true, ERROR_MESSAGES.REQUIRED('Alamat supplier')],
      trim: true,
      minLength: [5, ERROR_MESSAGES.MIN_LENGTH('Alamat supplier', 5)],
      maxLength: [255, ERROR_MESSAGES.MAX_LENGTH('Alamat supplier', 255)],
    },

    ...auditSchemaFields,
  },
  { timestamps: true }
);

const Supplier = model<ISupplier>('Supplier', SupplierSchema);
export default Supplier;
