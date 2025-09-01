// ClassScheduleCalendarContainer.tsx
import { useCallback, useEffect, useMemo, useState, useTransition } from "react";
import { useInjection } from "inversify-react";
import { toast } from "@/hooks/use-toast";

import {
    ListClassSchedulesUseCase,
    ListClassSchedulesCommand,
} from "@/scolar/application/useCases/classSchedules/listClassSchedulesUseCase";
import {
    CreateClassScheduleUseCase,
    CreateClassScheduleCommand,
} from "@/scolar/application/useCases/classSchedules/createClassScheduleUseCase";
import {
    UpdateClassScheduleUseCase,
    UpdateClassScheduleCommand,
} from "@/scolar/application/useCases/classSchedules/updateClassScheduleUseCase";
import {
    DeleteClassScheduleUseCase,
    DeleteClassScheduleCommand,
} from "@/scolar/application/useCases/classSchedules/deleteClassScheduleUseCase";
import {
    GenerateClassScheduleUseCase,
    GenerateClassScheduleUseCaseCommand,
} from "@/scolar/application/useCases/classSchedules/generateClassScheduleUseCase";

import {
    CLASS_SCHEDULE_LIST_USE_CASE,
    CLASS_SCHEDULE_CREATE_USE_CASE,
    CLASS_SCHEDULE_UPDATE_USE_CASE,
    CLASS_SCHEDULE_DELETE_USE_CASE,
    CLASS_SCHEDULE_GENERATE_USE_CASE,
    PRINT_CLASS_SCHEDULE_USE_CASE,
} from "@/scolar/domain/symbols/ClassScheduleSymbol";

import { ClassSchedule } from "@/scolar/domain/entities/classSchedule";
import { Section } from "@/scolar/domain/entities/section";
import { HEIGHT_X_HOUR, parseHour, parseMinutes, PER_PAGE } from "@/lib/time";
import { formatTime } from "@/scolar/presentation/hooks/useSchedulePosition";

import { useFetchCourse } from "@/scolar/application/hooks/courses/useFetchCourse";
import { useFetchSchoolYears } from "@/scolar/application/hooks/school-year/useFetchSchoolYear";
import { useFetchSubjects } from "@/scolar/application/hooks/subject/useFetchSubject";
import { useFilterParallels } from "@/scolar/application/hooks/parallels/useFilterParallels";
import { useByCourseSubject } from "@/scolar/application/hooks/subject/useByFilterSubject";
import { useFetchSectionBreaks } from "@/scolar/application/hooks/sectionBreaks/useFetchSectionBreaks";

import { ClassScheduleCalendarPresenter } from "./ClassScheduleCalendarPresenter";
import { PrintCalendarUseCase, PrintCalendarUseCaseCommand } from "@/scolar/application/useCases/classSchedules/printClassScheduleUseCase";

export const ClassScheduleCalendarContainer = () => {
    // ---- UseCases (inyección de dependencias) ----
    const listUseCase = useInjection<ListClassSchedulesUseCase>(
        CLASS_SCHEDULE_LIST_USE_CASE
    );
    const createUseCase = useInjection<CreateClassScheduleUseCase>(
        CLASS_SCHEDULE_CREATE_USE_CASE
    );
    const updateUseCase = useInjection<UpdateClassScheduleUseCase>(
        CLASS_SCHEDULE_UPDATE_USE_CASE
    );
    const deleteUseCase = useInjection<DeleteClassScheduleUseCase>(
        CLASS_SCHEDULE_DELETE_USE_CASE
    );
    const generateScheduleUseCase = useInjection<GenerateClassScheduleUseCase>(
        CLASS_SCHEDULE_GENERATE_USE_CASE
    );
    const printPdfUseCase = useInjection<PrintCalendarUseCase>(PRINT_CLASS_SCHEDULE_USE_CASE);

    // ---- Estados base ----
    const [selectedCourse, setSelectedCourse] = useState<number>(0);
    const [selectedParallel, setSelectedParallel] = useState<number>(0);
    const [selectedSchoolYear, setSelectedSchoolYear] = useState<number>(0);
    const [selectedSubject, setSelectedSubject] = useState<number>(0);
    const [selectedSection, setSelectedSection] = useState<Section | null>(null);

    const [schedules, setSchedules] = useState<ClassSchedule[]>([]);
    const [savedId, ] = useState<number | null>(null);
    const [, setEditing] = useState<ClassSchedule | null>(null);

    const [, startTransition] = useTransition();

    // ---- Fetch hooks ----
    const courses = useFetchCourse(1, PER_PAGE, "");
    const schoolYears = useFetchSchoolYears(1, PER_PAGE, "", "active");
    const subjects = useFetchSubjects(1, PER_PAGE, "");
    const courseSubject = useByCourseSubject(selectedCourse);
    const parallels = useFilterParallels(
        1,
        10,
        "",
        selectedCourse,
        selectedSchoolYear,
        undefined,
        undefined,
        selectedSection?.id
    );
    const sectionBreaks = useFetchSectionBreaks(1, 100, selectedSection?.id);

    // ---- Lookups memorizados ----
    const courseById = useMemo(
        () => new Map(courses.map((c) => [c.id, c])),
        [courses]
    );
    const parallelById = useMemo(
        () => new Map(parallels.data.map((p) => [p.id, p])),
        [parallels]
    );
    const subjectById = useMemo(
        () => new Map(subjects.map((s) => [s.id, s])),
        [subjects]
    );

    const schoolYearById = useMemo(
        () => new Map(schoolYears.map((sy) => [sy.id, sy])),
        [schoolYears]
    );

    // ---- Efectos iniciales ----
    useEffect(() => {
        if (schoolYears && schoolYears.length > 0) {
            setSelectedSchoolYear(schoolYears[0].id);
        } else {
            toast({
                title: "Error",
                description: "No se encontraron años escolares activos",
                variant: "destructive",
            });
        }
    }, [schoolYears]);

    useEffect(() => {
        if (selectedParallel) {
            const parallel = parallelById.get(selectedParallel);
            if (parallel?.section) setSelectedSection(parallel.section);
        }
    }, [selectedParallel, parallelById]);

    // ---- Load schedules ----
    const load = useCallback(() => {
        startTransition(() => {
            listUseCase
                .execute(new ListClassSchedulesCommand(1, PER_PAGE, [], ""))
                .then((res) => {
                    if (res.isRight()) {
                        const data = res.extract()!.data;
                        const mapped = data.map((s) => ({
                            ...s,
                            course: courseById.get(s.courseId),
                            parallel: parallelById.get(s.parallelId),
                            subject: subjectById.get(s.subjectId),
                        }));
                        setSchedules(mapped);
                    } else {
                        toast({
                            title: "Error",
                            description: "No se pudo cargar",
                            variant: "destructive",
                        });
                    }
                });
        });
    }, [listUseCase, courseById, parallelById, subjectById]);

    useEffect(() => {
        if (courses.length || parallels.data.length || subjects.length) {
            load();
        }
    }, [courses.length, parallels.data.length, subjects.length, load]);

    // ---- Handlers ----
    const handleAdd = (newSchedule: ClassSchedule) =>{
        //setSchedules((prev) => [...prev, newSchedule]);
        handleSave(newSchedule);
    }
        

    const handleSave = useCallback(
        async (data: ClassSchedule) => {
            const res = await createUseCase.execute(
                new CreateClassScheduleCommand(data)
            );
            if (res.isLeft()) {
                toast({
                    title: "Error",
                    description:
                        "No se pudo crear el horario " +
                        res.extract().map((e) => e.getMessage()).join(","),
                    variant: "destructive",
                });
                return;
            }
            load();
            toast({
                title: "Horario creado",
                description: "El horario se creó correctamente",
                variant: "success",
            });
           
        },
        [createUseCase, load]
    );



    const handlePrint =   useCallback(async() => {
        const courseName = courseById.get(selectedCourse)?.name || '';
        const parallelName = parallelById.get(selectedParallel)?.name || '';
        const schoolYear = schoolYearById.get(selectedSchoolYear)?.name || '';
        const filename = courseName + "_" + parallelName + "_" + schoolYear + ".pdf";
        await printPdfUseCase.execute(
            new PrintCalendarUseCaseCommand("calendar", filename, courseName, parallelName, schoolYear)
        );
    }, [schedules, courseById, parallelById, schoolYearById, printPdfUseCase, selectedParallel, selectedCourse, selectedSchoolYear]);

    /*const updateLocalSchedule = (updatedSchedule: ClassSchedule) => {
        console.log("Updating schedule:", updatedSchedule);
        setSchedules((prev) => {
            

            const idx = prev.findIndex((s) => s.id === updatedSchedule.id);
            if (idx === -1) {
                return [...prev, updatedSchedule];
            }
            const copy = [...prev];
            copy[idx] = updatedSchedule;
            return copy;
        });
    };*/

        


    const handleUpdate = useCallback(
        async (s: ClassSchedule) => {
            const res = await updateUseCase.execute(
                new UpdateClassScheduleCommand(s)
            );
            if (res.isLeft()) {
                toast({
                    title: "Error",
                    description:
                        "No se pudo actualizar el horario " +
                        res.extract().map((e) => e.getMessage()).join(","),
                    variant: "destructive",
                });
                load()
                return;
            }
            load()
            toast({
                title: "Horario actualizado",
                description: "El horario se actualizó correctamente",
                variant: "success",
            });
           
        },
        [updateUseCase, load]
    );

    const handleDelete = useCallback(
        (s: ClassSchedule) => {
            if (!confirm("¿Eliminar esta clase?")) return;
            startTransition(async () => {
                const res = await deleteUseCase.execute(
                    new DeleteClassScheduleCommand(s.id)
                );
                if (res.isLeft()) {
                    toast({
                        title: "Error",
                        description: "No se pudo eliminar",
                        variant: "destructive",
                    });
                    return;
                }
                toast({
                    title: "Horario eliminado",
                    description: "Eliminado correctamente",
                    variant: "success",
                });
                load();
            });
        },
        [deleteUseCase, load]
    );

    const handleGenerate = useCallback(async () => {
        const res = await generateScheduleUseCase.execute(
            new GenerateClassScheduleUseCaseCommand(selectedParallel)
        );
        if (res.isLeft()) {
            toast({
                title: "Error",
                description:
                    "No se pudo generar el horario " +
                    res.extract().map((e) => e.getMessage()).join(","),
            });
            return;
        }
        setSchedules(res.extract() as ClassSchedule[]);
    }, [selectedParallel, generateScheduleUseCase]);

    const startTime =
        selectedSection?.startTime ? parseHour(selectedSection.startTime) : 8;

    const handleDrop = (e: React.DragEvent<HTMLDivElement>, day: string) => {
        e.preventDefault();
        const payload = e.dataTransfer.getData("application/json");
        if (!payload) return;

        const data = JSON.parse(payload);
        const rect = e.currentTarget.getBoundingClientRect();
        const offsetY = e.clientY - rect.top;
        const minutesFromStart = (offsetY / HEIGHT_X_HOUR) * 60;
        const slotMinutes = parseMinutes(selectedSection?.classDuration || "00:45:00");

        // Calcular inicio bruto
        const rawMinutes = startTime * 60 + minutesFromStart;

        // Alinear al múltiplo más cercano de slotMinutes
        const startMinutes = Math.floor(rawMinutes / slotMinutes) * slotMinutes;
        const endMinutes = startMinutes + slotMinutes;

        if (data.startTime) {
            handleUpdate({
                ...data,
                dayOfWeek: day,
                startTime: formatTime(startMinutes),
                endTime: formatTime(endMinutes),
            });
        } else {
            handleAdd({
                id: Date.now(),
                subjectId: data.subjectId,
                subjectName: data.subjectName,
                courseId: selectedCourse!,
                parallelId: selectedParallel!,
                dayOfWeek: day,
                startTime: formatTime(startMinutes),
                endTime: formatTime(endMinutes),
                schoolYearId: selectedSchoolYear,
            } as ClassSchedule);
        }
    };

    // ---- Render ----
    return (
        <ClassScheduleCalendarPresenter
            schedules={schedules}
            onGenerate={handleGenerate}
            onSelect={setEditing}
            onDelete={handleDelete}
            course={courses}
            parallel={parallels.data}
            subject={courseSubject}
            year={schoolYears}
            onSearchCourse={() => { }}
            onSearchParallel={() => { }}
            onSearchSubject={() => { }}
            selectedCourseId={selectedCourse}
            selectedParallelId={selectedParallel}
            selectedSubjectId={selectedSubject}
            setSelectedCourseId={setSelectedCourse}
            setSelectedParallelId={setSelectedParallel}
            setSelectedSubjectId={setSelectedSubject}
            sectionSelected={selectedSection || undefined}
            sectionBreaks={sectionBreaks}
            onSave={handleSave}
            savedId={savedId}
            onDrop={handleDrop}
            onPrint={handlePrint}
        />
    );
};
