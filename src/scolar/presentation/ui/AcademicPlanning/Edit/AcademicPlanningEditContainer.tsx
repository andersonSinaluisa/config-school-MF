import { startTransition, useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useInjection } from "inversify-react";
import { toast } from "@/hooks/use-toast";
import { useNavigate, useParams } from "react-router-dom";
import { AcademicPlanning } from "@/scolar/domain/entities/academicPlanning";
import { GetAcademicPlanningUseCase, GetAcademicPlanningCommand } from "@/scolar/application/useCases/academicPlannings/getAcademicPlanningUseCase";
import { UpdateAcademicPlanningUseCase, UpdateAcademicPlanningCommand } from "@/scolar/application/useCases/academicPlannings/updateAcademicPlanningUseCase";
import { ACADEMIC_PLANNING_GET_USE_CASE, ACADEMIC_PLANNING_UPDATE_USE_CASE } from "@/scolar/domain/symbols/AcademicPlanningSymbol";
import { AcademicPlanningEditPresenter } from "./AcademicPlanningEditPresenter";
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

export const AcademicPlanningEditContainer = () => {
    const { id } = useParams<{ id: string }>();
    const getUseCase = useInjection<GetAcademicPlanningUseCase>(ACADEMIC_PLANNING_GET_USE_CASE);
    const updateUseCase = useInjection<UpdateAcademicPlanningUseCase>(ACADEMIC_PLANNING_UPDATE_USE_CASE);
    const listCourses = useInjection<ListCoursesUseCase>(COURSE_LIST_USECASE);
    const listSubjects = useInjection<ListSubjectUseCase>(SUBJECT_LIST_USE_CASE);
    const listSchoolYears = useInjection<ListSchoolYearUseCase>(SCHOOL_YEAR_LIST_USE_CASE);
    const listParallelsByCourse = useInjection<ListParallelByCourseUseCase>(PARALLEL_GET_LIST_BY_COURSE_USECASE);
    const { register, handleSubmit, formState: { errors }, setValue, watch, control } = useForm<UpdateAcademicPlanningCommand>({
        defaultValues: { data: { id: Number(id), courseId: 0, parallelId: 0, schoolYearId: 0, subjectId: 0, topic: '', startDate: '', endDate: '', description: '' } }
    });
    const data = watch();
    const [courses, setCourses] = useState<Course[]>([]);
    const [parallels, setParallels] = useState<Parallel[]>([]);
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [schoolYears, setSchoolYears] = useState<SchoolYear[]>([]);
    const selectedCourse = watch("data.courseId");

    const load = useCallback(() => {
        startTransition(() => {
            getUseCase.execute(new GetAcademicPlanningCommand(Number(id))).then(res => {
                if (res.isLeft()) {
                    toast({ title: 'Error', description: 'No encontrado', variant: 'destructive' });
                    return;
                }
                const m = res.extract() as AcademicPlanning;
                setValue('data.id', m.id);
                setValue('data.courseId', m.courseId);
                setValue('data.parallelId', m.parallelId);
                setValue('data.schoolYearId', m.schoolYearId);
                setValue('data.subjectId', m.subjectId);
                setValue('data.topic', m.topic);
                setValue('data.startDate', m.startDate);
                setValue('data.endDate', m.endDate);
                setValue('data.description', m.description);
            });
        });
    }, [getUseCase, id, setValue]);

    useEffect(() => {
        listCourses.execute(new ListCoursesCommand(1, 100, ["id"]))
            .then(res => res.isRight() && setCourses((res.extract() as PaginatedResult<Course>).data));
        listSubjects.execute(new ListSubjectCommand(1, 100, ["id"]))
            .then(res => res.isRight() && setSubjects((res.extract() as PaginatedResult<Subject>).data));
        listSchoolYears.execute(new ListSchoolYearUseCaseCommand(1, 100, ["id"]))
            .then(res => res.isRight() && setSchoolYears((res.extract() as PaginatedResult<SchoolYear>).data));
    }, [listCourses, listSubjects, listSchoolYears]);

    useEffect(() => {
        if (!selectedCourse) {
            setParallels([]);
            return;
        }
        listParallelsByCourse.execute(new ListParallelByCourseUseCaseCommand(Number(selectedCourse), 1, 100, ["id"]))
            .then(res => res.isRight() && setParallels((res.extract() as PaginatedResult<Parallel>).data));
    }, [selectedCourse, listParallelsByCourse]);

    useEffect(() => { load(); }, [load]);

    const onSubmit = () => {
        startTransition(() => {
            updateUseCase.execute(new UpdateAcademicPlanningCommand(data.data)).then(res => {
                if (res.isLeft()) {
                    toast({ title: 'Error', description: 'No se pudo actualizar', variant: 'destructive' });
                    return;
                }
                toast({ title: 'Actualizado', description: 'Planificación actualizada' });
            });
        });
    };
    const navigate = useNavigate();
    const onCancel = () => navigate('/planificaciones-academicas');
    return (
        <AcademicPlanningEditPresenter
            onSubmit={handleSubmit(onSubmit)}
            onCancel={onCancel}
            register={register}
            control={control}
            errors={errors}
            isSubmitting={false}
            courses={courses}
            parallels={parallels}
            subjects={subjects}
            schoolYears={schoolYears}
        />
    );
};
