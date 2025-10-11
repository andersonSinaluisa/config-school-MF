import { useCallback, useEffect, useState } from 'react';
import { AcademicYear, Course, Level, Subject } from '../types';
import { fetchAcademicYears } from '../api/academicYear.service';
import { fetchCourses } from '../api/course.service';
import { fetchSubjects } from '../api/subject.service';
import { fetchLevels } from '../api/level.service';

export interface UseSchoolDataOptions {
  enabled?: boolean;
}

export interface UseSchoolDataResult {
  data: {
    academicYears: AcademicYear[];
    courses: Course[];
    subjects: Subject[];
    levels: Level[];
  };
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

const defaultData = {
  academicYears: [] as AcademicYear[],
  courses: [] as Course[],
  subjects: [] as Subject[],
  levels: [] as Level[],
};

export const useSchoolData = (options?: UseSchoolDataOptions): UseSchoolDataResult => {
  const { enabled = true } = options ?? {};
  const [data, setData] = useState(defaultData);
  const [loading, setLoading] = useState<boolean>(enabled);
  const [error, setError] = useState<Error | null>(null);

  const loadData = useCallback(async () => {
    if (!enabled) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const [academicYears, courses, subjects, levels] = await Promise.all([
        fetchAcademicYears(),
        fetchCourses(),
        fetchSubjects(),
        fetchLevels(),
      ]);

      setData({ academicYears, courses, subjects, levels });
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Error desconocido al cargar datos escolares.'));
    } finally {
      setLoading(false);
    }
  }, [enabled]);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      if (!enabled || !mounted) {
        return;
      }

      await loadData();
    };

    void load();

    return () => {
      mounted = false;
    };
  }, [enabled, loadData]);

  const refetch = useCallback(async () => {
    await loadData();
  }, [loadData]);

  return {
    data,
    loading,
    error,
    refetch,
  };
};
