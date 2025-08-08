import { useCallback, useEffect, useState, useTransition } from "react";
import { useInjection } from "inversify-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AcademicPlanningCreatePresenter } from "./AcademicPlanningCreatePresenter";
import { toast } from "@/hooks/use-toast";
import { CreateAcademicPlanningCommand, CreateAcademicPlanningUseCase } from "@/scolar/application/useCases/academicPlannings/createAcademicPlanningUseCase";
import { ACADEMIC_PLANNING_CREATE_USE_CASE } from "@/scolar/domain/symbols/AcademicPlanningSymbol";
import { COURSE_LIST_USECASE } from "@/scolar/domain/symbols/CourseSymbol";
import { SUBJECT_LIST_USE_CASE } from "@/scolar/domain/symbols/SubjectSymbol";
import { SCHOOL_YEAR_LIST_USE_CASE } from "@/scolar/domain/symbols/SchoolYearSymbol";
import { PARALLEL_GET_LIST_BY_COURSE_USECASE } from "@/scolar/domain/symbols/ParallelSymbol";
import { ListCoursesUseCase, ListCoursesCommand } from "@/scolar/application/useCases/courses/listCoursesUseCase";
import { ListSubjectUseCase, ListSubjectCommand } from "@/scolar/application/useCases/subjects/listSubjectsUseCase";
import { ListSchoolYearUseCase, ListSchoolYearUseCaseCommand } from "@/scolar/application/useCases/schoolYears/listSchoolYearUseCase";
import { ListParallelByCourseUseCase, ListParallelByCourseUseCaseCommand } from "@/scolar/application/useCases/parallels/listParallelByCourseUseCase";
import { Course } from "@/scolar/domain/entities/course";
import { Parallel } from "@/scolar/domain/entities/parallel";
import { Subject } from "@/scolar/domain/entities/subject";
import { SchoolYear } from "@/scolar/domain/entities/school_year";
import { PaginatedResult } from "@/scolar/infrastructure/dto/paginateDto";

export const AcademicPlanningCreateContainer = () => {
    const usecase = useInjection<CreateAcademicPlanningUseCase>(ACADEMIC_PLANNING_CREATE_USE_CASE);
    const listCourses = useInjection<ListCoursesUseCase>(COURSE_LIST_USECASE);
    const listSubjects = useInjection<ListSubjectUseCase>(SUBJECT_LIST_USE_CASE);
    const listSchoolYears = useInjection<ListSchoolYearUseCase>(SCHOOL_YEAR_LIST_USE_CASE);
    const listParallelsByCourse = useInjection<ListParallelByCourseUseCase>(PARALLEL_GET_LIST_BY_COURSE_USECASE);

    const [courses, setCourses] = useState<Course[]>([]);
    const [parallels, setParallels] = useState<Parallel[]>([]);
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [schoolYears, setSchoolYears] = useState<SchoolYear[]>([]);

    const [isPending, startTransition] = useTransition();
    const { register, handleSubmit, formState: { errors }, control, watch } = useForm<CreateAcademicPlanningCommand>({
        defaultValues: { data: { id: 0, courseId: 0, parallelId: 0, schoolYearId: 0, subjectId: 0, topic: '', startDate: '', endDate: '', description: '' } }
    });
    const selectedCourse = watch("data.courseId");

    const fetchInitialData = useCallback(() => {
        listCourses.execute(new ListCoursesCommand(1, 100, ["id"]))
            .then(res => res.isRight() && setCourses((res.extract() as PaginatedResult<Course>).data));
        listSubjects.execute(new ListSubjectCommand(1, 100, ["id"]))
            .then(res => res.isRight() && setSubjects((res.extract() as PaginatedResult<Subject>).data));
        listSchoolYears.execute(new ListSchoolYearUseCaseCommand(1, 100, ["id"]))
            .then(res => res.isRight() && setSchoolYears((res.extract() as PaginatedResult<SchoolYear>).data));
    }, [listCourses, listSubjects, listSchoolYears]);

    useEffect(() => { fetchInitialData(); }, [fetchInitialData]);

    useEffect(() => {
        if (!selectedCourse) {
            setParallels([]);
            return;
        }
        listParallelsByCourse.execute(new ListParallelByCourseUseCaseCommand(Number(selectedCourse), 1, 100, ["id"]))
            .then(res => res.isRight() && setParallels((res.extract() as PaginatedResult<Parallel>).data));
    }, [selectedCourse, listParallelsByCourse]);

    const navigate = useNavigate();
    const onSubmit = (data: CreateAcademicPlanningCommand) => {
        startTransition(async () => {
            const res = await usecase.execute(new CreateAcademicPlanningCommand(data.data));
            if (res.isLeft()) {
                toast({ title: 'Error', description: 'No se pudo crear', variant: 'destructive' });
                return;
            }
            toast({ title: 'Planificación creada', description: 'Planificación creada correctamente', variant: 'success' });
            navigate('/planificaciones-academicas');
        });
    };
    const onCancel = () => navigate('/planificaciones-academicas');
    return (
        <AcademicPlanningCreatePresenter
            onSubmit={handleSubmit(onSubmit)}
            onCancel={onCancel}
            register={register}
            control={control}
            errors={errors}
            isSubmitting={isPending}
            courses={courses}
            parallels={parallels}
            subjects={subjects}
            schoolYears={schoolYears}
        />
    );
};
