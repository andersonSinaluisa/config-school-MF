import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FieldErrors, UseFormRegister } from "react-hook-form";

interface FormValues {
    data: {
        name: string;
        description: string;
        numberOfTerms: number;
        passingScore: string;
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

export const GradingSystemEditPresenter = ({ onSubmit, onCancel, register, errors, isSubmitting }: Props) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Editar Sistema de Calificación</CardTitle>
            </CardHeader>
            <form onSubmit={onSubmit}>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Nombre</Label>
                        <Input id="name" {...register('data.name', { required: true })} />
                        {errors.data?.name && <span className="text-red-500 text-sm">{errors.data.name.message}</span>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="description">Descripción</Label>
                        <Textarea id="description" {...register('data.description', { required: true })} />
                        {errors.data?.description && <span className="text-red-500 text-sm">{errors.data.description.message}</span>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="numberOfTerms">Número de periodos</Label>
                        <Input id="numberOfTerms" type="number" {...register('data.numberOfTerms', { required: true, valueAsNumber: true })} />
                        {errors.data?.numberOfTerms && <span className="text-red-500 text-sm">{errors.data.numberOfTerms.message}</span>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="passingScore">Puntaje aprobatorio</Label>
                        <Input id="passingScore" {...register('data.passingScore', { required: true })} />
                        {errors.data?.passingScore && <span className="text-red-500 text-sm">{errors.data.passingScore.message}</span>}
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

