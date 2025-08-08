import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { UpdateClassScheduleCommand } from "@/scolar/application/useCases/classSchedules/updateClassScheduleUseCase";

interface Props {
    onSubmit: () => void;
    onCancel: () => void;
    register: UseFormRegister<UpdateClassScheduleCommand>;
    errors: FieldErrors<UpdateClassScheduleCommand>;
    isSubmitting: boolean;
}

export const ClassScheduleEditPresenter = ({ onSubmit, onCancel, register, errors, isSubmitting }: Props) => {
    return (
        <Card>
            <form onSubmit={onSubmit}>
                <CardHeader>
                    <CardTitle>Editar Horario</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="courseId">Curso ID</Label>
                            <Input id="courseId" type="number" {...register("data.courseId", { valueAsNumber: true, required: true })} />
                            {errors.data?.courseId && <p className="text-red-500 text-sm">Requerido</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="parallelId">Paralelo ID</Label>
                            <Input id="parallelId" type="number" {...register("data.parallelId", { valueAsNumber: true, required: true })} />
                            {errors.data?.parallelId && <p className="text-red-500 text-sm">Requerido</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="schoolYearId">Periodo Lectivo ID</Label>
                            <Input id="schoolYearId" type="number" {...register("data.schoolYearId", { valueAsNumber: true, required: true })} />
                            {errors.data?.schoolYearId && <p className="text-red-500 text-sm">Requerido</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="subjectId">Materia ID</Label>
                            <Input id="subjectId" type="number" {...register("data.subjectId", { valueAsNumber: true, required: true })} />
                            {errors.data?.subjectId && <p className="text-red-500 text-sm">Requerido</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="dayOfWeek">Día de la semana</Label>
                            <Input id="dayOfWeek" {...register("data.dayOfWeek", { required: true })} />
                            {errors.data?.dayOfWeek && <p className="text-red-500 text-sm">Requerido</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="startTime">Hora inicio</Label>
                            <Input id="startTime" {...register("data.startTime", { required: true })} />
                            {errors.data?.startTime && <p className="text-red-500 text-sm">Requerido</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="endTime">Hora fin</Label>
                            <Input id="endTime" {...register("data.endTime", { required: true })} />
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
