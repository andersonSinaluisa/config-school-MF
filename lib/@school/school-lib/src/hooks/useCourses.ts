import { useCallback, useEffect, useState } from 'react';
import { fetchCourse, fetchCourses } from '../api/course.service';
import { Course } from '../types';

export interface UseCoursesOptions {
  params?: Record<string, unknown>;
  enabled?: boolean;
}

export interface UseCoursesResult {
  data: Course[];
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export interface UseCourseOptions {
  id: string | null;
  enabled?: boolean;
}

export interface UseCourseResult {
  data: Course | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export const useCourses = (options?: UseCoursesOptions): UseCoursesResult => {
  const { params, enabled = true } = options ?? {};
  const [data, setData] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(enabled);
  const [error, setError] = useState<Error | null>(null);

  const loadCourses = useCallback(async () => {
    if (!enabled) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const courses = await fetchCourses(params);
      setData(courses);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('No se pudieron obtener los cursos.'));
    } finally {
      setLoading(false);
    }
  }, [enabled, params]);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      if (!mounted || !enabled) {
        return;
      }

      await loadCourses();
    };

    void load();

    return () => {
      mounted = false;
    };
  }, [enabled, loadCourses]);

  const refetch = useCallback(async () => {
    await loadCourses();
  }, [loadCourses]);

  return {
    data,
    loading,
    error,
    refetch,
  };
};

export const useCourse = ({ id, enabled = true }: UseCourseOptions): UseCourseResult => {
  const [data, setData] = useState<Course | null>(null);
  const [loading, setLoading] = useState<boolean>(Boolean(id) && enabled);
  const [error, setError] = useState<Error | null>(null);

  const loadCourse = useCallback(async () => {
    if (!enabled || !id) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const course = await fetchCourse(id);
      setData(course);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('No se pudo obtener el curso.'));
    } finally {
      setLoading(false);
    }
  }, [enabled, id]);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      if (!mounted || !enabled || !id) {
        setLoading(false);
        return;
      }

      await loadCourse();
    };

    void load();

    return () => {
      mounted = false;
    };
  }, [enabled, id, loadCourse]);

  const refetch = useCallback(async () => {
    await loadCourse();
  }, [loadCourse]);

  return {
    data,
    loading,
    error,
    refetch,
  };
};
