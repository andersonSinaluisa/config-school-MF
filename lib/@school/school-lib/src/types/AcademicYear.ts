import { BaseEntity } from './BaseEntity';

export interface AcademicTerm extends BaseEntity {
  startDate: string;
  endDate: string;
}

export interface AcademicYear extends BaseEntity {
  code: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
  terms?: AcademicTerm[];
}
