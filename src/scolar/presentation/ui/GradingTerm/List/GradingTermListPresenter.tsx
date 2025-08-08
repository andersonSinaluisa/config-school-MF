import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Search, Edit, Plus } from "lucide-react";
import { PaginatedResult } from "@/scolar/infrastructure/dto/paginateDto";
import { GradingTerm } from "@/scolar/domain/entities/grading_term";
import { GradingTermDeleteContainer } from "../Delete/GradingTermDeleteContainer";

interface Props {
    gradingTerms: PaginatedResult<GradingTerm>;
    onAdd: () => void;
    onEdit: (gt: GradingTerm) => void;
    onDeleted: () => void;
    onPaginate: (page: number) => void;
    onSearch: (term: string) => void;
    isPending?: boolean;
}

export const GradingTermListPresenter = ({ gradingTerms, onAdd, onEdit, onDeleted, onPaginate, onSearch, isPending }: Props) => {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Períodos de Calificación</CardTitle>
                <Button onClick={onAdd} size="sm"><Plus className="h-4 w-4 mr-2" /> Nuevo</Button>
            </CardHeader>
            <CardContent>
                <div className="relative flex-1 mb-4">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input type="search" placeholder="Buscar..." className="pl-9" onChange={e => onSearch(e.target.value)} />
                </div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nombre</TableHead>
                            <TableHead>Orden</TableHead>
                            <TableHead>Peso</TableHead>
                            <TableHead className="text-right">Acciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isPending && (
                            <TableRow><TableCell colSpan={4}><Skeleton className="h-4 w-full" /></TableCell></TableRow>
                        )}
                        {gradingTerms.data.map(gt => (
                            <TableRow key={gt.id}>
                                <TableCell className="font-medium">{gt.name}</TableCell>
                                <TableCell>{gt.order}</TableCell>
                                <TableCell>{gt.weight}</TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-2">
                                        <Button variant="ghost" size="icon" onClick={() => onEdit(gt)}>
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                        <GradingTermDeleteContainer gradingTerm={gt} onConfirm={onDeleted} />
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
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
    );
};

