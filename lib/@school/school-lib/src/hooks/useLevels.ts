import { useCallback, useEffect, useState } from 'react';
import { fetchLevel, fetchLevels } from '../api/level.service';
import { Level } from '../types';

export interface UseLevelsOptions {
  params?: Record<string, unknown>;
  enabled?: boolean;
}

export interface UseLevelsResult {
  data: Level[];
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export interface UseLevelOptions {
  id: string | null;
  enabled?: boolean;
}

export interface UseLevelResult {
  data: Level | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export const useLevels = (options?: UseLevelsOptions): UseLevelsResult => {
  const { params, enabled = true } = options ?? {};
  const [data, setData] = useState<Level[]>([]);
  const [loading, setLoading] = useState<boolean>(enabled);
  const [error, setError] = useState<Error | null>(null);

  const loadLevels = useCallback(async () => {
    if (!enabled) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const levels = await fetchLevels(params);
      setData(levels);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('No se pudieron obtener los niveles.'));
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

      await loadLevels();
    };

    void load();

    return () => {
      mounted = false;
    };
  }, [enabled, loadLevels]);

  const refetch = useCallback(async () => {
    await loadLevels();
  }, [loadLevels]);

  return {
    data,
    loading,
    error,
    refetch,
  };
};

export const useLevel = ({ id, enabled = true }: UseLevelOptions): UseLevelResult => {
  const [data, setData] = useState<Level | null>(null);
  const [loading, setLoading] = useState<boolean>(Boolean(id) && enabled);
  const [error, setError] = useState<Error | null>(null);

  const loadLevel = useCallback(async () => {
    if (!enabled || !id) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const level = await fetchLevel(id);
      setData(level);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('No se pudo obtener el nivel.'));
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

      await loadLevel();
    };

    void load();

    return () => {
      mounted = false;
    };
  }, [enabled, id, loadLevel]);

  const refetch = useCallback(async () => {
    await loadLevel();
  }, [loadLevel]);

  return {
    data,
    loading,
    error,
    refetch,
  };
};
