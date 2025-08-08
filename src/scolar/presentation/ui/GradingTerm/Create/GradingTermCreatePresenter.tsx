import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FieldErrors, UseFormRegister } from "react-hook-form";

interface FormValues {
    data: {
        gradingSystem_id: number;
        academicYear_id: number;
        name: string;
        order: number;
        weight: string;
    }
}

interface Props {
    onSubmit: () => void;
    onCancel: () => void;
    register: UseFormRegister<FormValues>;
    errors: FieldErrors<FormValues>;
    isSubmitting: boolean;
    formData: FormValues['data'];
}

export const GradingTermCreatePresenter = ({ onSubmit, onCancel, register, errors, isSubmitting }: Props) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Nuevo Período de Calificación</CardTitle>
            </CardHeader>
            <form onSubmit={onSubmit}>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="gradingSystem_id">ID Sistema</Label>
                        <Input id="gradingSystem_id" type="number" {...register('data.gradingSystem_id', { required: true, valueAsNumber: true })} />
                        {errors.data?.gradingSystem_id && <span className="text-red-500 text-sm">{errors.data.gradingSystem_id.message}</span>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="academicYear_id">ID Año Académico</Label>
                        <Input id="academicYear_id" type="number" {...register('data.academicYear_id', { required: true, valueAsNumber: true })} />
                        {errors.data?.academicYear_id && <span className="text-red-500 text-sm">{errors.data.academicYear_id.message}</span>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="name">Nombre</Label>
                        <Input id="name" {...register('data.name', { required: true })} />
                        {errors.data?.name && <span className="text-red-500 text-sm">{errors.data.name.message}</span>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="order">Orden</Label>
                        <Input id="order" type="number" {...register('data.order', { required: true, valueAsNumber: true })} />
                        {errors.data?.order && <span className="text-red-500 text-sm">{errors.data.order.message}</span>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="weight">Peso</Label>
                        <Input id="weight" {...register('data.weight', { required: true })} />
                        {errors.data?.weight && <span className="text-red-500 text-sm">{errors.data.weight.message}</span>}
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

