import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { PaginatedResult } from "@/scolar/infrastructure/dto/paginateDto";
import { MeetingType } from "@/scolar/domain/entities/meetingType";
import { Edit, Plus, Search } from "lucide-react";
import { DeleteMeetingTypeContainer } from "../Delete/DeleteMeetingTypeContainer";

interface Props {
    meetingTypes: PaginatedResult<MeetingType>;
    onEdit: (m: MeetingType) => void;
    onDelete: (id: number) => void;
    onAdd: () => void;
    onPaginate: (page: number) => void;
    isPending?: boolean;
    onSearch: (term: string) => void;
}

export const MeetingTypeListPresenter = ({ meetingTypes, onEdit, onDelete, onAdd, onPaginate, isPending, onSearch }: Props) => {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Tipos de Reunión</CardTitle>
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
                            <TableHead>Nombre</TableHead>
                            <TableHead>Descripción</TableHead>
                            <TableHead className="text-right">Acciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isPending && (
                            <TableRow>
                                <TableCell colSpan={3}><Skeleton className="h-4 w-full" /></TableCell>
                                <TableCell colSpan={3}><Skeleton className="h-4 w-full" /></TableCell>
                                <TableCell colSpan={3}><Skeleton className="h-4 w-full" /></TableCell>
                            </TableRow>
                        )}
                        {meetingTypes.data.map((m) => (
                            <TableRow key={m.id}>
                                <TableCell className="font-medium">{m.name}</TableCell>
                                <TableCell>{m.description || '-'}</TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-2">
                                        <Button variant="ghost" size="icon" onClick={() => onEdit(m)}>
                                            <Edit className="h-4 w-4" />
                                            <span className="sr-only">Editar</span>
                                        </Button>
                                        <DeleteMeetingTypeContainer meetingType={m} onConfirm={() => onDelete(m.id)} />
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
                                <PaginationPrevious href="#" className={meetingTypes.meta.prev ? 'cursor-pointer' : 'cursor-not-allowed'} onClick={() => onPaginate(meetingTypes.meta.currentPage - 1)} />
                            </PaginationItem>
                            {Array.from({ length: meetingTypes.meta.lastPage }, (_, i) => i + 1).map((page) => (
                                <PaginationItem key={page}>
                                    <PaginationLink href="#" isActive={page === meetingTypes.meta.currentPage} onClick={() => onPaginate(page)}>
                                        {page}
                                    </PaginationLink>
                                </PaginationItem>
                            ))}
                            <PaginationItem>
                                <PaginationNext href="#" className={meetingTypes.meta.next ? 'cursor-pointer' : 'cursor-not-allowed'} onClick={() => onPaginate(meetingTypes.meta.currentPage + 1)} />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            </CardContent>
        </Card>
    );
};
