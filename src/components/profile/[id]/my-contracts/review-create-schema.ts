import { z } from 'zod';

export const reviewCreateSchema = z.object({
  bookingId: z.string({
    required_error: 'El ID de la reserva es requerido.',
  }),
  scoreService: z
    .number({
      required_error: 'La calificación del servicio es requerida.',
    })
    .min(1, 'La calificación mínima es 1.')
    .max(5, 'La calificación máxima es 5.'),
  scoreTrato: z
    .number({
      required_error: 'La calificación del trato es requerida.',
    })
    .min(1, 'La calificación mínima es 1.')
    .max(5, 'La calificación máxima es 5.'),
  scoreCosto: z
    .number({
      required_error: 'La calificación del costo es requerida.',
    })
    .min(1, 'La calificación mínima es 1.')
    .max(5, 'La calificación máxima es 5.'),
  comment: z.string().max(1000, 'El comentario no puede exceder los 1000 caracteres.').optional(),
});

export type ReviewCreateValues = z.infer<typeof reviewCreateSchema>;
