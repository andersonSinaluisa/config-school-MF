import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { ChevronRight, Home, Save, ShieldCheck, Info, Check, AlertCircle, HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";

interface FormValues {
    data: {
        id: number;
        name: string;
        code: string;
        description: string;
        hoursPerWeek: number;
    };
}

interface SubjectEditPresenterProps {
    onSubmit: () => void;
    onCancel: () => void;
    register: UseFormRegister<FormValues>;
    errors: FieldErrors<FormValues>;
    isSubmitting: boolean;
    formData: FormValues;
}

export const SubjectEditPresenter = ({
    onSubmit,
    onCancel,
    register,
    errors,
    isSubmitting,
    formData,
}: SubjectEditPresenterProps) => {
    return (
        <form onSubmit={onSubmit} className="space-y-6">
            <nav className="flex items-center text-sm text-muted-foreground">
                <Link to="/" className="hover:text-foreground transition-colors">
                    <Home className="h-4 w-4" />
                    <span className="sr-only">Inicio</span>
                </Link>
                <ChevronRight className="h-4 w-4 mx-1" />
                <Link to="/materias" className="hover:text-foreground transition-colors">
                    Asignaturas
                </Link>
                <ChevronRight className="h-4 w-4 mx-1" />
                <span className="text-foreground font-medium">{formData.data.name}</span>
            </nav>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                        <ShieldCheck className="h-8 w-8 text-primary-500" />
                        {formData.data.name}
                    </h1>
                    <p className="text-muted-foreground mt-1">Actualiza los detalles de la Asignatura</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" onClick={() => onCancel()} disabled={isSubmitting}>
                        Cancelar
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? (
                            <>
                                <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-current border-t-transparent" />
                                Guardando...
                            </>
                        ) : (
                            <>
                                <Save className="mr-2 h-4 w-4" />
                                Guardar
                            </>
                        )}
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Actualizar Asignatura</CardTitle>
                        </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Nombre</Label>
                                    <Input id="name" {...register("data.name", { required: true })} />
                                    {errors.data?.name && (
                                        <p className="text-red-500 text-sm">{errors.data.name.message}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="code">Código</Label>
                                    <Input id="code" {...register("data.code", { required: true })} />
                                    {errors.data?.code && (
                                        <p className="text-red-500 text-sm">{errors.data.code.message}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="hoursPerWeek">Horas por Semana</Label>
                                    <Input
                                        id="hoursPerWeek"
                                        type="number"
                                        min="1"
                                        max="40"
                                        {...register("data.hoursPerWeek", { required: true, valueAsNumber: true })}
                                    />
                                    {errors.data?.hoursPerWeek && (
                                        <p className="text-red-500 text-sm">{errors.data.hoursPerWeek.message}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="description">Descripción</Label>
                                    <Textarea id="description" {...register("data.description", { required: true })} />
                                    {errors.data?.description && (
                                        <p className="text-red-500 text-sm">{errors.data.description.message}</p>
                                    )}
                                </div>
                            </CardContent>
                            <CardFooter className="flex justify-between">
                                <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
                                    Cancelar
                                </Button>
                                <Button type="submit" disabled={isSubmitting}>
                                    {isSubmitting ? "Guardando..." : "Guardar"}
                                </Button>
                            </CardFooter>
                    </Card>
                </div>

                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Vista Previa</CardTitle>
                            <CardDescription>Así se verá la Asignatura una vez actualizada</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <ShieldCheck className="h-5 w-5 text-primary-500" />
                                        <h3 className="font-medium">{formData.data.name || "Nombre de la asignatura"}</h3>
                                    </div>
                                    <Badge className="bg-accent-300 text-accent-800 hover:bg-accent-400 border-accent-500">Activo</Badge>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-xs text-muted-foreground">Descripción</p>
                                    <div className="flex flex-wrap gap-1">{formData.data.description}</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="flex items-center">
                                <Info className="h-4 w-4 mr-2 text-primary" />
                                Guía de Asignaturas
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-3 text-sm">
                                <li className="flex items-start">
                                    <Check className="h-4 w-4 mr-2 text-primary mt-0.5" />
                                    <span>Asegúrate de que el nombre de la asignatura sea claro y descriptivo para los usuarios</span>
                                </li>
                                <li className="flex items-start">
                                    <Check className="h-4 w-4 mr-2 text-primary mt-0.5" />
                                    <span>Utiliza descripciones concisas y completas para explicar la materia</span>
                                </li>
                                <li className="flex items-start">
                                    <Check className="h-4 w-4 mr-2 text-primary mt-0.5" />
                                    <span>Las horas por semana deben reflejar la carga real de la asignatura</span>
                                </li>
                                <li className="flex items-start">
                                    <AlertCircle className="h-4 w-4 mr-2 text-destructive mt-0.5" />
                                    <span>Evita códigos de asignatura duplicados para prevenir conflictos</span>
                                </li>
                            </ul>

                            <div className="mt-4 bg-blue-50 dark:bg-blue-900/20 p-3 rounded-md">
                                <div className="flex items-start">
                                    <HelpCircle className="h-4 w-4 text-blue-500 mr-2 mt-0.5" />
                                    <div className="text-xs">
                                        <p className="font-medium text-blue-700 dark:text-blue-300">¿Necesitas ayuda?</p>
                                        <p className="text-blue-600 dark:text-blue-400">
                                            Consulta la documentación de asignaturas para más información sobre mejores prácticas.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </form>
    );
};

