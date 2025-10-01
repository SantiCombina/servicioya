import { z } from 'zod';

export const serviceUpdateSchema = z.object({
  title: z
    .string({
      required_error: 'El título es requerido.',
      invalid_type_error: 'El título debe ser una cadena de texto.',
    })
    .trim()
    .min(5, {
      message: 'El título debe tener al menos 5 caracteres.',
    })
    .max(100, {
      message: 'El título debe tener como máximo 100 caracteres.',
    }),
  description: z
    .string({
      required_error: 'La descripción es requerida.',
      invalid_type_error: 'La descripción debe ser una cadena de texto.',
    })
    .trim()
    .min(20, {
      message: 'La descripción debe tener al menos 20 caracteres.',
    })
    .max(1000, {
      message: 'La descripción debe tener como máximo 1000 caracteres.',
    }),
  categoryId: z
    .number({
      required_error: 'Debe seleccionar una categoría.',
      invalid_type_error: 'Debe seleccionar una categoría válida.',
    })
    .min(1, {
      message: 'Debe seleccionar una categoría válida.',
    }),
  locationId: z
    .number({
      required_error: 'Debe seleccionar una ubicación.',
      invalid_type_error: 'Debe seleccionar una ubicación válida.',
    })
    .min(1, {
      message: 'Debe seleccionar una ubicación válida.',
    }),
  priceFrom: z
    .number({
      required_error: 'El precio es requerido.',
      invalid_type_error: 'El precio debe ser un número.',
    })
    .min(1, {
      message: 'El precio debe ser mayor a 0.',
    })
    .max(999999, {
      message: 'El precio debe ser menor a $999,999.',
    }),
  availability: z
    .string({
      invalid_type_error: 'La disponibilidad debe ser una cadena de texto.',
    })
    .trim()
    .max(500, {
      message: 'La disponibilidad debe tener como máximo 500 caracteres.',
    })
    .optional(),
  imageId: z
    .union([
      z.string().transform((val) => {
        if (val === '') return undefined;
        const num = parseInt(val, 10);
        return isNaN(num) ? undefined : num;
      }),
      z.number(),
    ])
    .refine((val) => val !== undefined && val !== null, {
      message: 'Debe subir al menos una imagen para el servicio.',
    }),
  isActive: z
    .boolean({
      invalid_type_error: 'El estado debe ser un booleano.',
    })
    .optional()
    .default(true),
});

export type ServiceUpdateValues = z.infer<typeof serviceUpdateSchema>;
