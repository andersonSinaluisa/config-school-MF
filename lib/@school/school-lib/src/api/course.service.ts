import { Course } from '../types';
import { CourseInput, courseSchema } from '../validators';
import { getSchoolApi } from './schoolApi';

const courseListSchema = courseSchema.array();

export const fetchCourses = async (params?: Record<string, unknown>): Promise<Course[]> => {
  const { data } = await getSchoolApi().get<unknown>('/courses', { params });
  return courseListSchema.parse(data);
};

export const fetchCourse = async (id: string): Promise<Course> => {
  const { data } = await getSchoolApi().get<unknown>(`/courses/${id}`);
  return courseSchema.parse(data);
};

export const createCourse = async (payload: CourseInput): Promise<Course> => {
  const { data } = await getSchoolApi().post<unknown>('/courses', payload);
  return courseSchema.parse(data);
};

export const updateCourse = async (id: string, payload: Partial<CourseInput>): Promise<Course> => {
  const { data } = await getSchoolApi().put<unknown>(`/courses/${id}`, payload);
  return courseSchema.parse(data);
};

export const deleteCourse = async (id: string): Promise<void> => {
  await getSchoolApi().delete(`/courses/${id}`);
};
