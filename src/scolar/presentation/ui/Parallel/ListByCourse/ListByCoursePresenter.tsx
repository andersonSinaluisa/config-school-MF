;
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Course } from "@/scolar/domain/entities/course"
import { AlertCircle, BookOpen, Check, ChevronRight, HelpCircle, Home, Info, Search, ShieldCheck } from "lucide-react"
import { SheetCreateParallelContainer } from "../SheetCreate/SheetCreateParallelContainer"
import { PaginatedResult } from "@/scolar/infrastructure/dto/paginateDto";
import { Parallel } from "@/scolar/domain/entities/parallel";
import { ParallelCard } from "@/scolar/application/components/ParallelCard";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom"


interface ListByCoursePresenterProps{
    course: Course|null;
    onBack: ()=>void
    list: PaginatedResult<Parallel>;
}

export const ListByCoursePresenter = ({ course, onBack, list }: ListByCoursePresenterProps)=>{
    if (course==null){
        return null
    }
    return (
        <div className="space-y-6">
            {/* Breadcrumbs */}
            <nav className="flex items-center text-sm text-muted-foreground">
                <Link to="/school" className="hover:text-foreground transition-colors">
                    <Home className="h-4 w-4" />
                    <span className="sr-only">Inicio</span>
                </Link>
                <ChevronRight className="h-4 w-4 mx-1" />
                <Link to="/school/cursos" className="hover:text-foreground transition-colors">
                    Cursos
                </Link>
                <ChevronRight className="h-4 w-4 mx-1" />
                <Link to={`/school/cursos/${course.id}`} className="hover:text-foreground transition-colors">
                    {course.name || "Curso"}
                </Link>
                <ChevronRight className="h-4 w-4 mx-1" />
                <span className="text-foreground font-medium">
                    Paralelos de {course.name || ""}
                </span>
            </nav>

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                        <BookOpen className="h-8 w-8 text-primary-500" />
                        {course.name || ""}
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        Aqui puedes gestionar los paralelos del curso. Puedes crear, editar o eliminar paralelos según sea necesario.
                        
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" onClick={() => onBack()}>
                        Cancelar
                    </Button>
                   
                </div>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Role Form */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-end justify-between">
                        <SheetCreateParallelContainer
                            course={course}
                        />
                    </div>
                    <div>
                       
                        <div className="mb-5">
                            <div className="relative flex-1">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input 
                                    type="search" 
                                    placeholder="Buscar Cursos..." 
                                    className="pl-9 bg-white"
                                   
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {
                                list.data.map((e) => (
                                    <ParallelCard
                                        key={e.id}
                                        onDelete={() => { }}
                                        onEdit={() => { }}
                                        parallel={e}
                                    />
                                ))
                            }
                        </div>
                        {
                            list.meta.total == 0 && (
                                <Card>
                                    <CardHeader>
                                        <CardTitle>No hay paralelos asignados</CardTitle>
                                        <CardDescription>
                                            Actualmente
                                            no hay paralelos asignados a este curso. Puedes crear uno nuevo utilizando el formulario a la izquierda.
                                        </CardDescription>
                                    </CardHeader>
                                </Card>
                            )

                        }
                       
                    </div>
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
                                        <h3 className="font-medium">{course.name || "Nombre del curso"}</h3>
                                    </div>
                                    <Badge className="bg-accent-300 text-accent-800 hover:bg-accent-400 border-accent-500">Activo</Badge>
                                </div>


                                <div className="space-y-1">
                                    <p className="text-xs text-muted-foreground">
                                        Descripción
                                    </p>
                                    <p className="text-sm font-medium">
                                        {course.description || "Descripción del curso"}
                                    </p>
                                </div>

                                <div className="space-y-1">
                                    <p className="text-xs text-muted-foreground">
                                        Nivel
                                    </p>
                                    <p className="text-sm font-medium">
                                        {course.level?.name || "Nivel no seleccionado"}
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