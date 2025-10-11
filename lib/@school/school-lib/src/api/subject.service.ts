import { Subject } from '../types';
import { SubjectInput, subjectSchema } from '../validators';
import { getSchoolApi } from './schoolApi';

const subjectListSchema = subjectSchema.array();

export const fetchSubjects = async (params?: Record<string, unknown>): Promise<Subject[]> => {
  const { data } = await getSchoolApi().get<unknown>('/subjects', { params });
  return subjectListSchema.parse(data);
};

export const fetchSubject = async (id: string): Promise<Subject> => {
  const { data } = await getSchoolApi().get<unknown>(`/subjects/${id}`);
  return subjectSchema.parse(data);
};

export const createSubject = async (payload: SubjectInput): Promise<Subject> => {
  const { data } = await getSchoolApi().post<unknown>('/subjects', payload);
  return subjectSchema.parse(data);
};

export const updateSubject = async (id: string, payload: Partial<SubjectInput>): Promise<Subject> => {
  const { data } = await getSchoolApi().put<unknown>(`/subjects/${id}`, payload);
  return subjectSchema.parse(data);
};

export const deleteSubject = async (id: string): Promise<void> => {
  await getSchoolApi().delete(`/subjects/${id}`);
};
