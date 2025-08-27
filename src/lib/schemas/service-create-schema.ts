import { z } from 'zod';

export const serviceCreateSchema = z.object({
  title: z.string().min(1, 'El título es requerido').max(100, 'El título no puede exceder 100 caracteres'),
  description: z
    .string()
    .min(10, 'La descripción debe tener al menos 10 caracteres')
    .max(1000, 'La descripción no puede exceder 1000 caracteres'),
  categoryId: z.number().min(1, 'La categoría es requerida'),
  locationId: z.number().min(1, 'La ubicación es requerida'),
  priceFrom: z.number().min(1, 'El precio debe ser mayor a 0'),
  availability: z.string().optional(),
  imageId: z.number().optional(),
  isActive: z.boolean().default(true),
});

export type ServiceCreateValues = z.infer<typeof serviceCreateSchema>;
