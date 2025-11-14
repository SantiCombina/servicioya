import { z } from 'zod';

export const bookingCreateSchema = z.object({
  serviceId: z.number({
    required_error: 'El ID del servicio es requerido.',
  }),
  providerId: z.number({
    required_error: 'El ID del proveedor es requerido.',
  }),
  clientId: z.number({
    required_error: 'Debes iniciar sesión para contratar un servicio.',
  }),
  requestedDate: z
    .string({
      required_error: 'La fecha solicitada es requerida.',
      invalid_type_error: 'La fecha debe ser válida.',
    })
    .min(1, {
      message: 'Selecciona una fecha para el servicio.',
    }),
  requestedTime: z
    .string({
      required_error: 'La hora solicitada es requerida.',
      invalid_type_error: 'La hora debe ser válida.',
    })
    .min(1, {
      message: 'Selecciona una hora para el servicio.',
    }),
  message: z
    .string()
    .max(500, {
      message: 'El mensaje no puede exceder los 500 caracteres.',
    })
    .optional(),
  location: z
    .string({
      required_error: 'La ubicación es requerida.',
      invalid_type_error: 'La ubicación debe ser válida.',
    })
    .min(5, {
      message: 'Proporciona una ubicación más específica (mínimo 5 caracteres).',
    }),
});

export type BookingCreateValues = z.infer<typeof bookingCreateSchema>;
