import { z } from 'zod';
import { Course, CourseSchedule } from '../types';

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

export const courseScheduleSchema: z.ZodType<CourseSchedule> = z.object({
  dayOfWeek: z
    .number({ required_error: 'El día de la semana es obligatorio.' })
    .int('El día de la semana debe ser un número entero.')
    .min(0, 'El día de la semana debe estar entre 0 y 6.')
    .max(6, 'El día de la semana debe estar entre 0 y 6.'),
  startTime: z.string({ required_error: 'La hora de inicio es obligatoria.' }),
  endTime: z.string({ required_error: 'La hora de fin es obligatoria.' }),
  classroom: z.string().optional(),
});

export const courseSchema: z.ZodType<Course> = baseEntitySchema.extend({
  code: z
    .string({ required_error: 'El código es obligatorio.' })
    .min(2, 'El código debe tener al menos 2 caracteres.'),
  academicYearId: z
    .string({ required_error: 'El año académico es obligatorio.' })
    .min(1, 'El año académico es obligatorio.'),
  levelId: z
    .string({ required_error: 'El nivel es obligatorio.' })
    .min(1, 'El nivel es obligatorio.'),
  subjectIds: z
    .array(z.string().min(1, 'El identificador de asignatura es obligatorio.'), {
      required_error: 'Debe seleccionar al menos una asignatura.',
    })
    .min(1, 'Debe seleccionar al menos una asignatura.'),
  tutorId: z.string().optional(),
  description: z.string().optional(),
  schedules: courseScheduleSchema.array().optional(),
});

export type CourseInput = z.input<typeof courseSchema>;
