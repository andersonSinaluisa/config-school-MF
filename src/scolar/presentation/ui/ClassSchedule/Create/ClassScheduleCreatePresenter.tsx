import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Control, Controller, FieldErrors, UseFormRegister } from "react-hook-form";
import { CreateClassScheduleCommand } from "@/scolar/application/useCases/classSchedules/createClassScheduleUseCase";
import { Course } from "@/scolar/domain/entities/course";
import { Parallel } from "@/scolar/domain/entities/parallel";
import { Subject } from "@/scolar/domain/entities/subject";
import { SchoolYear } from "@/scolar/domain/entities/school_year";

interface Props {
    onSubmit: () => void;
    onCancel: () => void;
    register: UseFormRegister<CreateClassScheduleCommand>;
    control: Control<CreateClassScheduleCommand>;
    errors: FieldErrors<CreateClassScheduleCommand>;
    isSubmitting: boolean;
    courses: Course[];
    parallels: Parallel[];
    subjects: Subject[];
    schoolYears: SchoolYear[];
}

const days = [
    { value: "lunes", label: "Lunes" },
    { value: "martes", label: "Martes" },
    { value: "miercoles", label: "Miércoles" },
    { value: "jueves", label: "Jueves" },
    { value: "viernes", label: "Viernes" },
    { value: "sabado", label: "Sábado" },
];

export const ClassScheduleCreatePresenter = ({
    onSubmit,
    onCancel,
    register,
    control,
    errors,
    isSubmitting,
    courses,
    parallels,
    subjects,
    schoolYears
}: Props) => {
    return (
        <Card>
            <form onSubmit={onSubmit}>
                <CardHeader>
                    <CardTitle>Crear Horario</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="courseId">Curso</Label>
                            <Controller
                                name="data.courseId"
                                control={control}
                                rules={{ required: true, valueAsNumber: true }}
                                render={({ field }) => (
                                    <Select onValueChange={(v) => field.onChange(Number(v))} value={field.value ? String(field.value) : undefined}>
                                        <SelectTrigger>
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
                            {errors.data?.courseId && <p className="text-red-500 text-sm">Requerido</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="parallelId">Paralelo</Label>
                            <Controller
                                name="data.parallelId"
                                control={control}
                                rules={{ required: true, valueAsNumber: true }}
                                render={({ field }) => (
                                    <Select onValueChange={(v) => field.onChange(Number(v))} value={field.value ? String(field.value) : undefined}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Seleccionar paralelo" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {parallels.map(p => (
                                                <SelectItem key={p.id} value={String(p.id)}>{p.name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                            {errors.data?.parallelId && <p className="text-red-500 text-sm">Requerido</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="schoolYearId">Periodo Lectivo</Label>
                            <Controller
                                name="data.schoolYearId"
                                control={control}
                                rules={{ required: true, valueAsNumber: true }}
                                render={({ field }) => (
                                    <Select onValueChange={(v) => field.onChange(Number(v))} value={field.value ? String(field.value) : undefined}>
                                        <SelectTrigger>
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
                            {errors.data?.schoolYearId && <p className="text-red-500 text-sm">Requerido</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="subjectId">Materia</Label>
                            <Controller
                                name="data.subjectId"
                                control={control}
                                rules={{ required: true, valueAsNumber: true }}
                                render={({ field }) => (
                                    <Select onValueChange={(v) => field.onChange(Number(v))} value={field.value ? String(field.value) : undefined}>
                                        <SelectTrigger>
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
                            {errors.data?.subjectId && <p className="text-red-500 text-sm">Requerido</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="dayOfWeek">Día de la semana</Label>
                            <Controller
                                name="data.dayOfWeek"
                                control={control}
                                rules={{ required: true }}
                                render={({ field }) => (
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Seleccionar día" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {days.map(d => (
                                                <SelectItem key={d.value} value={d.value}>{d.label}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                            {errors.data?.dayOfWeek && <p className="text-red-500 text-sm">Requerido</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="startTime">Hora inicio</Label>
                            <Input id="startTime" type="time" {...register("data.startTime", { required: true })} />
                            {errors.data?.startTime && <p className="text-red-500 text-sm">Requerido</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="endTime">Hora fin</Label>
                            <Input id="endTime" type="time" {...register("data.endTime", { required: true })} />
                            {errors.data?.endTime && <p className="text-red-500 text-sm">Requerido</p>}
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>Cancelar</Button>
                    <Button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Guardando...' : 'Guardar'}</Button>
                </CardFooter>
            </form>
        </Card>
    );
};

