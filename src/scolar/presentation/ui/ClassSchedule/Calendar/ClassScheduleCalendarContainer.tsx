import { ListClassSchedulesUseCase, ListClassSchedulesCommand } from "@/scolar/application/useCases/classSchedules/listClassSchedulesUseCase";
import { CreateClassScheduleUseCase, CreateClassScheduleCommand } from "@/scolar/application/useCases/classSchedules/createClassScheduleUseCase";
import { UpdateClassScheduleUseCase, UpdateClassScheduleCommand } from "@/scolar/application/useCases/classSchedules/updateClassScheduleUseCase";
import { DeleteClassScheduleUseCase, DeleteClassScheduleCommand } from "@/scolar/application/useCases/classSchedules/deleteClassScheduleUseCase";

import { useCallback, useEffect, useMemo, useState, useTransition } from "react";
import { useInjection } from "inversify-react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { ClassSchedule } from "@/scolar/domain/entities/classSchedule";


import {
    CLASS_SCHEDULE_LIST_USE_CASE,
    CLASS_SCHEDULE_CREATE_USE_CASE,
    CLASS_SCHEDULE_UPDATE_USE_CASE,
    CLASS_SCHEDULE_DELETE_USE_CASE
} from "@/scolar/domain/symbols/ClassScheduleSymbol";

import { ClassScheduleCalendarPresenter } from "./ClassScheduleCalendarPresenter";
import { useFetchCourse } from "@/scolar/application/hooks/courses/useFetchCourse";
import { useFetchSchoolYears } from "@/scolar/application/hooks/school-year/useFetchSchoolYear";
import { useFetchSubjects } from "@/scolar/application/hooks/subject/useFetchSubject";
import { useFetchSection } from "@/scolar/application/hooks/sections/useFetchSection";
import { PER_PAGE, ScheduleView } from "@/lib/time";
import { Section } from "@/scolar/domain/entities/section";
import { useFilterParallels } from "@/scolar/application/hooks/parallels/useFilterParallels";
import { useByCourseSubject } from "@/scolar/application/hooks/subject/useByFilterSubject";



// -------------------- Componente --------------------
export const ClassScheduleCalendarContainer = () => {
    // Paginaciones unificadas (más simple de extender)
    const [paginateCourse, setPaginateCourse] = useState({ page: 1, perPage: PER_PAGE, search: "" });
    const [, setPaginateParallels] = useState({ page: 1, perPage: PER_PAGE, search: "" });
    const [paginateSchoolYears, setPaginateSchoolYears] = useState({ page: 1, perPage: PER_PAGE, search: "" });
    const [paginateSubjects, setPaginateSubjects] = useState({ page: 1, perPage: PER_PAGE, search: "" });
    const [paginateSections] = useState({ page: 1, perPage: PER_PAGE, search: "" });


    // Valores seleccionados
    const [selectedCourse, setSelectedCourse] = useState<number>(0);
    const [selectedParallel, setSelectedParallel] = useState<number>(0);
    const [selectedSchoolYear, setSelectedSchoolYear] = useState<number>(0);
    const [selectedSubject, setSelectedSubject] = useState<number>(0);
    const [selectedSection, setSelectedSection] = useState<Section | null>(null);
    // Fetchs
    const courses = useFetchCourse(paginateCourse.page, paginateCourse.perPage, paginateCourse.search || "");
    const schoolYears = useFetchSchoolYears(paginateSchoolYears.page, paginateSchoolYears.perPage, paginateSchoolYears.search || "");
    const subjects = useFetchSubjects(paginateSubjects.page, paginateSubjects.perPage, paginateSubjects.search || "");
    const sections = useFetchSection(paginateSections.page, paginateSections.perPage, paginateSections.search || "");
    const courseSubject = useByCourseSubject(selectedCourse)

    // Use cases
    const listUseCase = useInjection<ListClassSchedulesUseCase>(CLASS_SCHEDULE_LIST_USE_CASE);
    const createUseCase = useInjection<CreateClassScheduleUseCase>(CLASS_SCHEDULE_CREATE_USE_CASE);
    const updateUseCase = useInjection<UpdateClassScheduleUseCase>(CLASS_SCHEDULE_UPDATE_USE_CASE);
    const deleteUseCase = useInjection<DeleteClassScheduleUseCase>(CLASS_SCHEDULE_DELETE_USE_CASE);

    // Estado
    const [schedules, setSchedules] = useState<ScheduleView[]>([]);
    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState<ScheduleView | null>(null);
    const [isPending, startTransition] = useTransition();

    // Form
    const {
        register, handleSubmit, reset, control,
        formState: { errors }, clearErrors
    } = useForm<ClassSchedule>({
        defaultValues: {
            id: 0, courseId: 0, parallelId: 0, schoolYearId: 0, subjectId: 0,
            dayOfWeek: "", startTime: "", endTime: ""
        }
    });




    const parallels = useFilterParallels(
        1,
        10,
        "",
        selectedCourse,
        selectedSchoolYear,
        undefined,
        undefined,
        selectedSection?.id
    )
    // Lookups memorizados para mapear nombres sin recomputar
    const courseById = useMemo(() => new Map(courses.map(c => [c.id, c])), [courses]);
    const parallelById = useMemo(() => new Map(parallels.data.map(p => [p.id, p])), [parallels]);
    const subjectById = useMemo(() => new Map(subjects.map(s => [s.id, s])), [subjects]);



    // Carga de horarios -> se mapea usando los lookups memorizados
    const load = useCallback(() => {
        startTransition(() => {
            listUseCase.execute(new ListClassSchedulesCommand(1, PER_PAGE, [], ""))
                .then(res => {
                    if (res.isRight()) {
                        const data = res.extract()!.data;
                        const mapped: ScheduleView[] = data.map(s => ({
                            ...s,
                            courseName: courseById.get(s.courseId)?.name || "",
                            parallelName: parallelById.get(s.parallelId)?.name || "",
                            subjectName: subjectById.get(s.subjectId)?.name || ""
                        }));
                        setSchedules(mapped);
                    } else {
                        toast({ title: "Error", description: "No se pudo cargar", variant: "destructive" });
                    }
                })
                .catch(() => toast({ title: "Error", description: "No se pudo cargar", variant: "destructive" }));
        });
    }, [courseById, parallelById, subjectById, listUseCase]);


    //calcular horarios




    // Cargar cuando estén listos los catálogos base
    useEffect(() => {
        // Solo carga si tenemos data de catálogos (para mapear nombres bien)
        if (courses.length || parallels.data.length || subjects.length) {
            load();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [courses.length, parallels.data.length, subjects.length, load]);

    // -------------------- Handlers --------------------
    const openAdd = useCallback((day?: string) => {
        setEditing(null);
        reset({ id: 0, courseId: 0, parallelId: 0, schoolYearId: 0, subjectId: 0, dayOfWeek: day || "", startTime: "", endTime: "" });
        clearErrors();
        setOpen(true);
    }, [reset, clearErrors]);

    const openEdit = useCallback((s: ScheduleView) => {
        setEditing(s);
        reset(s);
        clearErrors();
        setOpen(true);
    }, [reset, clearErrors]);

    
    useEffect(()=>{
        console.log(selectedSection)
    },[selectedSection])


    const onSubmit = handleSubmit((data) => {



        startTransition(async () => {
            try {
                if (editing) {
                    const res = await updateUseCase.execute(new UpdateClassScheduleCommand(data));
                    if (res.isLeft()) {
                        toast({ title: "Error", description: "No se pudo actualizar", variant: "destructive" });
                        return;
                    }
                    toast({ title: "Horario actualizado", description: "Actualizado correctamente", variant: "success" });
                } else {
                    const res = await createUseCase.execute(new CreateClassScheduleCommand(data));
                    if (res.isLeft()) {
                        toast({ title: "Error", description: "No se pudo crear", variant: "destructive" });
                        return;
                    }
                    toast({ title: "Horario creado", description: "Creado correctamente", variant: "success" });
                }
                setOpen(false);
                load();
            } catch {
                toast({ title: "Error", description: "Ocurrió un problema", variant: "destructive" });
            }
        });
    });

    const handleDelete = useCallback(() => {
        if (!editing) return;
        startTransition(async () => {
            try {
                const res = await deleteUseCase.execute(new DeleteClassScheduleCommand(editing.id));
                if (res.isLeft()) {
                    toast({ title: "Error", description: "No se pudo eliminar", variant: "destructive" });
                    return;
                }
                toast({ title: "Horario eliminado", description: "Eliminado correctamente", variant: "success" });
                setOpen(false);
                load();
            } catch {
                toast({ title: "Error", description: "Ocurrió un problema", variant: "destructive" });
            }
        });
    }, [editing, deleteUseCase, load]);

    const handleBlockDelete = useCallback((s: ScheduleView) => {
        if (!confirm("¿Eliminar esta clase?")) return;
        startTransition(async () => {
            try {
                const res = await deleteUseCase.execute(new DeleteClassScheduleCommand(s.id));
                if (res.isLeft()) {
                    toast({ title: "Error", description: "No se pudo eliminar", variant: "destructive" });
                    return;
                }
                toast({ title: "Horario eliminado", description: "Eliminado correctamente", variant: "success" });
                load();
            } catch {
                toast({ title: "Error", description: "Ocurrió un problema", variant: "destructive" });
            }
        });
    }, [deleteUseCase, load]);

    // -------------------- Render --------------------
    return (
        <>
            <ClassScheduleCalendarPresenter
                schedules={schedules}
                onAdd={openAdd}
                onSelect={openEdit}
                onDelete={handleBlockDelete}
                course={courses}
                parallel={parallels.data}
                subject={courseSubject}
                year={schoolYears}
                section={sections}
                onSearchCourse={(value) => setPaginateCourse(prev => ({ ...prev, search: value }))}
                onSearchParallel={(value) => setPaginateParallels(prev => ({ ...prev, search: value }))}
                onSearchYear={(value) => setPaginateSchoolYears(prev => ({ ...prev, search: value }))}
                onSearchSubject={(value) => setPaginateSubjects(prev => ({ ...prev, search: value }))}
                selectedCourseId={selectedCourse}
                selectedParallelId={selectedParallel}
                selectedSectionId={selectedSection?.id || null}
                selectedSubjectId={selectedSubject}
                selectedYearId={selectedSchoolYear}
                setSelectedCourseId={setSelectedCourse}
                setSelectedParallelId={setSelectedParallel}
                setSelectedSectionId={
                    (id) => setSelectedSection(sections.find(s => s.id === id) || null)
                }
                setSelectedSubjectId={setSelectedSubject}
                setSelectedYearId={setSelectedSchoolYear}
                days={selectedSection?.days || []}

            />

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <form onSubmit={onSubmit} className="space-y-4">
                        <DialogHeader>
                            <DialogTitle>{editing ? "Editar Horario" : "Agregar Horario"}</DialogTitle>
                        </DialogHeader>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="courseId">Curso</Label>
                                <Controller
                                    name="courseId"
                                    control={control}
                                    rules={{ required: true, valueAsNumber: true }}
                                    render={({ field }) => (
                                        <Select onValueChange={(v) => field.onChange(Number(v))} value={field.value ? String(field.value) : undefined}>
                                            <SelectTrigger id="courseId">
                                                <SelectValue placeholder="Seleccionar curso" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {courses.map(c => (
                                                    <SelectItem key={c.id} value={String(c.id)}>{c.name}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                                {errors.courseId && <p className="text-red-500 text-sm">Requerido</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="parallelId">Paralelo</Label>
                                <Controller
                                    name="parallelId"
                                    control={control}
                                    rules={{ required: true, valueAsNumber: true }}
                                    render={({ field }) => (
                                        <Select onValueChange={(v) => field.onChange(Number(v))} value={field.value ? String(field.value) : undefined}>
                                            <SelectTrigger id="parallelId">
                                                <SelectValue placeholder="Seleccionar paralelo" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {parallels.data.map(p => (
                                                    <SelectItem key={p.id} value={String(p.id)}>{p.name}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                                {errors.parallelId && <p className="text-red-500 text-sm">Requerido</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="subjectId">Materia</Label>
                                <Controller
                                    name="subjectId"
                                    control={control}
                                    rules={{ required: true, valueAsNumber: true }}
                                    render={({ field }) => (
                                        <Select onValueChange={(v) => field.onChange(Number(v))} value={field.value ? String(field.value) : undefined}>
                                            <SelectTrigger id="subjectId">
                                                <SelectValue placeholder="Seleccionar materia" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {subjects.map(s => (
                                                    <SelectItem key={s.id} value={String(s.id)}>{s.name}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                                {errors.subjectId && <p className="text-red-500 text-sm">Requerido</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="schoolYearId">Periodo Lectivo</Label>
                                <Controller
                                    name="schoolYearId"
                                    control={control}
                                    rules={{ required: true, valueAsNumber: true }}
                                    render={({ field }) => (
                                        <Select onValueChange={(v) => field.onChange(Number(v))} value={field.value ? String(field.value) : undefined}>
                                            <SelectTrigger id="schoolYearId">
                                                <SelectValue placeholder="Seleccionar periodo" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {schoolYears.map(sy => (
                                                    <SelectItem key={sy.id} value={String(sy.id)}>{sy.name}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                                {errors.schoolYearId && <p className="text-red-500 text-sm">Requerido</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="dayOfWeek">Día</Label>
                                <Controller
                                    name="dayOfWeek"
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field }) => (
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger id="dayOfWeek">
                                                <SelectValue placeholder="Seleccionar día" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {selectedSection?.days.map(d => (
                                                    <SelectItem key={d} value={d}>{d}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                                {errors.dayOfWeek && <p className="text-red-500 text-sm">Requerido</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="startTime">Inicio</Label>
                                <Input id="startTime" type="time" {...register("startTime", { required: true })} />
                                {errors.startTime && <p className="text-red-500 text-sm">{errors.startTime.message || "Requerido"}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="endTime">Fin</Label>
                                <Input id="endTime" type="time" {...register("endTime", { required: true })} />
                                {errors.endTime && <p className="text-red-500 text-sm">{errors.endTime.message || "Requerido"}</p>}
                            </div>
                        </div>

                        <DialogFooter className="flex justify-between">
                            {editing && (
                                <Button type="button" variant="destructive" onClick={handleDelete} disabled={isPending}>
                                    Eliminar
                                </Button>
                            )}
                            <div className="ml-auto flex gap-2">
                                <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={isPending}>
                                    Cancelar
                                </Button>
                                <Button type="submit" disabled={isPending}>
                                    {isPending ? "Guardando..." : "Guardar"}
                                </Button>
                            </div>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
};
