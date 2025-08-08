import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { UpdateAcademicPlanningCommand } from "@/scolar/application/useCases/academicPlannings/updateAcademicPlanningUseCase";

interface Props {
    onSubmit: () => void;
    onCancel: () => void;
    register: UseFormRegister<UpdateAcademicPlanningCommand>;
    errors: FieldErrors<UpdateAcademicPlanningCommand>;
    isSubmitting: boolean;
}

export const AcademicPlanningEditPresenter = ({ onSubmit, onCancel, register, errors, isSubmitting }: Props) => {
    return (
        <Card>
            <form onSubmit={onSubmit}>
                <CardHeader>
                    <CardTitle>Editar Planificación Académica</CardTitle>
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
