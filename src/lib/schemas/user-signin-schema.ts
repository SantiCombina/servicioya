import { z } from 'zod';

export const userSignInSchema = z.object({
  email: z
    .string({
      required_error: 'El email es requerido.',
      invalid_type_error: 'El email debe ser una cadena de texto.',
    })
    .trim()
    .email({
      message: 'Por favor ingresa una dirección de email válida.',
    }),
  password: z
    .string({
      required_error: 'La contraseña es requerida.',
      invalid_type_error: 'La contraseña debe ser una cadena de texto.',
    })
    .min(8, {
      message: 'La contraseña debe tener al menos 8 caracteres.',
    })
    .max(100, {
      message: 'La contraseña debe tener como máximo 100 caracteres.',
    })
    .refine((val) => !val.includes(' '), {
      message: 'La contraseña no puede contener espacios.',
    }),
});

export type UserSignInValues = z.infer<typeof userSignInSchema>;
