import { z } from 'zod';

export const userUpdateSchema = z.object({
  name: z.string().optional(),
  phone: z.string().optional(),
  dni: z.number().optional(),
});

export type UserUpdateValues = z.infer<typeof userUpdateSchema>;
