
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Command, CommandInput } from "@/components/ui/command"
import {  BookMarkedIcon, ChevronRight, Home, Edit } from "lucide-react"
import { Subject } from "@/scolar/domain/entities/subject"
import { PaginatedResult } from "@/scolar/infrastructure/dto/paginateDto"
import { Loader } from "@/components/loader"
import { CardCustom } from "@/components/card-custom"
import { Link } from "react-router-dom"


export interface SubjectListPresenterProps {
    subjects: PaginatedResult<Subject>
    isPending: boolean
    onSearch: (searchTerm: string) => void
    onAddSubject: () => void
    isPendingDelete: boolean
    onDelete: (subject: Subject) => void
    onClearFilters: () => void
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
                    <div className="mb-4 flex flex-col md:flex-row md:items-center gap-2">
                        <Command className="rounded-lg border md:flex-1">
                            <CommandInput placeholder="Buscar..." onValueChange={props.onSearch} />
                        </Command>
                        <Button variant="outline" onClick={props.onClearFilters}>Limpiar filtros</Button>
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
                                icon={<BookMarkedIcon size={80} />}
                                title={subject.name}
                                paragraph={subject.description || "No hay descripción disponible."}
                                ribbonLabel={subject.hoursPerWeek + " horas/semana"}
                                action={
                                    <Link to={`/materias/${subject.id}`}>
                                        <Button variant="ghost" size="icon">
                                            <Edit className="h-4 w-4" />
                                            <span className="sr-only">Editar</span>
                                        </Button>
                                    </Link>
                                }
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