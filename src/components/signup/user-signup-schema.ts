import { z } from 'zod';

export const userSignupSchema = z
  .object({
    name: z
      .string({
        required_error: 'El nombre es requerido.',
        invalid_type_error: 'El nombre debe ser una cadena de texto.',
      })
      .trim()
      .min(2, {
        message: 'El nombre debe tener al menos 2 caracteres.',
      })
      .max(50, {
        message: 'El nombre debe tener como máximo 50 caracteres.',
      })
      .refine((val) => /^[a-zA-ZÀ-ÿ\u00f1\u00d1\s]+$/.test(val), {
        message: 'El nombre solo puede contener letras y espacios.',
      }),
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
      }),
    confirmPassword: z.string({
      required_error: 'La confirmación de contraseña es requerida.',
      invalid_type_error: 'La confirmación de contraseña debe ser una cadena de texto.',
    }),
    redirectTo: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden.',
    path: ['confirmPassword'],
  });

export type UserSignupValues = z.infer<typeof userSignupSchema>;
