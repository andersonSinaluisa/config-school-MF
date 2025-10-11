import { AcademicYear } from '../types';
import { AcademicYearInput, academicYearSchema } from '../validators';
import { getSchoolApi } from './schoolApi';

const academicYearListSchema = academicYearSchema.array();

export const fetchAcademicYears = async (params?: Record<string, unknown>): Promise<AcademicYear[]> => {
  const { data } = await getSchoolApi().get<unknown>('/academic-years', { params });
  return academicYearListSchema.parse(data);
};

export const fetchAcademicYear = async (id: string): Promise<AcademicYear> => {
  const { data } = await getSchoolApi().get<unknown>(`/academic-years/${id}`);
  return academicYearSchema.parse(data);
};

export const createAcademicYear = async (payload: AcademicYearInput): Promise<AcademicYear> => {
  const { data } = await getSchoolApi().post<unknown>('/academic-years', payload);
  return academicYearSchema.parse(data);
};

export const updateAcademicYear = async (id: string, payload: Partial<AcademicYearInput>): Promise<AcademicYear> => {
  const { data } = await getSchoolApi().put<unknown>(`/academic-years/${id}`, payload);
  return academicYearSchema.parse(data);
};

export const deleteAcademicYear = async (id: string): Promise<void> => {
  await getSchoolApi().delete(`/academic-years/${id}`);
};
