import { z } from 'zod';

export const createUserSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  email: z.string().email('Debe ser un email válido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
  role: z.enum(['admin', 'user']).default('user'),
});

export const updateUserSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  email: z.string().email('Debe ser un email válido'),
  password: z.string().optional().refine((val) => !val || val.length >= 6, {
    message: 'La contraseña debe tener al menos 6 caracteres'
  }),
  role: z.enum(['admin', 'user']).default('user'),
});

export type CreateUserValues = z.infer<typeof createUserSchema>;
export type UpdateUserValues = z.infer<typeof updateUserSchema>;
