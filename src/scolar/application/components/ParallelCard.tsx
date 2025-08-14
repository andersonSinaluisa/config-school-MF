
import { Calendar, Clock, Edit, MapPin, MoreVertical, Trash2, Users, Copy } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { Parallel } from "@/scolar/domain/entities/parallel";




interface ParallelCardProps {
    parallel: Parallel
    onEdit: (parallel: Parallel) => void
    onDelete: (parallel: Parallel) => void
}

export const ParallelCard = ({ parallel, onEdit, onDelete }: ParallelCardProps) => {
    const [copied, setCopied] = useState(false);

    const title = `${parallel.course?.name ?? "Curso"} ${parallel.name ?? ""}`.trim();

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(String(parallel.id));
            setCopied(true);
            setTimeout(() => setCopied(false), 1200);
        } catch {
            // opcional: fallback
        }
    };

    return (
        <TooltipProvider delayDuration={200}>
            <Card
                key={parallel.id}
                className="group hover:shadow-lg transition-all duration-200 focus-within:ring-2 focus-within:ring-ring"
                role="region"
                aria-labelledby={`parallel-title-${parallel.id}`}
                aria-describedby={`parallel-desc-${parallel.id}`}
            >
                <CardHeader className="pb-2">
                    <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                            <CardTitle
                                id={`parallel-title-${parallel.id}`}
                                className="text-base sm:text-lg font-semibold tracking-tight line-clamp-1"
                                title={title}
                            >
                                {title}
                            </CardTitle>

                            <div id={`parallel-desc-${parallel.id}`} className="mt-1 flex flex-wrap items-center gap-2">
                                {parallel.schoolYear?.name && (
                                    <Badge variant="secondary" className="whitespace-nowrap" title="Año escolar">
                                        <Clock className="mr-1 h-3.5 w-3.5" />
                                        {parallel.schoolYear.name}
                                    </Badge>
                                )}
                                {parallel.section?.name && (
                                    <Badge variant="outline" className="whitespace-nowrap" title="Jornada">
                                        <Calendar className="mr-1 h-3.5 w-3.5" />
                                        Jornada {parallel.section.name}
                                    </Badge>
                                )}
                                {typeof parallel.capacity === "number" && (
                                    <Badge className="whitespace-nowrap" title="Capacidad">
                                        <Users className="mr-1 h-3.5 w-3.5" />
                                        Capacidad: {parallel.capacity}
                                    </Badge>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center gap-1">
                            {/* Acción rápida: Editar */}
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => onEdit(parallel)}
                                        aria-label="Editar paralelo"
                                    >
                                        <Edit className="h-4 w-4" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>Editar</TooltipContent>
                            </Tooltip>

                            {/* Menú de más acciones */}
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" aria-label="Más acciones">
                                        <MoreVertical className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-40">
                                    <DropdownMenuItem onClick={() => onEdit(parallel)}>
                                        <Edit className="mr-2 h-4 w-4" />
                                        Editar
                                    </DropdownMenuItem>

                                    <DropdownMenuItem onClick={handleCopy}>
                                        <Copy className="mr-2 h-4 w-4" />
                                        {copied ? "¡ID copiado!" : "Copiar ID"}
                                    </DropdownMenuItem>

                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <DropdownMenuItem className="text-destructive focus:text-destructive">
                                                <Trash2 className="mr-2 h-4 w-4" />
                                                Eliminar…
                                            </DropdownMenuItem>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>¿Eliminar este paralelo?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    Esta acción no se puede deshacer. Se eliminará el paralelo y su configuración asociada.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                                <AlertDialogAction
                                                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                                    onClick={() => onDelete(parallel)}
                                                >
                                                    Eliminar
                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="pt-2 space-y-3">
                    <Separator />

                    {/* Metadatos con iconos alineados */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {/* Curso (fallback a descripción) */}
                        <div className="flex items-center gap-2 min-w-0">
                            <MapPin className="h-4 w-4 text-muted-foreground shrink-0" />
                            <span className="text-sm text-muted-foreground truncate">
                                <span className="font-medium text-foreground">Curso:</span>{" "}
                                {parallel.course?.description ?? "—"}
                            </span>
                        </div>

                        {/* Paralelo */}
                        <div className="flex items-center gap-2 min-w-0">
                            <Users className="h-4 w-4 text-muted-foreground shrink-0" />
                            <span className="text-sm text-muted-foreground truncate">
                                <span className="font-medium text-foreground">Paralelo:</span>{" "}
                                {parallel.name ?? "—"}
                            </span>
                        </div>

                        {/* Año escolar */}
                        <div className="flex items-center gap-2 min-w-0">
                            <Clock className="h-4 w-4 text-muted-foreground shrink-0" />
                            <span className="text-sm text-muted-foreground truncate">
                                <span className="font-medium text-foreground">Año escolar:</span>{" "}
                                {parallel.schoolYear?.name ?? "—"}
                            </span>
                        </div>

                        {/* Jornada */}
                        <div className="flex items-center gap-2 min-w-0">
                            <Calendar className="h-4 w-4 text-muted-foreground shrink-0" />
                            <span className="text-sm text-muted-foreground truncate">
                                <span className="font-medium text-foreground">Jornada:</span>{" "}
                                {parallel.section?.name ?? "—"}
                            </span>
                        </div>
                    </div>

                    <Separator />

                    {/* ID y acciones auxiliares */}
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="truncate">ID: <span className="font-medium text-foreground">{parallel.id}</span></div>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-7 px-2" onClick={handleCopy}>
                                    <Copy className="mr-1 h-3.5 w-3.5" />
                                    {copied ? "Copiado" : "Copiar ID"}
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>Copiar identificador</TooltipContent>
                        </Tooltip>
                    </div>
                </CardContent>
            </Card>
        </TooltipProvider>
    );
};
