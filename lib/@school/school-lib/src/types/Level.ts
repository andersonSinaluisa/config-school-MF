import { BaseEntity } from './BaseEntity';

export interface Level extends BaseEntity {
  code: string;
  order: number;
  description?: string;
  nextLevelId?: string;
}
