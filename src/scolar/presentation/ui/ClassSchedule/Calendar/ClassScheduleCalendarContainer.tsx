import { useEffect, useState, useTransition } from "react";
import { useInjection } from "inversify-react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ClassSchedule } from "@/scolar/domain/entities/classSchedule";
import { Course } from "@/scolar/domain/entities/course";
import { Parallel } from "@/scolar/domain/entities/parallel";
import { Subject } from "@/scolar/domain/entities/subject";
import { SchoolYear } from "@/scolar/domain/entities/school_year";
import { ListClassSchedulesUseCase, ListClassSchedulesCommand } from "@/scolar/application/useCases/classSchedules/listClassSchedulesUseCase";
import { CreateClassScheduleUseCase, CreateClassScheduleCommand } from "@/scolar/application/useCases/classSchedules/createClassScheduleUseCase";
import { UpdateClassScheduleUseCase, UpdateClassScheduleCommand } from "@/scolar/application/useCases/classSchedules/updateClassScheduleUseCase";
import { DeleteClassScheduleUseCase, DeleteClassScheduleCommand } from "@/scolar/application/useCases/classSchedules/deleteClassScheduleUseCase";
import { ListCoursesUseCase, ListCoursesCommand } from "@/scolar/application/useCases/courses/listCoursesUseCase";
import { ListParallelUseCase, ListParallelUseCaseCommand } from "@/scolar/application/useCases/parallels/listParallelUseCase";
import { ListSubjectUseCase, ListSubjectCommand } from "@/scolar/application/useCases/subjects/listSubjectsUseCase";
import { ListSchoolYearUseCase, ListSchoolYearUseCaseCommand } from "@/scolar/application/useCases/schoolYears/listSchoolYearUseCase";
import { PaginatedResult } from "@/scolar/infrastructure/dto/paginateDto";
import { CLASS_SCHEDULE_LIST_USE_CASE, CLASS_SCHEDULE_CREATE_USE_CASE, CLASS_SCHEDULE_UPDATE_USE_CASE, CLASS_SCHEDULE_DELETE_USE_CASE } from "@/scolar/domain/symbols/ClassScheduleSymbol";
import { COURSE_LIST_USECASE } from "@/scolar/domain/symbols/CourseSymbol";
import { PARALLEL_LIST_USECASE } from "@/scolar/domain/symbols/ParallelSymbol";
import { SUBJECT_LIST_USE_CASE } from "@/scolar/domain/symbols/SubjectSymbol";
import { SCHOOL_YEAR_LIST_USE_CASE } from "@/scolar/domain/symbols/SchoolYearSymbol";
import { ClassScheduleCalendarPresenter } from "./ClassScheduleCalendarPresenter";

export const ClassScheduleCalendarContainer = () => {
    interface ScheduleView extends ClassSchedule {
        courseName: string;
        parallelName: string;
        subjectName: string;
    }

    const listUseCase = useInjection<ListClassSchedulesUseCase>(CLASS_SCHEDULE_LIST_USE_CASE);
    const createUseCase = useInjection<CreateClassScheduleUseCase>(CLASS_SCHEDULE_CREATE_USE_CASE);
    const updateUseCase = useInjection<UpdateClassScheduleUseCase>(CLASS_SCHEDULE_UPDATE_USE_CASE);
    const deleteUseCase = useInjection<DeleteClassScheduleUseCase>(CLASS_SCHEDULE_DELETE_USE_CASE);
    const listCourses = useInjection<ListCoursesUseCase>(COURSE_LIST_USECASE);
    const listParallels = useInjection<ListParallelUseCase>(PARALLEL_LIST_USECASE);
    const listSubjects = useInjection<ListSubjectUseCase>(SUBJECT_LIST_USE_CASE);
    const listSchoolYears = useInjection<ListSchoolYearUseCase>(SCHOOL_YEAR_LIST_USE_CASE);

    const [schedules, setSchedules] = useState<ScheduleView[]>([]);
    const [courses, setCourses] = useState<Course[]>([]);
    const [parallels, setParallels] = useState<Parallel[]>([]);
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [schoolYears, setSchoolYears] = useState<SchoolYear[]>([]);
    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState<ScheduleView | null>(null);
    const [isPending, startTransition] = useTransition();

    const { register, handleSubmit, reset, control, watch, formState: { errors }, setError, clearErrors } = useForm<ClassSchedule>({
        defaultValues: { id: 0, courseId: 0, parallelId: 0, schoolYearId: 0, subjectId: 0, dayOfWeek: "", startTime: "", endTime: "" }
    });

    const selectedCourse = watch("courseId");
    const filteredParallels = parallels.filter(p => p.courseId === Number(selectedCourse));

    const load = () => {
        startTransition(() => {
            listUseCase.execute(new ListClassSchedulesCommand(1, 100, [], "")).then(res => {
                if (res.isRight()) {
                    const data = res.extract()!.data;
                    const mapped: ScheduleView[] = data.map(s => ({
                        ...s,
                        courseName: courses.find(c => c.id === s.courseId)?.name || "",
                        parallelName: parallels.find(p => p.id === s.parallelId)?.name || "",
                        subjectName: subjects.find(sb => sb.id === s.subjectId)?.name || ""
                    }));
                    setSchedules(mapped);
                } else {
                    toast({ title: "Error", description: "No se pudo cargar", variant: "destructive" });
                }
            });
        });
    };

    useEffect(() => {
        startTransition(() => {
            Promise.all([
                listCourses.execute(new ListCoursesCommand(1, 100, ["id"])),
                listParallels.execute(new ListParallelUseCaseCommand(1, 100, ["id"])),
                listSubjects.execute(new ListSubjectCommand(1, 100, ["id"])),
                listSchoolYears.execute(new ListSchoolYearUseCaseCommand(1, 100, ["id"]))
            ]).then(([c, p, s, sy]) => {
                if (c.isRight()) setCourses((c.extract() as PaginatedResult<Course>).data);
                if (p.isRight()) setParallels((p.extract() as PaginatedResult<Parallel>).data);
                if (s.isRight()) setSubjects((s.extract() as PaginatedResult<Subject>).data);
                if (sy.isRight()) setSchoolYears((sy.extract() as PaginatedResult<SchoolYear>).data);
                load();
            });
        });
    }, []);

    const handleAdd = (day?: string) => {
        setEditing(null);
        reset({ id: 0, courseId: 0, parallelId: 0, schoolYearId: 0, subjectId: 0, dayOfWeek: day || "", startTime: "", endTime: "" });
        clearErrors();
        setOpen(true);
    };

    const handleSelect = (s: ScheduleView) => {
        setEditing(s);
        reset(s);
        clearErrors();
        setOpen(true);
    };

    const onSubmit = handleSubmit((data) => {
        if (data.endTime <= data.startTime) {
            setError("endTime", { type: "manual", message: "La hora de fin debe ser posterior" });
            return;
        }
        const overlapping = schedules.some(s =>
            s.id !== data.id &&
            s.courseId === data.courseId &&
            s.dayOfWeek === data.dayOfWeek &&
            !(data.endTime <= s.startTime || data.startTime >= s.endTime)
        );
        if (overlapping) {
            setError("startTime", { type: "manual", message: "Se solapa con otro horario" });
            setError("endTime", { type: "manual", message: "Se solapa con otro horario" });
            return;
        }
        clearErrors(["startTime", "endTime"]);
        startTransition(async () => {
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
        });
    });

    const handleDelete = () => {
        if (!editing) return;
        startTransition(async () => {
            const res = await deleteUseCase.execute(new DeleteClassScheduleCommand(editing.id));
            if (res.isLeft()) {
                toast({ title: "Error", description: "No se pudo eliminar", variant: "destructive" });
                return;
            }
            toast({ title: "Horario eliminado", description: "Eliminado correctamente", variant: "success" });
            setOpen(false);
            load();
        });
    };

    const handleBlockDelete = (s: ScheduleView) => {
        if (!confirm("¿Eliminar esta clase?")) return;
        startTransition(async () => {
            const res = await deleteUseCase.execute(new DeleteClassScheduleCommand(s.id));
            if (res.isLeft()) {
                toast({ title: "Error", description: "No se pudo eliminar", variant: "destructive" });
                return;
            }
            toast({ title: "Horario eliminado", description: "Eliminado correctamente", variant: "success" });
            load();
        });
    };

    return (
        <>
            <ClassScheduleCalendarPresenter schedules={schedules} onAdd={handleAdd} onSelect={handleSelect} onDelete={handleBlockDelete} />
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
                                                {filteredParallels.map(p => (
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
                                                {["Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"].map(d => (
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
                                {errors.startTime && <p className="text-red-500 text-sm">{errors.startTime.message || 'Requerido'}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="endTime">Fin</Label>
                                <Input id="endTime" type="time" {...register("endTime", { required: true })} />
                                {errors.endTime && <p className="text-red-500 text-sm">{errors.endTime.message || 'Requerido'}</p>}
                            </div>
                        </div>
                        <DialogFooter className="flex justify-between">
                            {editing && <Button type="button" variant="destructive" onClick={handleDelete} disabled={isPending}>Eliminar</Button>}
                            <div className="ml-auto flex gap-2">
                                <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={isPending}>Cancelar</Button>
                                <Button type="submit" disabled={isPending}>{isPending ? "Guardando..." : "Guardar"}</Button>
                            </div>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
};

