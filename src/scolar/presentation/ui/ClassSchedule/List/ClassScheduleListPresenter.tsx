import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { PaginatedResult } from "@/scolar/infrastructure/dto/paginateDto";
import { ClassSchedule } from "@/scolar/domain/entities/classSchedule";
import { Edit, Plus, Search } from "lucide-react";
import { DeleteClassScheduleContainer } from "../Delete/DeleteClassScheduleContainer";

interface Props {
    schedules: PaginatedResult<ClassSchedule>;
    onEdit: (m: ClassSchedule) => void;
    onDelete: (id: number) => void;
    onAdd: () => void;
    onPaginate: (page: number) => void;
    isPending?: boolean;
    onSearch: (term: string) => void;
}

export const ClassScheduleListPresenter = ({ schedules, onEdit, onDelete, onAdd, onPaginate, isPending, onSearch }: Props) => {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Horarios de Clase</CardTitle>
                <Button onClick={onAdd} size="sm">
                    <Plus className="h-4 w-4 mr-2" /> Nuevo
                </Button>
            </CardHeader>
            <CardContent>
                <div className="relative flex-1 mb-4">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input type="search" placeholder="Buscar..." className="pl-9" onChange={(e) => onSearch(e.target.value)} />
                </div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Curso</TableHead>
                            <TableHead>Paralelo</TableHead>
                            <TableHead>Día</TableHead>
                            <TableHead>Inicio</TableHead>
                            <TableHead>Fin</TableHead>
                            <TableHead className="text-right">Acciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isPending && (
                            <TableRow>
                                {Array.from({ length: 6 }).map((_, i) => (
                                    <TableCell key={i}><Skeleton className="h-4 w-full" /></TableCell>
                                ))}
                            </TableRow>
                        )}
                        {schedules.data.map((m) => (
                            <TableRow key={m.id}>
                                <TableCell className="font-medium">{m.courseId}</TableCell>
                                <TableCell>{m.parallelId}</TableCell>
                                <TableCell>{m.dayOfWeek}</TableCell>
                                <TableCell>{m.startTime}</TableCell>
                                <TableCell>{m.endTime}</TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-2">
                                        <Button variant="ghost" size="icon" onClick={() => onEdit(m)}>
                                            <Edit className="h-4 w-4" />
                                            <span className="sr-only">Editar</span>
                                        </Button>
                                        <DeleteClassScheduleContainer schedule={m} onConfirm={() => onDelete(m.id)} />
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
                                <PaginationPrevious href="#" className={schedules.meta.prev ? 'cursor-pointer' : 'cursor-not-allowed'} onClick={() => onPaginate(schedules.meta.currentPage - 1)} />
                            </PaginationItem>
                            {Array.from({ length: schedules.meta.lastPage }, (_, i) => i + 1).map((page) => (
                                <PaginationItem key={page}>
                                    <PaginationLink href="#" isActive={page === schedules.meta.currentPage} onClick={() => onPaginate(page)}>
                                        {page}
                                    </PaginationLink>
                                </PaginationItem>
                            ))}
                            <PaginationItem>
                                <PaginationNext href="#" className={schedules.meta.next ? 'cursor-pointer' : 'cursor-not-allowed'} onClick={() => onPaginate(schedules.meta.currentPage + 1)} />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            </CardContent>
        </Card>
    );
};
