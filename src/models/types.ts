import { Types } from 'mongoose';

export interface IAudit {
  createdAt: Date;
  createdBy: Types.ObjectId;
  updatedAt: Date;
  updatedBy: Types.ObjectId;
  isDeleted: boolean;
  deletedAt: Date;
  deletedBy: Types.ObjectId;
}
