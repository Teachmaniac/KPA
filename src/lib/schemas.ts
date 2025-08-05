import { z } from 'zod';

export const loginSchema = z.object({
  phone: z.string().min(10, 'Phone number must be at least 10 digits').max(15, 'Phone number is too long'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export type LoginSchema = z.infer<typeof loginSchema>;

export const addFormSchema = z.object({
  customerName: z.string().min(1, 'Customer name is required'),
  projectName: z.string().min(1, 'Project name is required'),
  details: z.string().optional(),
  amount: z.coerce.number().positive('Amount must be a positive number'),
});

export type AddFormSchema = z.infer<typeof addFormSchema>;
