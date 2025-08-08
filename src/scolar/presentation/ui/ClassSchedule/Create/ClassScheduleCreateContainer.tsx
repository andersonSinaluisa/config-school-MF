import { useCallback, useEffect, useTransition, useState } from "react";
import { useInjection } from "inversify-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { ClassScheduleCreatePresenter } from "./ClassScheduleCreatePresenter";
import { toast } from "@/hooks/use-toast";
import {
    CreateClassScheduleCommand,
    CreateClassScheduleUseCase
} from "@/scolar/application/useCases/classSchedules/createClassScheduleUseCase";
import { CLASS_SCHEDULE_CREATE_USE_CASE } from "@/scolar/domain/symbols/ClassScheduleSymbol";
import { COURSE_LIST_USECASE } from "@/scolar/domain/symbols/CourseSymbol";
import { SUBJECT_LIST_USE_CASE } from "@/scolar/domain/symbols/SubjectSymbol";
import {
    ListSchoolYearUseCase,
    ListSchoolYearUseCaseCommand
} from "@/scolar/application/useCases/schoolYears/listSchoolYearUseCase";
import { SCHOOL_YEAR_LIST_USE_CASE } from "@/scolar/domain/symbols/SchoolYearSymbol";
import {
    ListCoursesUseCase,
    ListCoursesCommand
} from "@/scolar/application/useCases/courses/listCoursesUseCase";
import {
    ListSubjectUseCase,
    ListSubjectCommand
} from "@/scolar/application/useCases/subjects/listSubjectsUseCase";
import {
    ListParallelByCourseUseCase,
    ListParallelByCourseUseCaseCommand
} from "@/scolar/application/useCases/parallels/listParallelByCourseUseCase";
import { PARALLEL_GET_LIST_BY_COURSE_USECASE } from "@/scolar/domain/symbols/ParallelSymbol";
import { Course } from "@/scolar/domain/entities/course";
import { Parallel } from "@/scolar/domain/entities/parallel";
import { Subject } from "@/scolar/domain/entities/subject";
import { SchoolYear } from "@/scolar/domain/entities/school_year";
import { PaginatedResult } from "@/scolar/infrastructure/dto/paginateDto";

export const ClassScheduleCreateContainer = () => {
    const usecase = useInjection<CreateClassScheduleUseCase>(CLASS_SCHEDULE_CREATE_USE_CASE);
    const listCourses = useInjection<ListCoursesUseCase>(COURSE_LIST_USECASE);
    const listSubjects = useInjection<ListSubjectUseCase>(SUBJECT_LIST_USE_CASE);
    const listSchoolYears = useInjection<ListSchoolYearUseCase>(SCHOOL_YEAR_LIST_USE_CASE);
    const listParallelsByCourse = useInjection<ListParallelByCourseUseCase>(PARALLEL_GET_LIST_BY_COURSE_USECASE);

    const [courses, setCourses] = useState<Course[]>([]);
    const [parallels, setParallels] = useState<Parallel[]>([]);
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [schoolYears, setSchoolYears] = useState<SchoolYear[]>([]);

    const [isPending, startTransition] = useTransition();
    const { register, handleSubmit, formState: { errors }, control, watch } = useForm<CreateClassScheduleCommand>({
        defaultValues: { data: { id: 0, courseId: 0, parallelId: 0, schoolYearId: 0, subjectId: 0, dayOfWeek: '', startTime: '', endTime: '' } }
    });
    const formData = watch();

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
    const onSubmit = (data: CreateClassScheduleCommand) => {
        startTransition(async () => {
            const res = await usecase.execute(new CreateClassScheduleCommand(data.data));
            if (res.isLeft()) {
                toast({ title: 'Error', description: 'No se pudo crear', variant: 'destructive' });
                return;
            }
            toast({ title: 'Horario creado', description: 'Horario creado correctamente', variant: 'success' });
            navigate('/horarios-clase');
        });
    };
    const onCancel = () => navigate('/horarios-clase');
    return (
        <ClassScheduleCreatePresenter
            onSubmit={handleSubmit(onSubmit)}
            onCancel={onCancel}
            register={register}
            errors={errors}
            isSubmitting={isPending}
            control={control}
            courses={courses}
            parallels={parallels}
            subjects={subjects}
            schoolYears={schoolYears}
            formData={formData}

        />
    );
};
