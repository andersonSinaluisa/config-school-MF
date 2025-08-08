import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { UpdateAttendanceCodeCommand } from "@/scolar/application/useCases/attendanceCodes/updateAttendanceCodeUseCase";

interface Props {
    onSubmit: () => void;
    onCancel: () => void;
    register: UseFormRegister<UpdateAttendanceCodeCommand>;
    errors: FieldErrors<UpdateAttendanceCodeCommand>;
    isSubmitting: boolean;
}

export const AttendanceCodeEditPresenter = ({ onSubmit, onCancel, register, errors, isSubmitting }: Props) => (
    <Card>
        <form onSubmit={onSubmit}>
            <CardHeader>
                <CardTitle>Editar Código de Asistencia</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="code">Código</Label>
                    <Input id="code" {...register("data.code", { required: true })} />
                    {errors.data?.code && <p className="text-red-500 text-sm">Requerido</p>}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="description">Descripción</Label>
                    <Textarea id="description" {...register("data.description")}></Textarea>
                </div>
                <div className="flex items-center space-x-2">
                    <Checkbox id="affectsGrade" {...register("data.affectsGrade")} />
                    <Label htmlFor="affectsGrade">Afecta la calificación</Label>
                </div>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>Cancelar</Button>
                <Button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Guardando...' : 'Guardar'}</Button>
            </CardFooter>
        </form>
    </Card>
);
