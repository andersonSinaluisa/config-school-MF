import { z } from 'zod';
import { AcademicTerm, AcademicYear } from '../types';

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

export const academicTermSchema: z.ZodType<AcademicTerm> = baseEntitySchema.extend({
  startDate: isoDateSchema,
  endDate: isoDateSchema,
});

export const academicYearSchema: z.ZodType<AcademicYear> = baseEntitySchema.extend({
  code: z
    .string({ required_error: 'El código es obligatorio.' })
    .min(3, 'El código debe tener al menos 3 caracteres.'),
  startDate: isoDateSchema,
  endDate: isoDateSchema,
  isActive: z.boolean({ required_error: 'El estado activo es obligatorio.' }),
  terms: academicTermSchema.array().optional(),
});

export type AcademicYearInput = z.input<typeof academicYearSchema>;
