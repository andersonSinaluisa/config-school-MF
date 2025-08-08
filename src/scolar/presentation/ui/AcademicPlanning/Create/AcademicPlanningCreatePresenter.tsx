import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Control, Controller, FieldErrors, UseFormRegister } from "react-hook-form";
import { CreateAcademicPlanningCommand } from "@/scolar/application/useCases/academicPlannings/createAcademicPlanningUseCase";
import { Course } from "@/scolar/domain/entities/course";
import { Parallel } from "@/scolar/domain/entities/parallel";
import { Subject } from "@/scolar/domain/entities/subject";
import { SchoolYear } from "@/scolar/domain/entities/school_year";

interface Props {
    onSubmit: () => void;
    onCancel: () => void;
    register: UseFormRegister<CreateAcademicPlanningCommand>;
    control: Control<CreateAcademicPlanningCommand>;
    errors: FieldErrors<CreateAcademicPlanningCommand>;
    isSubmitting: boolean;
    courses: Course[];
    parallels: Parallel[];
    subjects: Subject[];
    schoolYears: SchoolYear[];
}

export const AcademicPlanningCreatePresenter = ({
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
                    <CardTitle>Crear Planificación Académica</CardTitle>
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
                        <div className="space-y-2 col-span-2">
                            <Label htmlFor="topic">Tema</Label>
                            <Input id="topic" {...register("data.topic", { required: true })} />
                            {errors.data?.topic && <p className="text-red-500 text-sm">Requerido</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="startDate">Fecha inicio</Label>
                            <Input id="startDate" type="date" {...register("data.startDate", { required: true })} />
                            {errors.data?.startDate && <p className="text-red-500 text-sm">Requerido</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="endDate">Fecha fin</Label>
                            <Input id="endDate" type="date" {...register("data.endDate", { required: true })} />
                            {errors.data?.endDate && <p className="text-red-500 text-sm">Requerido</p>}
                        </div>
                        <div className="space-y-2 col-span-2">
                            <Label htmlFor="description">Descripción</Label>
                            <Textarea id="description" {...register("data.description")} />
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

