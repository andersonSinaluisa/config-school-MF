import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { UpdateAttendanceCodeCommand } from "@/scolar/application/useCases/attendanceCodes/updateAttendanceCodeUseCase";
import { Check, AlertCircle, HelpCircle, Info } from "lucide-react";

interface Props {
    onSubmit: () => void;
    onCancel: () => void;
    register: UseFormRegister<UpdateAttendanceCodeCommand>;
    errors: FieldErrors<UpdateAttendanceCodeCommand>;
    isSubmitting: boolean;
    formData: UpdateAttendanceCodeCommand;
}

export const AttendanceCodeEditPresenter = ({ onSubmit, onCancel, register, errors, isSubmitting, formData }: Props) => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
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
        </div>
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Vista Previa</CardTitle>
                    <CardDescription>Revisa la información antes de guardar.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                    <p className="font-medium">Código: {formData.data.code || "---"}</p>
                    <p className="text-sm text-muted-foreground">{formData.data.description || "Sin descripción"}</p>
                    <p className="text-sm">Afecta nota: {formData.data.affectsGrade ? "Sí" : "No"}</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="pb-3">
                    <CardTitle className="flex items-center"><Info className="h-4 w-4 mr-2 text-primary" />Guía de Mejores Prácticas</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-3 text-sm">
                        <li className="flex items-start"><Check className="h-4 w-4 mr-2 text-primary mt-0.5" />Usa códigos fáciles de recordar</li>
                        <li className="flex items-start"><Check className="h-4 w-4 mr-2 text-primary mt-0.5" />Describe claramente el propósito</li>
                        <li className="flex items-start"><AlertCircle className="h-4 w-4 mr-2 text-destructive mt-0.5" />Evita duplicar códigos</li>
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
