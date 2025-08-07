import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { Skeleton } from "@/components/ui/skeleton"
import { TableBody, TableCell, TableHead, TableHeader, TableRow, Table } from "@/components/ui/table"
import { formatDate } from "@/lib/utils"
import { PaginatedResult } from "@/scolar/infrastructure/dto/paginateDto"
import { Parallel } from "@/scolar/domain/entities/parallel"
import { Edit, Plus, Search,  } from "lucide-react"

interface ListParallelPresenterProps {
    onAdd: () => void
    onEdit: (parallel: Parallel) => void
    parallels: PaginatedResult<Parallel>
    isPending?: boolean
    onPaginate: (page: number) => void
    onSearch: (searchTerm: string) => void
}

export const ListParallelPresenter = ({
    parallels,
    onAdd,
    onEdit,
    isPending = false,
    onPaginate,
    onSearch,
}: ListParallelPresenterProps) => {
    
    

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>
                    Paralelos
                </CardTitle>
                <Button onClick={onAdd} size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Nuevo
                </Button>
            </CardHeader>
            <CardContent>
                <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input type="search" placeholder="Buscar Cursos..." className="pl-9"
                        onChange={(e) => onSearch(e.target.value)}
                    />
                </div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>
                                Nombre
                            </TableHead>
                            <TableHead>
                                Periodo escolar
                            </TableHead>
                            <TableHead>
                                Curso
                            </TableHead>
                            <TableHead>
                                Capacidad
                            </TableHead>
                            <TableHead>
                                Jornada
                            </TableHead>
                            <TableHead className="text-right">
                                Acciones
                            </TableHead>
                            
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
                        {parallels.data
                            .map((level) => (
                                <TableRow key={level.id}>
                                    <TableCell>{level.name}</TableCell>
                                    <TableCell>
                                        {`${formatDate(level.schoolYear?.startDate||new Date())} 
                                        - ${formatDate(level.schoolYear?.endDate||new Date())}`}
                                        
                                    </TableCell>
                                    <TableCell className="font-medium">
                                        {level.course?.name}
                                    </TableCell>
                                    <TableCell className="font-medium">
                                        
                                        <Badge variant="secondary" className="ml-2">
                                            {level.capacity}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="font-medium">
                                            {level.section?.name.toUpperCase() || "N/A"}

                                       
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button variant="ghost" size="icon" onClick={() => onEdit(level)}>
                                                <Edit className="h-4 w-4" />
                                                <span className="sr-only">Editar</span>
                                            </Button>
                                            
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
                                        parallels.meta.prev ? "cursor-pointer" : "cursor-not-allowed"
                                    }
                                    onClick={() => onPaginate(parallels.meta.currentPage - 1)}
                                />
                            </PaginationItem>

                            {
                                Array.from({ length: parallels.meta.lastPage }, (_, i) => i + 1).map((page) => (
                                    <PaginationItem key={page}>
                                        <PaginationLink href="#"
                                            isActive={page === parallels.meta.currentPage}
                                            onClick={() => onPaginate(page)}
                                        >{page}</PaginationLink>
                                    </PaginationItem>
                                ))
                            }

                            <PaginationItem>
                                <PaginationNext href="#"

                                    className={
                                        parallels.meta.next ? "cursor-pointer" : "cursor-not-allowed"
                                    }
                                    onClick={() => onPaginate(parallels.meta.currentPage + 1)}
                                />
                            </PaginationItem>

                        </PaginationContent>
                    </Pagination>
                </div>
            </CardContent>
        </Card>
    )
}