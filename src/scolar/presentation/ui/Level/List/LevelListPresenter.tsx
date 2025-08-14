import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { Skeleton } from "@/components/ui/skeleton"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PaginatedResult } from "@/scolar/infrastructure/dto/paginateDto"
import { Level } from "@/scolar/domain/entities/level"
import { Edit, Plus, Search } from "lucide-react"
import { DeleteLevelContainer } from "../Delete/DeleteLevelContainer"
import { Input } from "@/components/ui/input"

interface LevelListProps {
    levels: PaginatedResult<Level>
    onEdit: (level: Level) => void
    onDelete: (id: number) => void
    onAdd: () => void
    onPaginate: (page: number) => void
    isPending?: boolean
    onSearch: (searchTerm: string) => void
}

export const LevelListPresenter = ({ levels, onEdit, onDelete, onAdd, isPending, onPaginate, onSearch }: LevelListProps) => {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Niveles Educativos</CardTitle>
                <Button onClick={onAdd} size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Nuevo
                </Button>
            </CardHeader>
            <CardContent>
                <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input type="search" placeholder="Buscar niveles..." className="pl-9"
                        onChange={(e) => onSearch(e.target.value)}
                    />
                </div>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Orden</TableHead>
                                <TableHead>Nombre</TableHead>
                                <TableHead>Descripción</TableHead>
                                <TableHead className="text-right">Acciones</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                isPending && (
                                    <TableRow>
                                        <TableCell colSpan={4}>
                                            <Skeleton className="h-4 w-full" />
                                        </TableCell>
                                        <TableCell colSpan={4}>
                                            <Skeleton className="h-4 w-full" />
                                        </TableCell>
                                        <TableCell colSpan={4}>
                                            <Skeleton className="h-4 w-full" />
                                        </TableCell>
                                        <TableCell colSpan={4}>
                                            <Skeleton className="h-4 w-full" />
                                        </TableCell>
                                    </TableRow>

                                )
                            }
                            {levels.data
                                .map((level) => (
                                    <TableRow key={level.id}>
                                        <TableCell>{level.order}</TableCell>
                                        <TableCell className="font-medium">{level.name}</TableCell>
                                        <TableCell>{level.description || "-"}</TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button variant="ghost" size="icon" onClick={() => onEdit(level)}>
                                                    <Edit className="h-4 w-4" />
                                                    <span className="sr-only">Editar</span>
                                                </Button>
                                                <DeleteLevelContainer 
                                                level={level}
                                                onConfirm={() => onDelete(level.id)}
                                                />
                                                   
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
                                <PaginationPrevious href="#"

                                    className={
                                        levels.meta.prev ? "cursor-pointer" : "cursor-not-allowed"
                                    }
                                    onClick={() => onPaginate(levels.meta.currentPage - 1)}
                                />
                            </PaginationItem>

                            {
                                Array.from({ length: levels.meta.lastPage }, (_, i) => i + 1).map((page) => (
                                    <PaginationItem key={page}>
                                        <PaginationLink href="#"
                                            isActive={page === levels.meta.currentPage}
                                            onClick={() => onPaginate(page)}
                                        >{page}</PaginationLink>
                                    </PaginationItem>
                                ))
                            }

                            <PaginationItem>
                                <PaginationNext href="#"

                                    className={
                                        levels.meta.next ? "cursor-pointer" : "cursor-not-allowed"
                                    }
                                    onClick={() => onPaginate(levels.meta.currentPage + 1)}
                                />
                            </PaginationItem>

                        </PaginationContent>
                    </Pagination>
                </div>
            </CardContent>
        </Card>
    )
}