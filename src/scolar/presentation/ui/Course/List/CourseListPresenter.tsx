

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Command, CommandInput } from "@/components/ui/command"
import { SearchSelect } from "@/components/ui/search-select"
import { PaginatedResult } from "@/scolar/infrastructure/dto/paginateDto"
import { Course } from "@/scolar/domain/entities/course"
import { Level } from "@/scolar/domain/entities/level"
import { BookOpen, ChevronRight, Home, Menu, Search } from "lucide-react"
import { CourseDeleteContainer } from "../Delete/CourseDeleteContainer"
import { Loader } from "@/components/loader"
import { Link } from "react-router-dom"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface CourseListPresenterProps {
    course: PaginatedResult<Course>
    isPending: boolean
    onSearch: (searchTerm: string) => void
    onAddCourse: () => void
    onDelete: (course: Course) => void
    levels: Level[]
    selectedLevel?: number
    onLevelChange: (value: string | number) => void
    onClearFilters: () => void
}
export const CourseListPresenter = ({ course, isPending, onSearch, onAddCourse, onDelete, levels, selectedLevel, onLevelChange, onClearFilters }: CourseListPresenterProps) => {

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
                <CardContent className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="relative w-full">

                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input type="search" placeholder="Buscar Cursos..." className="pl-9"
                            onChange={(e) => onSearch(e.target.value)}
                        />
                    </div>
                    <div className="mb-4 flex flex-col md:flex-row md:items-center gap-2">
                      
                        <Command className="rounded-lg border md:flex-1">
                            <CommandInput placeholder="Buscar Cursos..." onValueChange={onSearch} />
                        </Command>
                        <SearchSelect
                            options={levels.map(l => ({ value: l.id, label: l.name }))}
                            value={selectedLevel}
                            onChange={onLevelChange}
                            placeholder="Seleccionar nivel"
                        />
                        <Button variant="outline" onClick={onClearFilters}>Limpiar filtros</Button>
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
                                className="border border-gray-200 shadow-sm hover:shadow-md transition rounded-2xl"
                            >
                                <CardHeader className=" bg-primary rounded-t-xl ">
                                    
                                    <div className="flex flex-col">
                                        <div className="flex flex-row justify-between">

                                                {/* Icono eliminar */}
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger>
                                                        <Menu color="white"></Menu>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent>
                                                        <DropdownMenuItem>
                                                            <Link
                                                                to={`/cursos/${course.id}`}
                                                                className="text-primary-600 hover:underline"
                                                            >
                                                                Ver detalles
                                                            </Link>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem>
                                                            <Link
                                                                to={`/cursos/${course.id}/paralelos`}
                                                                className="text-primary-600 hover:underline"
                                                            >
                                                                Ver paralelos
                                                            </Link>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem>
                                                            <Link
                                                                to={`/cursos/${course.id}/materias`}
                                                                className="text-primary-600 hover:underline"
                                                            >
                                                                Ver asignaturas
                                                            </Link>
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>

                                            <CourseDeleteContainer

                                                course={course}
                                                onConfirm={() => onDelete(course)}
                                            />
                                        </div>
                                        <div className="flex flex-row items-center gap-3 relative">
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
                                        </div>
                                    </div>
                                    
                                   
                                </CardHeader>

                                <CardContent>
                                    <div className="flex items-center justify-between text-sm text-muted-foreground pt-5">
                                        <span className="flex items-center gap-1">
                                            🎓 Nivel: {course.level?.name || "Sin nivel"}
                                        </span>
                                        
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