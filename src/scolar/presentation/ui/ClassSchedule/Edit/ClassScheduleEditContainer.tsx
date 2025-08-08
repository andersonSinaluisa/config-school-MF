import { startTransition, useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useInjection } from "inversify-react";
import { toast } from "@/hooks/use-toast";
import { useNavigate, useParams } from "react-router-dom";
import { ClassSchedule } from "@/scolar/domain/entities/classSchedule";
import { GetClassScheduleUseCase, GetClassScheduleCommand } from "@/scolar/application/useCases/classSchedules/getClassScheduleUseCase";
import { UpdateClassScheduleUseCase, UpdateClassScheduleCommand } from "@/scolar/application/useCases/classSchedules/updateClassScheduleUseCase";
import { CLASS_SCHEDULE_GET_USE_CASE, CLASS_SCHEDULE_UPDATE_USE_CASE } from "@/scolar/domain/symbols/ClassScheduleSymbol";
import { ClassScheduleEditPresenter } from "./ClassScheduleEditPresenter";
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

export const ClassScheduleEditContainer = () => {
    const { id } = useParams<{ id: string }>();
    const getUseCase = useInjection<GetClassScheduleUseCase>(CLASS_SCHEDULE_GET_USE_CASE);
    const updateUseCase = useInjection<UpdateClassScheduleUseCase>(CLASS_SCHEDULE_UPDATE_USE_CASE);
    const listCourses = useInjection<ListCoursesUseCase>(COURSE_LIST_USECASE);
    const listSubjects = useInjection<ListSubjectUseCase>(SUBJECT_LIST_USE_CASE);
    const listSchoolYears = useInjection<ListSchoolYearUseCase>(SCHOOL_YEAR_LIST_USE_CASE);
    const listParallelsByCourse = useInjection<ListParallelByCourseUseCase>(PARALLEL_GET_LIST_BY_COURSE_USECASE);
    const { register, handleSubmit, formState: { errors }, setValue, watch, control } = useForm<UpdateClassScheduleCommand>({
        defaultValues: { data: { id: Number(id), courseId: 0, parallelId: 0, schoolYearId: 0, subjectId: 0, dayOfWeek: '', startTime: '', endTime: '' } }
    });
    const data = watch();
    const [courses, setCourses] = useState<Course[]>([]);
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [schoolYears, setSchoolYears] = useState<SchoolYear[]>([]);
    const [parallels, setParallels] = useState<Parallel[]>([]);
    const selectedCourse = watch("data.courseId");

    const load = useCallback(() => {
        startTransition(() => {
            getUseCase.execute(new GetClassScheduleCommand(Number(id))).then(res => {
                if (res.isLeft()) {
                    toast({ title: 'Error', description: 'No encontrado', variant: 'destructive' });
                    return;
                }
                const m = res.extract() as ClassSchedule;
                setValue('data.id', m.id);
                setValue('data.courseId', m.courseId);
                setValue('data.parallelId', m.parallelId);
                setValue('data.schoolYearId', m.schoolYearId);
                setValue('data.subjectId', m.subjectId);
                setValue('data.dayOfWeek', m.dayOfWeek);
                setValue('data.startTime', m.startTime);
                setValue('data.endTime', m.endTime);
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
            updateUseCase.execute(new UpdateClassScheduleCommand(data.data)).then(res => {
                if (res.isLeft()) {
                    toast({ title: 'Error', description: 'No se pudo actualizar', variant: 'destructive' });
                    return;
                }
                toast({ title: 'Actualizado', description: 'Horario actualizado' });
            });
        });
    };
    const navigate = useNavigate();
    const onCancel = () => navigate('/horarios-clase');
    return (
        <ClassScheduleEditPresenter
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
