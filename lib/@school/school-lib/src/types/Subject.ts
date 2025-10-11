import { BaseEntity } from './BaseEntity';

export interface Subject extends BaseEntity {
  code: string;
  levelId: string;
  credits?: number;
  hourlyLoad?: number;
  description?: string;
}
