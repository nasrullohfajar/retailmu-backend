import { Schema, model, Document } from 'mongoose';
import { ERROR_MESSAGES } from '../../utils/message';
import { IAudit } from '../types';
import { auditSchemaFields } from '../auditSchemaFields';

export interface IStorage extends Document, IAudit {
  code: string;
  description: string;
}

const StorageSchema = new Schema<IStorage>(
  {
    code: {
      type: String,
      required: [true, ERROR_MESSAGES.REQUIRED('Kode penyimpanan')],
      unique: true,
      index: true,
      trim: true,
      uppercase: true,
      minLength: [2, ERROR_MESSAGES.MIN_LENGTH('Kode penyimpanan', 2)],
      maxLength: [10, ERROR_MESSAGES.MAX_LENGTH('Kode penyimpanan', 10)],
    },

    description: {
      type: String,
      trim: true,
      maxlength: [255, ERROR_MESSAGES.MAX_LENGTH('Deskripsi penyimpanan', 255)],
    },

    ...auditSchemaFields,
  },
  { timestamps: true }
);
const Storage = model<IStorage>('Storage', StorageSchema);
export default Storage;
