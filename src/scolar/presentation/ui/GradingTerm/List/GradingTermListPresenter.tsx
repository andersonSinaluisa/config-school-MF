import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Search, Edit, Plus, Home, ChevronRight } from "lucide-react";
import { PaginatedResult } from "@/scolar/infrastructure/dto/paginateDto";
import { GradingTerm } from "@/scolar/domain/entities/grading_term";
import { useSystems } from "@/scolar/presentation/hooks/useSystems";
import { useAcademicYears } from "@/scolar/presentation/hooks/useAcademicYears";
import { GradingTermDeleteContainer } from "../Delete/GradingTermDeleteContainer";
import { GradingTermEditInlineContainer } from "../Edit/GradingTermEditInlineContainer";
import { Link } from "react-router-dom";

interface Props {
    gradingTerms: PaginatedResult<GradingTerm>;
    onAdd: () => void;
    onDeleted: () => void;
    onUpdated: () => void;
    onPaginate: (page: number) => void;
    onSearch: (term: string) => void;
    isPending?: boolean;
}

export const GradingTermListPresenter = ({
    gradingTerms,
    onAdd,
    onDeleted,
    onUpdated,
    onPaginate,
    onSearch,
    isPending,
}: Props) => {
    const systems = useSystems();
    const years = useAcademicYears();
    const [systemFilter, setSystemFilter] = useState<number | undefined>();
    const [yearFilter, setYearFilter] = useState<number | undefined>();
    const filteredTerms = gradingTerms.data.filter(
        (gt) =>
            (!systemFilter || gt.gradingSystem_id === systemFilter) &&
            (!yearFilter || gt.academicYear_id === yearFilter)
    );
    return (
        <div className="space-y-6">
            <nav className="flex items-center text-sm text-muted-foreground">
                <Link to="/" className="hover:text-foreground transition-colors">
                    <Home className="h-4 w-4" />
                    <span className="sr-only">Inicio</span>
                </Link>
                <ChevronRight className="h-4 w-4 mx-1" />
                <Link to="/sistemas-calificacion" className="hover:text-foreground transition-colors">
                    Períodos de Calificación
                </Link>
                <ChevronRight className="h-4 w-4 mx-1" />
                <span className="text-foreground font-medium">
                    Lista de Períodos de Calificación
                </span>
            </nav>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Períodos de Calificación</CardTitle>
                <Button onClick={onAdd} size="sm">
                    <Plus className="h-4 w-4 mr-2" /> Nuevo
                </Button>
            </CardHeader>
            <CardContent>
                <div className="flex gap-4 mb-4 flex-wrap">
                    <div className="relative flex-1 min-w-[200px]">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Buscar..."
                            className="pl-9"
                            onChange={(e) => onSearch(e.target.value)}
                        />
                    </div>
                    <Select
                        value={systemFilter ? String(systemFilter) : ""}
                        onValueChange={(val) =>
                            setSystemFilter(val ? Number(val) : undefined)
                        }
                    >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Sistema" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="0">Todos</SelectItem>
                            {systems.map((s) => (
                                <SelectItem key={s.id} value={String(s.id)}>
                                    {s.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Select
                        value={yearFilter ? String(yearFilter) : ""}
                        onValueChange={(val) =>
                            setYearFilter(val ? Number(val) : undefined)
                        }
                    >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Año" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="0">Todos</SelectItem>
                            {years.map((y) => (
                                <SelectItem key={y.id} value={String(y.id)}>
                                    {y.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Año Académico</TableHead>
                            <TableHead>Sistema</TableHead>
                            <TableHead>Nombre</TableHead>
                            <TableHead className="w-20">Orden</TableHead>
                            <TableHead>Peso</TableHead>
                            <TableHead className="text-right">Acciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isPending && (
                            <TableRow>
                                <TableCell colSpan={6}>
                                    <Skeleton className="h-4 w-full" />
                                </TableCell>
                            </TableRow>
                        )}
                        {!isPending && filteredTerms.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center">
                                    No se encontraron períodos
                                </TableCell>
                            </TableRow>
                        )}
                        {filteredTerms.map((gt) => {
                            const year = years.find((y) => y.id === gt.academicYear_id);
                            const system = systems.find(
                                (s) => s.id === gt.gradingSystem_id
                            );
                            const weightNum = parseFloat(gt.weight);
                            const weightValid = weightNum >= 0 && weightNum <= 1;
                            return (
                                <TableRow
                                    key={gt.id}
                                    className="hover:bg-muted odd:bg-muted/50"
                                >
                                    <TableCell>{year?.name}</TableCell>
                                    <TableCell>
                                        {system
                                            ? `${system.name}, escala ${system.passingScore}`
                                            : ""}
                                    </TableCell>
                                    <TableCell className="font-medium">
                                        {gt.name}
                                    </TableCell>
                                    <TableCell>{gt.order}</TableCell>
                                    <TableCell>
                                        {weightValid ? (
                                            `${(weightNum * 100).toFixed(0)}%`
                                        ) : (
                                            <Badge variant="destructive">
                                                Peso inválido
                                            </Badge>
                                        )}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <GradingTermEditInlineContainer
                                                gradingTerm={gt}
                                                onUpdated={onUpdated}
                                            >
                                                <TooltipProvider>
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                            >
                                                                <Edit className="h-4 w-4" />
                                                            </Button>
                                                        </TooltipTrigger>
                                                        <TooltipContent>
                                                            Editar
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>
                                            </GradingTermEditInlineContainer>
                                            <GradingTermDeleteContainer
                                                gradingTerm={gt}
                                                onConfirm={onDeleted}
                                            />
                                        </div>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
                <div className="mt-4 flex justify-end items-center gap-4">
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious href="#" className={gradingTerms.meta.prev ? 'cursor-pointer' : 'cursor-not-allowed'} onClick={() => onPaginate(gradingTerms.meta.currentPage - 1)} />
                            </PaginationItem>
                            {Array.from({ length: gradingTerms.meta.lastPage }, (_, i) => i + 1).map(page => (
                                <PaginationItem key={page}>
                                    <PaginationLink href="#" isActive={page === gradingTerms.meta.currentPage} onClick={() => onPaginate(page)}>
                                        {page}
                                    </PaginationLink>
                                </PaginationItem>
                            ))}
                            <PaginationItem>
                                <PaginationNext href="#" className={gradingTerms.meta.next ? 'cursor-pointer' : 'cursor-not-allowed'} onClick={() => onPaginate(gradingTerms.meta.currentPage + 1)} />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            </CardContent>
        </Card>
        </div>
    );
};

