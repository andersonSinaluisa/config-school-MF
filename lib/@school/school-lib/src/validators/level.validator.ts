import { z } from 'zod';
import { Level } from '../types';

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

export const levelSchema: z.ZodType<Level> = baseEntitySchema.extend({
  code: z
    .string({ required_error: 'El código es obligatorio.' })
    .min(2, 'El código debe tener al menos 2 caracteres.'),
  order: z
    .number({ required_error: 'El orden es obligatorio.' })
    .int('El orden debe ser un número entero.')
    .min(0, 'El orden debe ser igual o mayor que cero.'),
  description: z.string().optional(),
  nextLevelId: z.string().optional(),
});

export type LevelInput = z.input<typeof levelSchema>;
