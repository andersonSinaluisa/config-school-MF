import { useCallback, useEffect, useState } from 'react';
import { fetchSubject, fetchSubjects } from '../api/subject.service';
import { Subject } from '../types';

export interface UseSubjectsOptions {
  params?: Record<string, unknown>;
  enabled?: boolean;
}

export interface UseSubjectsResult {
  data: Subject[];
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export interface UseSubjectOptions {
  id: string | null;
  enabled?: boolean;
}

export interface UseSubjectResult {
  data: Subject | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export const useSubjects = (options?: UseSubjectsOptions): UseSubjectsResult => {
  const { params, enabled = true } = options ?? {};
  const [data, setData] = useState<Subject[]>([]);
  const [loading, setLoading] = useState<boolean>(enabled);
  const [error, setError] = useState<Error | null>(null);

  const loadSubjects = useCallback(async () => {
    if (!enabled) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const subjects = await fetchSubjects(params);
      setData(subjects);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('No se pudieron obtener las asignaturas.'));
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

      await loadSubjects();
    };

    void load();

    return () => {
      mounted = false;
    };
  }, [enabled, loadSubjects]);

  const refetch = useCallback(async () => {
    await loadSubjects();
  }, [loadSubjects]);

  return {
    data,
    loading,
    error,
    refetch,
  };
};

export const useSubject = ({ id, enabled = true }: UseSubjectOptions): UseSubjectResult => {
  const [data, setData] = useState<Subject | null>(null);
  const [loading, setLoading] = useState<boolean>(Boolean(id) && enabled);
  const [error, setError] = useState<Error | null>(null);

  const loadSubject = useCallback(async () => {
    if (!enabled || !id) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const subject = await fetchSubject(id);
      setData(subject);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('No se pudo obtener la asignatura.'));
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

      await loadSubject();
    };

    void load();

    return () => {
      mounted = false;
    };
  }, [enabled, id, loadSubject]);

  const refetch = useCallback(async () => {
    await loadSubject();
  }, [loadSubject]);

  return {
    data,
    loading,
    error,
    refetch,
  };
};
