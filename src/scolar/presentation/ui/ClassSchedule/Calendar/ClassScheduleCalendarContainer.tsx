import { useEffect, useState, useTransition } from "react";
import { useInjection } from "inversify-react";
import { useForm } from "react-hook-form";
import { toast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ClassSchedule } from "@/scolar/domain/entities/classSchedule";
import { ListClassSchedulesUseCase, ListClassSchedulesCommand } from "@/scolar/application/useCases/classSchedules/listClassSchedulesUseCase";
import { CreateClassScheduleUseCase, CreateClassScheduleCommand } from "@/scolar/application/useCases/classSchedules/createClassScheduleUseCase";
import { UpdateClassScheduleUseCase, UpdateClassScheduleCommand } from "@/scolar/application/useCases/classSchedules/updateClassScheduleUseCase";
import { DeleteClassScheduleUseCase, DeleteClassScheduleCommand } from "@/scolar/application/useCases/classSchedules/deleteClassScheduleUseCase";
import { CLASS_SCHEDULE_LIST_USE_CASE, CLASS_SCHEDULE_CREATE_USE_CASE, CLASS_SCHEDULE_UPDATE_USE_CASE, CLASS_SCHEDULE_DELETE_USE_CASE } from "@/scolar/domain/symbols/ClassScheduleSymbol";
import { ClassScheduleCalendarPresenter } from "./ClassScheduleCalendarPresenter";

export const ClassScheduleCalendarContainer = () => {
    const listUseCase = useInjection<ListClassSchedulesUseCase>(CLASS_SCHEDULE_LIST_USE_CASE);
    const createUseCase = useInjection<CreateClassScheduleUseCase>(CLASS_SCHEDULE_CREATE_USE_CASE);
    const updateUseCase = useInjection<UpdateClassScheduleUseCase>(CLASS_SCHEDULE_UPDATE_USE_CASE);
    const deleteUseCase = useInjection<DeleteClassScheduleUseCase>(CLASS_SCHEDULE_DELETE_USE_CASE);

    const [schedules, setSchedules] = useState<ClassSchedule[]>([]);
    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState<ClassSchedule | null>(null);
    const [isPending, startTransition] = useTransition();

    const { register, handleSubmit, reset } = useForm<ClassSchedule>({
        defaultValues: { id: 0, courseId: 0, parallelId: 0, schoolYearId: 0, subjectId: 0, dayOfWeek: "", startTime: "", endTime: "" }
    });

    const load = () => {
        startTransition(() => {
            listUseCase.execute(new ListClassSchedulesCommand(1, 100, [], "")).then(res => {
                if (res.isRight()) {
                    setSchedules(res.extract()!.data);
                } else {
                    toast({ title: "Error", description: "No se pudo cargar", variant: "destructive" });
                }
            });
        });
    };

    useEffect(() => {
        load();
    }, []);

    const handleAdd = (day?: string) => {
        setEditing(null);
        reset({ id: 0, courseId: 0, parallelId: 0, schoolYearId: 0, subjectId: 0, dayOfWeek: day || "", startTime: "", endTime: "" });
        setOpen(true);
    };

    const handleSelect = (s: ClassSchedule) => {
        setEditing(s);
        reset(s);
        setOpen(true);
    };

    const onSubmit = handleSubmit((data) => {
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

    return (
        <>
            <ClassScheduleCalendarPresenter schedules={schedules} onAdd={handleAdd} onSelect={handleSelect} />
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <form onSubmit={onSubmit} className="space-y-4">
                        <DialogHeader>
                            <DialogTitle>{editing ? "Editar Horario" : "Agregar Horario"}</DialogTitle>
                        </DialogHeader>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="courseId">Curso ID</Label>
                                <Input id="courseId" type="number" {...register("courseId", { valueAsNumber: true, required: true })} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="parallelId">Paralelo ID</Label>
                                <Input id="parallelId" type="number" {...register("parallelId", { valueAsNumber: true, required: true })} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="schoolYearId">Periodo Lectivo ID</Label>
                                <Input id="schoolYearId" type="number" {...register("schoolYearId", { valueAsNumber: true, required: true })} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="subjectId">Materia ID</Label>
                                <Input id="subjectId" type="number" {...register("subjectId", { valueAsNumber: true, required: true })} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="dayOfWeek">Día</Label>
                                <Input id="dayOfWeek" {...register("dayOfWeek", { required: true })} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="startTime">Inicio</Label>
                                <Input id="startTime" {...register("startTime", { required: true })} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="endTime">Fin</Label>
                                <Input id="endTime" {...register("endTime", { required: true })} />
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

