import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { CreateBehaviorScaleCommand } from "@/scolar/application/useCases/behaviorScales/createBehaviorScaleUseCase";

interface Props {
    onSubmit: () => void;
    onCancel: () => void;
    register: UseFormRegister<CreateBehaviorScaleCommand>;
    errors: FieldErrors<CreateBehaviorScaleCommand>;
    isSubmitting: boolean;
}

export const BehaviorScaleCreatePresenter = ({ onSubmit, onCancel, register, errors, isSubmitting }: Props) => (
    <Card>
        <form onSubmit={onSubmit}>
            <CardHeader>
                <CardTitle>Crear Escala de Comportamiento</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="name">Nombre</Label>
                    <Input id="name" {...register("data.name", { required: true })} />
                    {errors.data?.name && <p className="text-red-500 text-sm">Requerido</p>}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="minScore">Puntaje mínimo</Label>
                    <Input id="minScore" {...register("data.minScore", { required: true })} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="maxScore">Puntaje máximo</Label>
                    <Input id="maxScore" {...register("data.maxScore", { required: true })} />
                </div>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>Cancelar</Button>
                <Button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Guardando...' : 'Guardar'}</Button>
            </CardFooter>
        </form>
    </Card>
);
