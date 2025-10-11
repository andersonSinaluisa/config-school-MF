import { Level } from '../types';
import { LevelInput, levelSchema } from '../validators';
import { getSchoolApi } from './schoolApi';

const levelListSchema = levelSchema.array();

export const fetchLevels = async (params?: Record<string, unknown>): Promise<Level[]> => {
  const { data } = await getSchoolApi().get<unknown>('/levels', { params });
  return levelListSchema.parse(data);
};

export const fetchLevel = async (id: string): Promise<Level> => {
  const { data } = await getSchoolApi().get<unknown>(`/levels/${id}`);
  return levelSchema.parse(data);
};

export const createLevel = async (payload: LevelInput): Promise<Level> => {
  const { data } = await getSchoolApi().post<unknown>('/levels', payload);
  return levelSchema.parse(data);
};

export const updateLevel = async (id: string, payload: Partial<LevelInput>): Promise<Level> => {
  const { data } = await getSchoolApi().put<unknown>(`/levels/${id}`, payload);
  return levelSchema.parse(data);
};

export const deleteLevel = async (id: string): Promise<void> => {
  await getSchoolApi().delete(`/levels/${id}`);
};
