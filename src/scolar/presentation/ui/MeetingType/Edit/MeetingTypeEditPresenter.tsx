import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { UpdateMeetingTypeCommand } from "@/scolar/application/useCases/meetingTypes/updateMeetingTypeUseCase";

interface Props {
    onSubmit: () => void;
    onCancel: () => void;
    register: UseFormRegister<UpdateMeetingTypeCommand>;
    errors: FieldErrors<UpdateMeetingTypeCommand>;
    isSubmitting: boolean;
}

export const MeetingTypeEditPresenter = ({ onSubmit, onCancel, register, errors, isSubmitting }: Props) => {
    return (
        <Card>
            <form onSubmit={onSubmit}>
                <CardHeader>
                    <CardTitle>Editar Tipo de Reunión</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Nombre</Label>
                        <Input id="name" {...register("data.name", { required: true })} />
                        {errors.data?.name && <p className="text-red-500 text-sm">Requerido</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="description">Descripción</Label>
                        <Textarea id="description" {...register("data.description")}></Textarea>
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
