import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Search, Edit, Plus, Home, ChevronRight } from "lucide-react";
import { PaginatedResult } from "@/scolar/infrastructure/dto/paginateDto";
import { GradingSystem } from "@/scolar/domain/entities/grading_system";
import { GradingSystemDeleteContainer } from "../Delete/GradingSystemDeleteContainer";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

interface Props {
    gradingSystems: PaginatedResult<GradingSystem>;
    onAdd: () => void;
    onEdit: (gs: GradingSystem) => void;
    onDeleted: () => void;
    onPaginate: (page: number) => void;
    onSearch: (term: string) => void;
    isPending?: boolean;
}

export const GradingSystemListPresenter = ({
    gradingSystems,
    onAdd,
    onEdit,
    onDeleted,
    onPaginate,
    onSearch,
    isPending
}: Props) => {
    return (
        <div className="space-y-6">
            {/* Breadcrumb */}
            <nav className="flex items-center text-sm text-muted-foreground">
                <Link to="/" className="hover:text-foreground transition-colors">
                    <Home className="h-4 w-4" />
                    <span className="sr-only">Inicio</span>
                </Link>
                <ChevronRight className="h-4 w-4 mx-1" />
                <Link to="/sistemas-calificacion" className="hover:text-foreground transition-colors">
                    Sistemas de Calificación
                </Link>
                <ChevronRight className="h-4 w-4 mx-1" />
                <span className="text-foreground font-medium">Lista</span>
            </nav>

            <Card className="border shadow-sm">
                {/* Header */}
                <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                        <CardTitle>Sistemas de Calificación</CardTitle>
                        <p className="text-sm text-muted-foreground">
                            Consulta, edita o elimina los sistemas de calificación definidos.
                        </p>
                    </div>
                    <Button onClick={onAdd} size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Crear nuevo sistema
                    </Button>
                </CardHeader>

                {/* Content */}
                <CardContent>
                    {/* Buscador */}
                    <div className="relative flex-1 mb-4">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Buscar por nombre o descripción..."
                            className="pl-9"
                            onChange={(e) => onSearch(e.target.value)}
                        />
                    </div>

                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Nombre</TableHead>
                                    <TableHead>Descripción</TableHead>
                                    <TableHead># Períodos</TableHead>
                                    <TableHead>Puntaje mínimo</TableHead>
                                    <TableHead className="text-right">Acciones</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {/* Loading */}
                                {isPending &&
                                    Array.from({ length: 3 }).map((_, i) => (
                                        <TableRow key={i}>
                                            <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                                            <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                                            <TableCell><Skeleton className="h-4 w-10" /></TableCell>
                                            <TableCell><Skeleton className="h-4 w-10" /></TableCell>
                                            <TableCell className="text-right"><Skeleton className="h-4 w-20 ml-auto" /></TableCell>
                                        </TableRow>
                                    ))}

                                {/* Empty state */}
                                {!isPending && gradingSystems.data.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={5} className="text-center text-muted-foreground text-sm py-6">
                                            No se encontraron sistemas de calificación.
                                        </TableCell>
                                    </TableRow>
                                )}

                                {/* Data rows */}
                                {gradingSystems.data.map((gs) => (
                                    <TableRow key={gs.id}>
                                        <TableCell className="font-medium">{gs.name}</TableCell>
                                        <TableCell>{gs.description}</TableCell>
                                        <TableCell>{gs.numberOfTerms}</TableCell>
                                        <TableCell>
                                            <Badge>
                                                {gs.passingScore}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button variant="ghost" size="sm" onClick={() => onEdit(gs)}>
                                                    <Edit className="h-4 w-4 mr-1" />
                                                    Editar
                                                </Button>
                                                <GradingSystemDeleteContainer gradingSystem={gs} onConfirm={onDeleted} />
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>

                    {/* Paginación */}
                    <div className="mt-4 flex justify-end items-center gap-4">
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious
                                        href="#"
                                        onClick={() =>
                                            gradingSystems.meta.prev && onPaginate(gradingSystems.meta.currentPage - 1)
                                        }
                                        className={
                                            gradingSystems.meta.prev
                                                ? "cursor-pointer"
                                                : "pointer-events-none opacity-50"
                                        }
                                    />
                                </PaginationItem>
                                {Array.from(
                                    { length: gradingSystems.meta.lastPage },
                                    (_, i) => i + 1
                                ).map((page) => (
                                    <PaginationItem key={page}>
                                        <PaginationLink
                                            href="#"
                                            isActive={page === gradingSystems.meta.currentPage}
                                            onClick={() => onPaginate(page)}
                                        >
                                            {page}
                                        </PaginationLink>
                                    </PaginationItem>
                                ))}
                                <PaginationItem>
                                    <PaginationNext
                                        href="#"
                                        onClick={() =>
                                            gradingSystems.meta.next && onPaginate(gradingSystems.meta.currentPage + 1)
                                        }
                                        className={
                                            gradingSystems.meta.next
                                                ? "cursor-pointer"
                                                : "pointer-events-none opacity-50"
                                        }
                                    />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};
