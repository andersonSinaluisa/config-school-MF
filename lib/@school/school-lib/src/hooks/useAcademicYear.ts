import { useCallback, useEffect, useState } from 'react';
import { fetchAcademicYear } from '../api/academicYear.service';
import { AcademicYear } from '../types';

export interface UseAcademicYearOptions {
  id: string | null;
  enabled?: boolean;
}

export interface UseAcademicYearResult {
  data: AcademicYear | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export const useAcademicYear = ({ id, enabled = true }: UseAcademicYearOptions): UseAcademicYearResult => {
  const [data, setData] = useState<AcademicYear | null>(null);
  const [loading, setLoading] = useState<boolean>(Boolean(id) && enabled);
  const [error, setError] = useState<Error | null>(null);

  const loadAcademicYear = useCallback(async () => {
    if (!enabled || !id) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const academicYear = await fetchAcademicYear(id);
      setData(academicYear);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('No se pudo obtener el año académico.'));
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

      await loadAcademicYear();
    };

    void load();

    return () => {
      mounted = false;
    };
  }, [enabled, id, loadAcademicYear]);

  const refetch = useCallback(async () => {
    await loadAcademicYear();
  }, [loadAcademicYear]);

  return {
    data,
    loading,
    error,
    refetch,
  };
};
