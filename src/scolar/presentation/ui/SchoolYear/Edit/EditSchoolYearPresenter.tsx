import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { formatDate } from "@/lib/utils"
import { UpdateSchoolYearUseCaseCommand } from "@/scolar/application/useCases/schoolYears/updateSchoolYearUseCase"
import { Status } from "@/scolar/domain/entities/Status";
import { AlertCircle, Check, ChevronRight, HelpCircle, Home, Info, Save, ShieldCheck } from "lucide-react"
import { Control, Controller, FieldErrors, UseFormRegister } from "react-hook-form"
import { Link } from "react-router-dom"


interface CreateSchoolYearPresenterProps {
    onSubmit: () => Promise<void>
    onCancel: () => void
    register: UseFormRegister<UpdateSchoolYearUseCaseCommand>
    errors: FieldErrors<UpdateSchoolYearUseCaseCommand>
    isSubmitting: boolean
    formData: UpdateSchoolYearUseCaseCommand
    control: Control<UpdateSchoolYearUseCaseCommand, UpdateSchoolYearUseCaseCommand>
}


export const EditSchoolYearPresenter = ({
    isSubmitting,
    onCancel,
    onSubmit,
    register,
    errors,
    control,
    formData
}: CreateSchoolYearPresenterProps) => {

    return (
        <form className="space-y-6" onSubmit={onSubmit}>

            <nav className="flex items-center text-sm text-muted-foreground">
                <Link to="/admin" className="hover:text-foreground transition-colors">
                    <Home className="h-4 w-4" />
                    <span className="sr-only">Inicio</span>
                </Link>
                <ChevronRight className="h-4 w-4 mx-1" />
                <Link to="/school/periodos" className="hover:text-foreground transition-colors">
                    Periodos Escolares
                </Link>
                <ChevronRight className="h-4 w-4 mx-1" />
                <span className="text-foreground font-medium">
                    {formData.data.name}
                </span>
            </nav>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                        <ShieldCheck className="h-8 w-8 text-primary-500" />
                        {formData.data.name || "Nuevo Periodo Escolar"}
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        Aquí puedes editar un periodo escolar. Asegúrate de completar todos los campos requeridos.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" type="button" onClick={() => onCancel()} disabled={isSubmitting}>
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
                                Crear Nivel
                            </>
                        )}
                    </Button>
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                Actualizar Periodo Escolar
                                    
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {errors.root && <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm">{errors.root?.message}</div>}

                            <div className="space-y-2">
                                <Label htmlFor="name">Nombre</Label>
                                <Input
                                    id="name"

                                    {...register("data.name")}
                                />
                                {
                                    errors.data?.name && (
                                        <div className="text-red-500 text-sm mt-1">
                                            {errors.data.name.message}
                                        </div>
                                    )
                                }
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="startDate">Fecha de inicio</Label>
                                <Input
                                    id="startDate"
                                    type="date"
                                    {...register("data.startDate", {
                                        valueAsDate: true,
                                    })}

                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="endDate">Fecha de fin</Label>
                                <Input
                                    id="endDate"
                                    type="date"
                                    {...register("data.endDate", {
                                        valueAsDate: true,
                                    })}

                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="status">Estado</Label>
                                <Controller
                                    name="data.status"
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            defaultValue={field.value}
                                            onValueChange={(value) => {
                                                field.onChange(value);
                                            }}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Seleccionar estado" />
                                            </SelectTrigger>
                                            <SelectContent>

                                                {
                                                    Status.getAll().map((status) => (
                                                        <SelectItem key={status.id} value={status.label} className={`flex items-center gap-2 hover:${status.textColor}`}>
                                                            <span className={`h-4 w-4 rounded-full hover:${status.textColor}`} />
                                                            {status.label}
                                                        </SelectItem>
                                                    ))
                                                }
                                            </SelectContent>
                                        </Select>
                                    )}
                                />

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
                    {/* Preview Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Vista Previa</CardTitle>
                            <CardDescription>Así se verá el periodo lectivo después de guardar</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <ShieldCheck className="h-5 w-5 text-primary-500" />
                                        <h3 className="font-medium">{formData.data.name || "Nombre del periodo lectivo"}</h3>
                                    </div>
                                    <Badge className="bg-accent-300 text-accent-800 hover:bg-accent-400 border-accent-500">Activo</Badge>
                                </div>


                                <div className="space-y-1">
                                    <p className="text-xs text-muted-foreground">
                                        Fecha de inicio - Fecha de fin
                                    </p>
                                    <div className="flex flex-wrap gap-1">
                                        {formData.data.startDate && formatDate(formData.data.startDate) || "Fecha de inicio"} -
                                        {formData.data.endDate && formatDate(formData.data.endDate) || "Fecha de fin"}
                                    </div>
                                </div>

                            </div>
                        </CardContent>
                    </Card>

                    {/* Help Card */}
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="flex items-center">
                                <Info className="h-4 w-4 mr-2 text-primary" />
                                Guía de Periodos Lectivos
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-3 text-sm">
                                <li className="flex items-start">
                                    <Check className="h-4 w-4 mr-2 text-primary mt-0.5" />
                                    <span>
                                        Asegúrate de que el nombre del periodo escolar se claro, Ejemplo: 2024
                                    </span>
                                </li>
                                <li className="flex items-start">
                                    <Check className="h-4 w-4 mr-2 text-primary mt-0.5" />
                                    <span>
                                        Usa un formato consistente para los nombres de los niveles educativos, Ejemplo: Primaria, Secundaria
                                    </span>
                                </li>
                                <li className="flex items-start">
                                    <Check className="h-4 w-4 mr-2 text-primary mt-0.5" />
                                    <span>
                                        Considera incluir el año o grado en el nombre para mayor claridad, Ejemplo: Primaria 2024
                                    </span>
                                </li>
                                <li className="flex items-start">
                                    <AlertCircle className="h-4 w-4 mr-2 text-destructive mt-0.5" />
                                    <span>
                                        Evita usar nombres de niveles educativos que ya existan en el sistema para evitar confusiones
                                    </span>
                                </li>
                            </ul>

                            <div className="mt-4 bg-blue-50 dark:bg-blue-900/20 p-3 rounded-md">
                                <div className="flex items-start">
                                    <HelpCircle className="h-4 w-4 text-blue-500 mr-2 mt-0.5" />
                                    <div className="text-xs">
                                        <p className="font-medium text-blue-700 dark:text-blue-300">¿Necesitas ayuda?</p>
                                        <p className="text-blue-600 dark:text-blue-400">
                                            Consulta la documentación de periodos escolares para más información sobre mejores prácticas.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

        </form>

    )

}