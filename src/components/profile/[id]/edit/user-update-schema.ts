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
    .string({
      invalid_type_error: 'El DNI debe ser una cadena de texto.',
    })
    .optional()
    .superRefine((val, ctx) => {
      if (!val || val === '') return;
      if (val.length === 7) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Si tu DNI tiene 7 dígitos, agregá un 0 adelante.',
        });
      } else if (!/^\d{8}$/.test(val)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Ingresá un DNI válido de 8 dígitos.',
        });
      }
    }),
  location: z.union([z.string(), z.number()]).optional(),
  address: z
    .string()
    .trim()
    .max(200, {
      message: 'La dirección debe tener como máximo 200 caracteres.',
    })
    .optional(),
  avatar: z.union([z.string(), z.number(), z.null()]).optional(),
});

export type UserUpdateValues = z.infer<typeof userUpdateSchema>;
