
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { Skeleton } from "@/components/ui/skeleton"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { formatDate } from "@/lib/utils"
import { PaginatedResult } from "@/scolar/infrastructure/dto/paginateDto"
import { SchoolYear } from "@/scolar/domain/entities/school_year"
import { ChevronRight, Edit, Home, Plus, Search } from "lucide-react"
import { DeleteSchoolYearContainer } from "../Delete/DeleteSchoolYearContainer"
import { Input } from "@/components/ui/input"
import { Link } from "react-router-dom"

interface ListSchoolYearPresenterProps {
    schoolYears: PaginatedResult<SchoolYear>
    onAdd: () => void;
    onEdit: (schoolYear: SchoolYear) => void;
    onDelete: (data: SchoolYear) => void;
    onPaginate: (page: number) => void;
    isPending: boolean;
    onSearch: (searchTerm: string) => void;
}
export const ListSchoolYearPresenter = ({ schoolYears, onAdd, onEdit, onDelete, onPaginate, isPending, onSearch }: ListSchoolYearPresenterProps) => {
    return (
        <div className="space-y-6">

            <nav className="flex items-center text-sm text-muted-foreground">
                <Link to="/admin" className="hover:text-foreground transition-colors">
                    <Home className="h-4 w-4" />
                    <span className="sr-only">Inicio</span>
                </Link>
                <ChevronRight className="h-4 w-4 mx-1" />
                <Link to="/admin/roles" className="hover:text-foreground transition-colors">
                    Periodos Escolares
                </Link>
                <ChevronRight className="h-4 w-4 mx-1" />
                <span className="text-foreground font-medium">
                    Lista de Años Escolares
                </span>
            </nav>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Años Escolares</CardTitle>
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
                    {schoolYears.data.length === 0 ? (
                        <div className="text-center py-6 text-muted-foreground">No hay años escolares registrados</div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Nombre</TableHead>
                                    <TableHead>Fecha Inicio</TableHead>
                                    <TableHead>Fecha Fin</TableHead>
                                    <TableHead>Estado</TableHead>
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
                                            <TableCell colSpan={4}>
                                                <Skeleton className="h-4 w-full" />
                                            </TableCell>
                                        </TableRow>

                                    )
                                }
                                {schoolYears.data.map((schoolYear) => (
                                    <TableRow key={schoolYear.id}>
                                        <TableCell className="font-medium">{schoolYear.name}</TableCell>
                                        <TableCell>{formatDate(schoolYear.startDate)}</TableCell>
                                        <TableCell>{formatDate(schoolYear.endDate)}</TableCell>
                                        <TableCell>{schoolYear.status}</TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button variant="ghost" size="icon" onClick={() => onEdit(schoolYear)}>
                                                    <Edit className="h-4 w-4" />
                                                    <span className="sr-only">Editar</span>
                                                </Button>
                                                <DeleteSchoolYearContainer
                                                course={schoolYear}
                                                onConfirm={() => onDelete(schoolYear)}
                                                
                                                />
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                    <div className="mt-4 flex justify-end items-center gap-4">
                        <Pagination>
                            <PaginationContent>


                                <PaginationItem>
                                    <PaginationPrevious href="#"

                                        className={
                                            schoolYears.meta.prev ? "cursor-pointer" : "cursor-not-allowed"
                                        }
                                        onClick={() => onPaginate(schoolYears.meta.currentPage - 1)}
                                    />
                                </PaginationItem>

                                {
                                    Array.from({ length: schoolYears.meta.lastPage }, (_, i) => i + 1).map((page) => (
                                        <PaginationItem key={page}>
                                            <PaginationLink href="#"
                                                isActive={page === schoolYears.meta.currentPage}
                                                onClick={() => onPaginate(page)}
                                            >{page}</PaginationLink>
                                        </PaginationItem>
                                    ))
                                }

                                <PaginationItem>
                                    <PaginationNext href="#"

                                        className={
                                            schoolYears.meta.next ? "cursor-pointer" : "cursor-not-allowed"
                                        }
                                        onClick={() => onPaginate(schoolYears.meta.currentPage + 1)}
                                    />
                                </PaginationItem>

                            </PaginationContent>
                        </Pagination>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}