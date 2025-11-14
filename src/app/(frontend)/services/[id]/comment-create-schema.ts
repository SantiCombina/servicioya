import { z } from 'zod';

export const commentCreateSchema = z.object({
  serviceId: z.string({
    required_error: 'El ID del servicio es requerido.',
  }),
  content: z
    .string({
      required_error: 'El contenido del comentario es requerido.',
      invalid_type_error: 'El contenido debe ser una cadena de texto.',
    })
    .trim()
    .min(1, {
      message: 'El comentario no puede estar vacío.',
    })
    .max(1000, {
      message: 'El comentario no puede tener más de 1000 caracteres.',
    }),
});

export type CommentCreateValues = z.infer<typeof commentCreateSchema>;
