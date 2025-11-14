import { z } from 'zod';

export const commentDeleteSchema = z.object({
  commentId: z.string({
    required_error: 'El ID del comentario es requerido.',
  }),
});

export type CommentDeleteValues = z.infer<typeof commentDeleteSchema>;
