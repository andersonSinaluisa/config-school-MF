
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { CreateCourseCommand } from "@/scolar/application/useCases/courses/createCourseUseCase"
import { Level } from "@/scolar/domain/entities/level"
import { AlertCircle, ArrowLeft, BookOpen, Check, ChevronRight, HelpCircle, Home, Info, Save, ShieldCheck } from "lucide-react"
import { Control, Controller, UseFormRegister } from "react-hook-form"
import { Link } from "react-router-dom"

interface CreateCoursePresenterProps {
    onBack: () => void
    isSubmitting: boolean
    handleSubmit: (e: React.FormEvent) => void;
    formData: CreateCourseCommand;
    levels: Level[]
    register: UseFormRegister<CreateCourseCommand>
    control: Control<CreateCourseCommand, CreateCourseCommand>
}
export const CreateCoursePresenter = ({
    onBack,
    isSubmitting,
    handleSubmit,
    formData,
    levels,
    register,
    control
}: CreateCoursePresenterProps) => {

    return (
        <div className="space-y-6">
            {/* Breadcrumbs */}
            <nav className="flex items-center text-sm text-muted-foreground">
                <Link to="/" className="hover:text-foreground transition-colors">
                    <Home className="h-4 w-4" />
                    <span className="sr-only">Inicio</span>
                </Link>
                <ChevronRight className="h-4 w-4 mx-1" />
                <Link to="/cursos" className="hover:text-foreground transition-colors">
                    Cursos
                </Link>
                <ChevronRight className="h-4 w-4 mx-1" />
                <span className="text-foreground font-medium">Nuevo Curso</span>
            </nav>

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                        <BookOpen className="h-8 w-8 text-primary-500" />
                        Nuevo Curso
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        Completa los campos para crear un nuevo curso. Asegúrate de que toda la información sea correcta antes de guardar.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" onClick={() => onBack()} disabled={isSubmitting}>
                        Cancelar
                    </Button>
                    <Button
                        onClick={handleSubmit}

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
                                Crear Curso
                            </>
                        )}
                    </Button>
                </div>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Role Form */}
                <div className="lg:col-span-2">
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle>
                                Crear Cursos
                            </CardTitle>
                            <CardDescription>
                                Completa los campos para crear un nuevo curso. Asegúrate de que toda la información sea correcta antes de guardar.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>



                            <div className="space-y-2">
                                <Label htmlFor="name">Nombre</Label>
                                <Input id="name" value={formData.data.name}
                                {...register("data.name")}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="levelId">Nivel</Label>
                                <Controller
                                    name="data.level_id"
                                    control={control}
                                    render={({ field }) => (
                                        <Select onValueChange={(value) => field.onChange(value)}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Seleccionar nivel" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {levels.map((level) => (
                                                    <SelectItem key={level.id} value={level.id.toString()}>
                                                        {level.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    )}
                                >


                                </Controller>

                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Descripción</Label>
                                <Textarea
                                    id="description"
                                    {...register("data.description")}
                                />
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-between border-t pt-6">
                            <Button variant="outline" onClick={() => onBack()} disabled={isSubmitting}>
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Volver a Cursos
                            </Button>
                            <Button
                                onClick={handleSubmit}
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
                                        Crear Curso
                                    </>
                                )}
                            </Button>
                        </CardFooter>
                    </Card>
                </div>

                {/* Right Column - Preview & Help */}
                <div className="space-y-6">
                    {/* Preview Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Vista Previa</CardTitle>
                            <CardDescription>
                                Vista previa del curso que estás creando. Asegúrate de que toda la información sea correcta antes de guardar.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <ShieldCheck className="h-5 w-5 text-primary-500" />
                                        <h3 className="font-medium">{formData.data.name || "Nombre del curso"}</h3>
                                    </div>
                                    <Badge className="bg-accent-300 text-accent-800 hover:bg-accent-400 border-accent-500">Activo</Badge>
                                </div>


                                <div className="space-y-1">
                                    <p className="text-xs text-muted-foreground">
                                        Descripción
                                    </p>
                                    <p className="text-sm font-medium">
                                        {formData.data.description || "Descripción del curso"}
                                    </p>
                                </div>

                                <div className="space-y-1">
                                    <p className="text-xs text-muted-foreground">
                                        Nivel
                                    </p>
                                    <p className="text-sm font-medium">
                                        {levels.find(level => level.id == formData.data.level_id)?.name || "Nivel no seleccionado"}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Help Card */}
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
                                    <span>
                                        Utilice nombres descriptivos y claros para los cursos
                                    </span>
                                </li>
                                <li className="flex items-start">
                                    <Check className="h-4 w-4 mr-2 text-primary mt-0.5" />
                                    <span>
                                        Proporcione descripciones detalladas para cada curso
                                    </span>
                                </li>
                                <li className="flex items-start">
                                    <Check className="h-4 w-4 mr-2 text-primary mt-0.5" />
                                    <span>
                                        Asigne niveles adecuados a los cursos para facilitar la navegación
                                    </span>
                                </li>
                                <li className="flex items-start">
                                    <AlertCircle className="h-4 w-4 mr-2 text-destructive mt-0.5" />
                                    <span>
                                        Evite usar nombres genéricos o confusos para los cursos
                                    </span>
                                </li>
                            </ul>

                            <div className="mt-4 bg-blue-50 dark:bg-blue-900/20 p-3 rounded-md">
                                <div className="flex items-start">
                                    <HelpCircle className="h-4 w-4 text-blue-500 mr-2 mt-0.5" />
                                    <div className="text-xs">
                                        <p className="font-medium text-blue-700 dark:text-blue-300">¿Necesitas ayuda?</p>
                                        <p className="text-blue-600 dark:text-blue-400">
                                            Consulta la documentación de cursos para más información sobre mejores prácticas.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )

}