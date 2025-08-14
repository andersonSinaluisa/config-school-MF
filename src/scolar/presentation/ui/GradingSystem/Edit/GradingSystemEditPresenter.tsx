import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { AlertCircle, Check, ChevronRight, HelpCircle, Home, Info, Save, ShieldCheck, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

interface FormValues {
    data: {
        name: string;
        description: string;
        numberOfTerms: number;
        passingScore: string;
    };
}

interface Props {
    onSubmit: () => void;
    onCancel: () => void;
    register: UseFormRegister<FormValues>;
    errors: FieldErrors<FormValues>;
    isSubmitting: boolean;
    formData: FormValues['data'];
}

export const GradingSystemEditPresenter = ({
    onSubmit,
    onCancel,
    register,
    errors,
    isSubmitting,
    formData,
}: Props) => {

    return (
        <form onSubmit={onSubmit}>
            <nav className="flex items-center text-sm text-muted-foreground mb-4">
                <Link to="/" className="hover:text-foreground transition-colors">
                    <Home className="h-4 w-4" />
                    <span className="sr-only">Inicio</span>
                </Link>
                <ChevronRight className="h-4 w-4 mx-1" />
                <Link to="/sistemas-calificacion" className="hover:text-foreground transition-colors">
                    Sistema de Calificación
                </Link>
                <ChevronRight className="h-4 w-4 mx-1" />
                <span className="text-foreground font-medium">
                    Sistema de Calificación
                </span>
            </nav>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                        <ShieldCheck className="h-8 w-8 text-primary-500" />
                        Editar Sistema de Calificación {formData.name}
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        Actualiza los detalles del sistema de calificación para reflejar los cambios necesarios.

                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" onClick={() => onCancel()} disabled={isSubmitting}>
                        Cancelar
                    </Button>
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                    >
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
                {/* Formulario principal */}
                <div className="lg:col-span-2 space-y-6">
                    <Card className="border shadow-sm">
                        <CardHeader>
                            <CardTitle>Editar Sistema de Calificación</CardTitle>
                        </CardHeader>

                        <CardContent className="space-y-5">
                            {/* Nombre */}
                            <div className="space-y-1">
                                <Label htmlFor="name">Nombre</Label>
                                <Input
                                    id="name"
                                    {...register("data.name", { required: "Este campo es obligatorio" })}
                                    placeholder="Ej. Sistema Bimestral"
                                />
                                {errors.data?.name && (
                                    <p className="text-red-500 text-sm">{errors.data.name.message}</p>
                                )}
                            </div>

                            {/* Descripción */}
                            <div className="space-y-1">
                                <Label htmlFor="description">Descripción</Label>
                                <Textarea
                                    id="description"
                                    {...register("data.description", { required: "Este campo es obligatorio" })}
                                    placeholder="Describe brevemente el objetivo del sistema"
                                />
                                {errors.data?.description && (
                                    <p className="text-red-500 text-sm">{errors.data.description.message}</p>
                                )}
                            </div>

                            {/* Número de periodos */}
                            <div className="space-y-1">
                                <Label htmlFor="numberOfTerms">Número de períodos</Label>
                                <Input
                                    id="numberOfTerms"
                                    type="number"
                                    min={1}
                                    {...register("data.numberOfTerms", {
                                        required: "Este campo es obligatorio",
                                        valueAsNumber: true,
                                    })}
                                    placeholder="Ej. 4"
                                />
                                {errors.data?.numberOfTerms && (
                                    <p className="text-red-500 text-sm">{errors.data.numberOfTerms.message}</p>
                                )}
                            </div>

                            {/* Puntaje aprobatorio */}
                            <div className="space-y-1">
                                <Label htmlFor="passingScore">Puntaje aprobatorio</Label>
                                <Input
                                    id="passingScore"
                                    {...register("data.passingScore", { required: "Este campo es obligatorio" })}
                                    placeholder="Ej. 7.0"
                                />
                                {errors.data?.passingScore && (
                                    <p className="text-red-500 text-sm">{errors.data.passingScore.message}</p>
                                )}
                            </div>
                        </CardContent>

                        <CardFooter className="flex justify-between">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={onCancel}
                                disabled={isSubmitting}
                            >
                                <X className="w-4 h-4 mr-2" />
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
                                        <Save className="w-4 h-4 mr-2" />
                                        Guardar
                                    </>
                                )}
                            </Button>
                        </CardFooter>
                    </Card>
                </div>

                {/* Columna lateral */}
                <div className="space-y-6">
                    {/* Vista previa */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Vista Previa</CardTitle>
                            <p className="text-sm text-muted-foreground">
                                Así se verá el sistema de calificación actualizado
                            </p>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <ShieldCheck className="h-5 w-5 text-primary-500" />
                                    <h3 className="font-medium">
                                        {formData.name || "Nombre del Sistema"}
                                    </h3>
                                </div>
                                <Badge className="bg-accent-300 text-accent-800 hover:bg-accent-400 border-accent-500">
                                    Activo
                                </Badge>
                            </div>

                            <p className="text-xs text-muted-foreground">
                                {formData.description || "Descripción del sistema de calificación."}
                            </p>

                            <div className="flex flex-wrap gap-1">
                                {formData.numberOfTerms > 0 ? (
                                    Array.from({ length: formData.numberOfTerms }, (_, i) => (
                                        <Badge key={i} className="bg-secondary-100 text-secondary-800">
                                            Periodo {i + 1}
                                        </Badge>
                                    ))
                                ) : (
                                    <p className="text-sm text-muted-foreground">No hay periodos definidos</p>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Guía de buenas prácticas */}
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="flex items-center">
                                <Info className="h-4 w-4 mr-2 text-primary" />
                                Guía de Mejores Prácticas
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-3 text-sm">
                                <li className="flex items-start">
                                    <Check className="h-4 w-4 mr-2 text-primary mt-0.5" />
                                    Usa nombres descriptivos que identifiquen fácilmente el sistema.
                                </li>
                                <li className="flex items-start">
                                    <Check className="h-4 w-4 mr-2 text-primary mt-0.5" />
                                    Mantén la descripción clara y orientada al objetivo del sistema.
                                </li>
                                <li className="flex items-start">
                                    <Check className="h-4 w-4 mr-2 text-primary mt-0.5" />
                                    El número de períodos debe coincidir con la estructura académica (ej. 4 bimestres).
                                </li>
                                <li className="flex items-start">
                                    <AlertCircle className="h-4 w-4 mr-2 text-destructive mt-0.5" />
                                    Evita duplicar nombres ya existentes en otros sistemas de calificación.
                                </li>
                            </ul>

                            <div className="mt-4 bg-blue-50 dark:bg-blue-900/20 p-3 rounded-md">
                                <div className="flex items-start">
                                    <HelpCircle className="h-4 w-4 text-blue-500 mr-2 mt-0.5" />
                                    <div className="text-xs">
                                        <p className="font-medium text-blue-700 dark:text-blue-300">
                                            ¿Necesitas ayuda?
                                        </p>
                                        <p className="text-blue-600 dark:text-blue-400">
                                            Consulta la documentación institucional para conocer cómo se estructuran los sistemas de calificación.
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
