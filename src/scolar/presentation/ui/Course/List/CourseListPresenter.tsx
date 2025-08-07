

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { PaginatedResult } from "@/scolar/infrastructure/dto/paginateDto"
import { Course } from "@/scolar/domain/entities/course"
import { BookOpen, ChevronRight, Home, Search } from "lucide-react"
import { CourseDeleteContainer } from "../Delete/CourseDeleteContainer"
import { Loader } from "@/components/loader"
import { Link } from "react-router-dom"

interface CourseListPresenterProps {
    course: PaginatedResult<Course>
    isPending: boolean
    onSearch: (searchTerm: string) => void
    onFilter: (filter: string) => void
    onAddCourse: () => void
    onDelete: (course: Course) => void
}
export const CourseListPresenter = ({ course, isPending, onSearch, onFilter, onAddCourse, onDelete }: CourseListPresenterProps) => {

    return (
        <div className="space-y-6">
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
                <span className="text-foreground font-medium">
                    Lista de Cursos
                </span>
            </nav>
            <Card>
                <CardHeader className="pb-3">
                    <CardTitle className="flex flex-row items-center justify-between">
                        Cursos Registrados

                        <Button
                            onClick={onAddCourse}
                        >
                            Crear nuevo curso
                        </Button>
                    </CardTitle>
                    <CardDescription>
                        Aquí puedes ver todos los cursos registrados en el sistema.
                    </CardDescription>
                    
                </CardHeader>
                <CardContent>
                    <div className="mb-4 flex items-center gap-2">
                        <div className="relative flex-1">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input type="search" placeholder="Buscar Materias..." className="pl-9"
                                onChange={(e) => onSearch(e.target.value)}
                            />
                        </div>
                        <DropdownMenu
                          
                        >
                            <DropdownMenuTrigger asChild
                            >
                                <Button variant="outline">
                                    Filtrar
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="ml-2 h-4 w-4"
                                    >
                                        <path d="M3 6h18" />
                                        <path d="M7 12h10" />
                                        <path d="M10 18h4" />
                                    </svg>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-[200px]">
                                <DropdownMenuLabel
                                onClick={() => onFilter("createdAt")}
                                >Filtrar por</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    onClick={() => onFilter("createdAt")}
                                >Fecha de creación</DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() => onFilter("updatedAt")}
                                >Número de permisos</DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() => onFilter("name")}
                                >Nombre</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 p-6">
                    {
                        isPending && (
                            <div className="flex items-center justify-center col-span-3">
                                <Loader />
                            </div>

                        )
                    }


                    {course.data && course.data.length > 0 ? (
                        course.data.map((course) => (
                            <Card
                                key={course.id}
                                className="mb-4 border border-gray-200 shadow-sm hover:shadow-md transition rounded-2xl"
                            >
                                <CardHeader className="flex flex-row items-center gap-3 bg-primary rounded-t-xl relative">
                                    <div className="bg-primary-200 p-2 rounded-full">
                                        <BookOpen className="text-primary-600 w-5 h-5" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-lg font-semibold text-gray-100 hover:text-primary-100 transition-colors duration-200">
                                            {course.name}
                                        </CardTitle>
                                        <CardDescription className="text-gray-200">
                                            {course.description}
                                        </CardDescription>
                                    </div>

                                    {/* Icono eliminar */}
                                    
                                    <CourseDeleteContainer
                                         
                                        course={course}
                                        onConfirm={() => onDelete(course)}
                                    />
                                </CardHeader>

                                <CardContent>
                                    <div className="flex items-center justify-between text-sm text-muted-foreground mt-3">
                                        <span className="flex items-center gap-1">
                                            🎓 Nivel: {course.level?.name || "Sin nivel"}
                                        </span>
                                        
                                    </div>
                                    <div className="mt-3 flex items-center justify-between text-sm text-muted-foreground">
                                        <Link
                                            to={`/cursos/${course.id}`}
                                            className="text-primary-600 hover:underline"
                                        >
                                            Ver detalles
                                        </Link>
                                        <Link
                                            to={`/cursos/${course.id}/materias`}
                                            className="text-primary-600 hover:underline"
                                        >
                                            Ver asignaturas
                                        </Link>
                                    </div>
                                </CardContent>
                          </Card>
                        ))
                    ) : (
                        <p className="text-center text-muted-foreground">No hay cursos disponibles.</p>
                    )}

                </div>
            </Card>
        </div>
    )
}