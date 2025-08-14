import { useInjection } from "inversify-react";
import { ListCoursesCommand, ListCoursesUseCase } from "../../useCases/courses/listCoursesUseCase";
import { COURSE_LIST_USECASE } from "@/scolar/domain/symbols/CourseSymbol";
import { useCallback, useEffect, useState } from "react";
import { Course } from "@/scolar/domain/entities/course";
import { toast } from "@/hooks/use-toast";
import { PaginatedResult } from "@/scolar/infrastructure/dto/paginateDto";


export const useFetchCourse = (page: number, size: number, filters: string) => {
  const listUseCase = useInjection<ListCoursesUseCase>(COURSE_LIST_USECASE);
  const [courses, setCourses] = useState<Course[]>([]);

  const fetchCourses = useCallback(() => {
    listUseCase
      .execute(new ListCoursesCommand(page, size,[], filters))
      .then((res) => {
        if (res.isLeft()) {
          toast({
            title: "Error",
            description: "No se pudieron cargar los cursos",
            variant: "destructive",
          });
          return;
        }
        const data = res.extract() as PaginatedResult<Course>;
        setCourses(data ? data.data : []);
      });
  }, [listUseCase, page, size, filters]);


  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  return courses;
}