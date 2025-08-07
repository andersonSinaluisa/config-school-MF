import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Clock, Edit, MapPin, Trash2, Users } from "lucide-react"
import { Parallel } from "../../domain/entities/parallel"


interface ParallelCardProps {
    parallel:Parallel
    onEdit: (parallel: Parallel) => void
    onDelete: (parallel: Parallel) => void
}


export const ParallelCard = ({ parallel, onEdit, onDelete }: ParallelCardProps) => {
    return (
        <Card key={parallel.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">{parallel.course?.description} {parallel.name}</CardTitle>
                    <div className="flex gap-1">
                        <Button variant="ghost" size="icon" onClick={() => onEdit(parallel)} title="Editar">
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Editar</span>
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => onDelete(parallel)} title="Eliminar">
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Eliminar</span>
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                {/* Información del profesor */}
               

                {/* Horario */}
                {parallel.schoolYear && (
                    <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{parallel.schoolYear?.name}</span>
                        
                    </div>
                )}

                {/* Aula */}
                {parallel.name && (
                    <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{parallel.name}</span>
                    </div>
                )}

                {/* Sección */}
                {parallel.section && (
                    <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Jornada {parallel.section.name}</span>
                    </div>
                )}

                {/* Ocupación */}
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm font-medium">Capacidad</span>
                        </div>
                        <span className="text-sm font-medium">
                            {parallel.capacity}
                        </span>
                    </div>
                    
                </div>

                {/* Información adicional */}
                <div className="pt-2 border-t text-xs text-muted-foreground">
                    <div>ID: {parallel.id}</div>
                    {parallel.schoolYear && <div>Año escolar: {parallel.schoolYear.name}</div>}
                </div>
            </CardContent>
        </Card>
    )
    
}