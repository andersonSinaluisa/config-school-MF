import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { PaginatedResult } from "@/scolar/infrastructure/dto/paginateDto";
import { AttendanceCode } from "@/scolar/domain/entities/attendanceCode";
import { Edit, Plus, Search } from "lucide-react";
import { DeleteAttendanceCodeContainer } from "../Delete/DeleteAttendanceCodeContainer";

interface Props {
    attendanceCodes: PaginatedResult<AttendanceCode>;
    onEdit: (m: AttendanceCode) => void;
    onDelete: (id: number) => void;
    onAdd: () => void;
    onPaginate: (page: number) => void;
    isPending?: boolean;
    onSearch: (term: string) => void;
}

export const AttendanceCodeListPresenter = ({ attendanceCodes, onEdit, onDelete, onAdd, onPaginate, isPending, onSearch }: Props) => (
    <Card>
        <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Códigos de Asistencia</CardTitle>
            <Button onClick={onAdd} size="sm"><Plus className="h-4 w-4 mr-2" /> Nuevo</Button>
        </CardHeader>
        <CardContent>
            <div className="relative flex-1 mb-4">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Buscar..." className="pl-9" onChange={(e) => onSearch(e.target.value)} />
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Código</TableHead>
                        <TableHead>Descripción</TableHead>
                        <TableHead>Afecta nota</TableHead>
                        <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {isPending && (
                        <TableRow>
                            <TableCell colSpan={4}><Skeleton className="h-4 w-full" /></TableCell>
                            <TableCell colSpan={4}><Skeleton className="h-4 w-full" /></TableCell>
                            <TableCell colSpan={4}><Skeleton className="h-4 w-full" /></TableCell>
                            <TableCell colSpan={4}><Skeleton className="h-4 w-full" /></TableCell>
                        </TableRow>
                    )}
                    {attendanceCodes.data.map((m) => (
                        <TableRow key={m.id}>
                            <TableCell className="font-medium">{m.code}</TableCell>
                            <TableCell>{m.description || '-'}</TableCell>
                            <TableCell>{m.affectsGrade ? 'Sí' : 'No'}</TableCell>
                            <TableCell className="text-right">
                                <div className="flex justify-end gap-2">
                                    <Button variant="ghost" size="icon" onClick={() => onEdit(m)}>
                                        <Edit className="h-4 w-4" />
                                    </Button>
                                    <DeleteAttendanceCodeContainer attendanceCode={m} onConfirm={() => onDelete(m.id)} />
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
                            <PaginationPrevious href="#" className={attendanceCodes.meta.prev ? 'cursor-pointer' : 'cursor-not-allowed'} onClick={() => onPaginate(attendanceCodes.meta.currentPage - 1)} />
                        </PaginationItem>
                        {Array.from({ length: attendanceCodes.meta.lastPage }, (_, i) => i + 1).map((page) => (
                            <PaginationItem key={page}>
                                <PaginationLink href="#" isActive={page === attendanceCodes.meta.currentPage} onClick={() => onPaginate(page)}>{page}</PaginationLink>
                            </PaginationItem>
                        ))}
                        <PaginationItem>
                            <PaginationNext href="#" className={attendanceCodes.meta.next ? 'cursor-pointer' : 'cursor-not-allowed'} onClick={() => onPaginate(attendanceCodes.meta.currentPage + 1)} />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </CardContent>
    </Card>
);
