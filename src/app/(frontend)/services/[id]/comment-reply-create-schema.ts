import { z } from 'zod';

export const commentReplyCreateSchema = z.object({
  commentId: z.string({
    required_error: 'El ID del comentario es requerido.',
  }),
  content: z
    .string({
      required_error: 'El contenido de la respuesta es requerido.',
      invalid_type_error: 'El contenido debe ser una cadena de texto.',
    })
    .trim()
    .min(1, {
      message: 'La respuesta no puede estar vacía.',
    })
    .max(1000, {
      message: 'La respuesta no puede tener más de 1000 caracteres.',
    }),
});

export type CommentReplyCreateValues = z.infer<typeof commentReplyCreateSchema>;
