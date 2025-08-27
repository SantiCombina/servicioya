import { z } from 'zod';

export const userUpdateSchema = z.object({
  name: z
    .string({
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
    })
    .optional(),
  phone: z
    .string({
      invalid_type_error: 'El teléfono debe ser una cadena de texto.',
    })
    .trim()
    .min(8, {
      message: 'El teléfono debe tener al menos 8 dígitos.',
    })
    .max(15, {
      message: 'El teléfono debe tener como máximo 15 dígitos.',
    })
    .refine((val) => /^[0-9+\-\s()]+$/.test(val), {
      message: 'El teléfono solo puede contener números, espacios, guiones, paréntesis y el signo +.',
    })
    .optional(),
  dni: z
    .union([
      z.string().transform((val) => {
        const num = parseInt(val, 10);
        return isNaN(num) ? undefined : num;
      }),
      z.number(),
    ])
    .optional()
    .refine((val) => val === undefined || (val >= 10000000 && val <= 99999999), {
      message: 'El DNI debe tener entre 8 dígitos (10.000.000 - 99.999.999).',
    }),
});

export type UserUpdateValues = z.infer<typeof userUpdateSchema>;
