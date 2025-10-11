import { BaseEntity } from './BaseEntity';

export interface CourseSchedule {
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  classroom?: string;
}

export interface Course extends BaseEntity {
  code: string;
  academicYearId: string;
  levelId: string;
  subjectIds: string[];
  tutorId?: string;
  description?: string;
  schedules?: CourseSchedule[];
}
