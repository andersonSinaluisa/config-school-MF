import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Control, Controller, FieldErrors, UseFormRegister } from "react-hook-form";
import { CreateClassScheduleCommand } from "@/scolar/application/useCases/classSchedules/createClassScheduleUseCase";
import { Course } from "@/scolar/domain/entities/course";
import { Parallel } from "@/scolar/domain/entities/parallel";
import { Subject } from "@/scolar/domain/entities/subject";
import { SchoolYear } from "@/scolar/domain/entities/school_year";
import { Check, AlertCircle, HelpCircle, Info } from "lucide-react";


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
    formData: CreateClassScheduleCommand;

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
    schoolYears,
    formData
}: Props) => {
    const courseName = courses.find(c => c.id === formData.data.courseId)?.name || "Curso no seleccionado";
    const parallelName = parallels.find(p => p.id === formData.data.parallelId)?.name || "Paralelo no seleccionado";
    const subjectName = subjects.find(s => s.id === formData.data.subjectId)?.name || "Materia no seleccionada";
    const schoolYearName = schoolYears.find(sy => sy.id === formData.data.schoolYearId)?.name || "Periodo no seleccionado";
    const dayLabel = days.find(d => d.value === formData.data.dayOfWeek)?.label || "Día no seleccionado";
    const timeRange = formData.data.startTime && formData.data.endTime ? `${formData.data.startTime} - ${formData.data.endTime}` : "Sin horario";

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
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
            </div>
            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Vista Previa</CardTitle>
                        <CardDescription>Revisa la información antes de guardar.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-1 text-sm">
                        <p className="font-medium">{courseName} - {parallelName}</p>
                        <p>{subjectName}</p>
                        <p>{schoolYearName}</p>
                        <p>{dayLabel}: {timeRange}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="flex items-center"><Info className="h-4 w-4 mr-2 text-primary" />Guía de Mejores Prácticas</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-start"><Check className="h-4 w-4 mr-2 text-primary mt-0.5" />Verifica que el paralelo corresponda al curso seleccionado</li>
                            <li className="flex items-start"><Check className="h-4 w-4 mr-2 text-primary mt-0.5" />Asegura que el horario no se solape</li>
                            <li className="flex items-start"><AlertCircle className="h-4 w-4 mr-2 text-destructive mt-0.5" />Evita dejar campos sin completar</li>
                        </ul>
                        <div className="mt-4 bg-blue-50 dark:bg-blue-900/20 p-3 rounded-md flex items-start text-xs">
                            <HelpCircle className="h-4 w-4 text-blue-500 mr-2 mt-0.5" />
                            <span>Consulta la documentación para más recomendaciones.</span>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>

    );
};

