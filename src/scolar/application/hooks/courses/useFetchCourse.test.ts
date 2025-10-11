import { renderHook, waitFor } from '@testing-library/react';
import { useFetchCourse } from './useFetchCourse';
import type { ListCoursesUseCase } from '../../useCases/courses/listCoursesUseCase';
import { Course } from '@/scolar/domain/entities/course';
import type { PaginatedResult } from '@/scolar/infrastructure/dto/paginateDto';
import { vi, type Mock } from 'vitest';
import { faker } from '@faker-js/faker';

// 1. Mock de dependencias externas
vi.mock('inversify-react', () => ({
  useInjection: vi.fn(),
}));

vi.mock('@/hooks/use-toast', () => ({
  toast: vi.fn(),
}));

// 2. Importar después de mockear
import { useInjection } from 'inversify-react';
import { toast } from '@/hooks/use-toast';

// 3. Variables de mocks tipadas
const mockUseInjection = useInjection as unknown as Mock;
const mockToast = toast as Mock;
const mockExecute = vi.fn();

describe('useFetchCourse', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseInjection.mockReturnValue({
      execute: mockExecute,
    } as unknown as ListCoursesUseCase);
  });

  it('debería cargar cursos exitosamente', async () => {
    // Cursos falsos
    const fakeCourses: Course[] = [...Array(3)].map(() =>
      new Course(faker.number.int(),
        faker.lorem.words(3),
        faker.number.int({ min: 1, max: 5 }),
        faker.lorem.sentence()),
    )
    
    const result: PaginatedResult<Course> = {
      data: fakeCourses,
      meta: {
        total: 3,
        currentPage: 1,
        lastPage: 1,
        perPage: 10,
        prev: null,
        next: null,
      }
    };

    // Mock del caso de uso
    mockExecute.mockResolvedValueOnce({
      isLeft: () => false,
      extract: () => result,
    });

    // Renderizamos el hook
    const { result: hookResult } = renderHook(() =>
      useFetchCourse(1, 10, ''),
    );

    // Esperamos que el efecto corra
    await waitFor(() => {
      expect(hookResult.current).toEqual(fakeCourses);
    });

    // Verificamos que se llamó al caso de uso
    expect(mockExecute).toHaveBeenCalledWith(expect.any(Object));
  });


  it('debería mostrar un mensaje de error cuando falla la carga', async () => {
    // Simula que el caso de uso devuelve Left (error)
    mockExecute.mockResolvedValueOnce({
      isLeft: () => true,
    });

    const { result } = renderHook(() => useFetchCourse(1, 10, ''));

    await waitFor(() => {
      // El hook debería devolver un array vacío (no carga cursos)
      expect(result.current).toEqual([]);
      // Y mostrar el toast de error
      expect(mockToast).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'Error',
          description: 'No se pudieron cargar los cursos',
          variant: 'destructive',
        })
      );
    });

    // Aseguramos que sí se llamó al caso de uso
    expect(mockExecute).toHaveBeenCalledWith(expect.any(Object));
  });
});
