
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {  BookMarkedIcon, ChevronRight, Home, Search } from "lucide-react"
import { Subject } from "@/scolar/domain/entities/subject"
import { PaginatedResult } from "@/scolar/infrastructure/dto/paginateDto"
import { Loader } from "@/components/loader"
import { CardCustom } from "@/components/card-custom"
import { Link } from "react-router-dom"


export interface SubjectListPresenterProps {
    subjects: PaginatedResult<Subject>
    isPending: boolean
    onSearch: (searchTerm: string) => void
    onFilter: (filter: string) => void
    onAddSubject: () => void
    isPendingDelete: boolean
    onDelete: (subject: Subject) => void

}

export const SubjectListPresenter = (props: SubjectListPresenterProps) => {
    return (
        <div className="space-y-6">
            <nav className="flex items-center text-sm text-muted-foreground">
                <Link to="/school" className="hover:text-foreground transition-colors">
                    <Home className="h-4 w-4" />
                    <span className="sr-only">Inicio</span>
                </Link>
                <ChevronRight className="h-4 w-4 mx-1" />
                <Link to="/school/materias" className="hover:text-foreground transition-colors">
                    Materias
                </Link>
                <ChevronRight className="h-4 w-4 mx-1" />
                <span className="text-foreground font-medium">
                    Lista de Materias
                </span>
            </nav>
            <Card>
                <CardHeader className="pb-3">
                    <CardTitle className="flex flex-row items-center justify-between">
                    Materias Registradas

                        <Button
                            onClick={props.onAddSubject}
                        >
                            Crear nueva materia
                        </Button>
                    </CardTitle>
                    <CardDescription>
                        Aquí puedes ver todos las materias registrados en el sistema.
                    </CardDescription>

                </CardHeader>
                <CardContent>
                    <div className="mb-4 flex items-center gap-2">
                        <div className="relative flex-1">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input type="search" placeholder="Buscar Cursos..." className="pl-9"
                                onChange={(e) => props.onSearch(e.target.value)}
                            />
                        </div>
                        <DropdownMenu>
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
                                    onClick={() => props.onFilter("createdAt")}
                                >Filtrar por</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    onClick={() => props.onFilter("createdAt")}
                                >Fecha de creación</DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() => props.onFilter("updatedAt")}
                                >Número de permisos</DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() => props.onFilter("name")}
                                >Nombre</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-6">
                    {
                        props.isPending && (
                            <div className="flex items-center justify-center col-span-3">
                                <Loader />
                            </div>

                        )
                    }


                    {props.subjects.data && props.subjects.data.length > 0 ? (
                        props.subjects.data.map((subject) => (
                            <CardCustom
                            key={subject.id}
                                icon={<BookMarkedIcon size={80}/>}
                                title={subject.name}
                                paragraph={subject.description || "No hay descripción disponible."}
                                ribbonLabel={subject.hoursPerWeek + " horas/semana"}
                            />
                            
                        ))
                    ) : (
                        <p className="text-center text-muted-foreground">No hay cursos disponibles.</p>
                    )}

                </div>
            </Card>
        </div>
    )
}