import { z } from 'zod';
import { Subject } from '../types';

const isoDateSchema = z
  .string({ required_error: 'La fecha es obligatoria.' })
  .refine((value) => !Number.isNaN(Date.parse(value)), {
    message: 'La fecha debe tener un formato ISO válido.',
  });

const baseEntitySchema = z.object({
  id: z.string({ required_error: 'El identificador es obligatorio.' }).min(1, 'El identificador es obligatorio.'),
  name: z.string({ required_error: 'El nombre es obligatorio.' }).min(1, 'El nombre es obligatorio.'),
  createdAt: isoDateSchema,
  updatedAt: isoDateSchema,
});

export const subjectSchema: z.ZodType<Subject> = baseEntitySchema.extend({
  code: z
    .string({ required_error: 'El código es obligatorio.' })
    .min(2, 'El código debe tener al menos 2 caracteres.'),
  levelId: z
    .string({ required_error: 'El nivel es obligatorio.' })
    .min(1, 'El nivel es obligatorio.'),
  credits: z
    .number({ invalid_type_error: 'Los créditos deben ser numéricos.' })
    .positive('Los créditos deben ser mayores que cero.')
    .optional(),
  hourlyLoad: z
    .number({ invalid_type_error: 'La carga horaria debe ser numérica.' })
    .positive('La carga horaria debe ser mayor que cero.')
    .optional(),
  description: z.string().optional(),
});

export type SubjectInput = z.input<typeof subjectSchema>;
