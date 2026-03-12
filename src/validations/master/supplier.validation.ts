import z from 'zod';
import { ERROR_MESSAGES } from '../../utils/message';

export const createSupplierSchema = z.object({
  body: z.object({
    code: z
      .string()
      .trim()
      .uppercase()
      .min(2, ERROR_MESSAGES.MIN_LENGTH('Kode Supplier', 2))
      .max(10, ERROR_MESSAGES.MAX_LENGTH('Kode Supplier', 10)),

    name: z
      .string()
      .trim()
      .min(2, ERROR_MESSAGES.MIN_LENGTH('Nama Supplier', 2))
      .max(50, ERROR_MESSAGES.MAX_LENGTH('Nama Supplier', 50)),

    pic: z
      .string()
      .trim()
      .min(2, ERROR_MESSAGES.MIN_LENGTH('PIC Supplier', 2))
      .max(50, ERROR_MESSAGES.MAX_LENGTH('PIC Supplier', 50)),

    phone: z
      .string()
      .trim()
      .min(8, ERROR_MESSAGES.MIN_LENGTH('Telepon Supplier', 8))
      .max(15, ERROR_MESSAGES.MAX_LENGTH('Telepon Supplier', 15)),

    address: z
      .string()
      .trim()
      .min(5, ERROR_MESSAGES.MIN_LENGTH('Alamat Supplier', 5))
      .max(255, ERROR_MESSAGES.MAX_LENGTH('Alamat Supplier', 255)),
  }),
});

export type CreateSupplierInput = z.infer<typeof createSupplierSchema>['body'];
