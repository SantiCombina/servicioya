import { z } from 'zod';

export const userLoginSchema = z.object({
  email: z.string().email('Debe ser un email válido'),
  password: z.string(),
});

export type UserLoginValues = z.infer<typeof userLoginSchema>;
