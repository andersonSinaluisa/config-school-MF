import { useState, useEffect, useCallback } from "react";
import { useInjection } from "inversify-react";
import { COURSE_GET_USECASE } from "@/scolar/domain/symbols/CourseSymbol";
import { SUBJECT_LIST_USE_CASE } from "@/scolar/domain/symbols/SubjectSymbol";
import { GetCourseUseCase, GetCourseCommand } from "@/scolar/application/useCases/courses/getCourseUseCase";
import { ListSubjectUseCase } from "@/scolar/application/useCases/subjects/listSubjectsUseCase";
import { PaginatedResult } from "@/scolar/infrastructure/dto/paginateDto";
import { Subject } from "@/scolar/domain/entities/subject";
import { Course } from "@/scolar/domain/entities/course";
import { toast } from "@/hooks/use-toast";
import { PaginateUseCaseCommand } from "@/scolar/application/useCases/useCase";
import { ListSubjectFromCourseCommand, ListSubjectFromCourseUseCase } from "../../useCases/courses/listSubjectFromCourse";
import { COURSE_SUBJECT_LIST_FROM_COURSE_USECASE } from "@/scolar/domain/symbols/CourseSubjectSymbol";
import { CourseSubject } from "@/scolar/domain/entities/course_subject";

export function useCourseWithSubjectsData(courseId: number) {
    const getCourse = useInjection<GetCourseUseCase>(COURSE_GET_USECASE);
    const listSubjectsUseCase = useInjection<ListSubjectUseCase>(SUBJECT_LIST_USE_CASE);
    const listSubjectsFromCourseUseCase = useInjection<ListSubjectFromCourseUseCase>(COURSE_SUBJECT_LIST_FROM_COURSE_USECASE);
    const [course, setCourse] = useState<Course>(new Course(0, "",0,""))
    const [subjectsFromCourse, setSubjectsFromCourse] = useState<CourseSubject[]>([]);
    const [allSubjects, setAllSubjects] = useState<PaginatedResult<Subject>>({
        data: [],
        meta: {
            currentPage: 1,
            lastPage: 1,
            next: null,
            perPage: 10,
            prev: null,
            total: 0
        }
    });
    const [isLoading, setIsLoading] = useState(true);

    const [paginateCommand, setPaginateCommand] = useState<PaginateUseCaseCommand>(
        () => new PaginateUseCaseCommand(1, 10, ["id"])
    );


    const fetchSubjectsFromCourse = useCallback(async () => {
        const subjectsRes = await listSubjectsFromCourseUseCase.execute(new ListSubjectFromCourseCommand(courseId));
        if (subjectsRes.isLeft()) {
            toast({
                title: "Error",
                description: "No se pudieron cargar las materias del curso.",
                variant: "destructive"
            });
            return;
        }
        const listSubjectsFromCourse = subjectsRes.extract() as CourseSubject[];
        setSubjectsFromCourse(listSubjectsFromCourse);
        
    }, [courseId, listSubjectsFromCourseUseCase]);

    const fetchData = useCallback(async () => {
        setIsLoading(true);

        const [courseRes, subjectsRes] = await Promise.all([
            getCourse.execute(new GetCourseCommand(courseId)),
            listSubjectsUseCase.execute(paginateCommand)
        ]);

        if (courseRes.isLeft()) {
            toast({
                title: "Error",
                description: "No se pudo cargar el curso.",
                variant: "destructive"
            });
        } else {
            setCourse(courseRes.extract() as Course);
        }

        if (subjectsRes.isLeft()) {
            toast({
                title: "Error",
                description: "No se pudieron cargar las materias.",
                variant: "destructive"
            });
        } else {
            setAllSubjects(subjectsRes.extract() as PaginatedResult<Subject>);
        }

        setIsLoading(false);
    }, [courseId, paginateCommand]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    useEffect(() => {
        fetchSubjectsFromCourse();
    }, [fetchSubjectsFromCourse]);

    return {
        course,
        allSubjects,
        isLoading,
        reload: fetchData,
        setPaginateCommand,
        paginateCommand,
        subjectsFromCourse,
    };
}
