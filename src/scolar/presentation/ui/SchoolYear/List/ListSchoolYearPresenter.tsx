
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { Skeleton } from "@/components/ui/skeleton"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { formatDate } from "@/lib/utils"
import { PaginatedResult } from "@/scolar/infrastructure/dto/paginateDto"
import { SchoolYear } from "@/scolar/domain/entities/school_year"
import { ChevronRight, Edit, Home, Plus } from "lucide-react"
import { DeleteSchoolYearContainer } from "../Delete/DeleteSchoolYearContainer"
import { Command, CommandInput } from "@/components/ui/command"
import { SearchSelect } from "@/components/ui/search-select"
import { Link } from "react-router-dom"

interface ListSchoolYearPresenterProps {
    schoolYears: PaginatedResult<SchoolYear>
    onAdd: () => void;
    onEdit: (schoolYear: SchoolYear) => void;
    onDelete: (data: SchoolYear) => void;
    onPaginate: (page: number) => void;
    isPending: boolean;
    onSearch: (searchTerm: string) => void;
    status?: string;
    onStatusChange: (value: string | number) => void;
    onClearFilters: () => void;
}
export const ListSchoolYearPresenter = ({ schoolYears, onAdd, onEdit, onDelete, onPaginate, isPending, onSearch, status, onStatusChange, onClearFilters }: ListSchoolYearPresenterProps) => {
    const statusOptions = [
        { value: 'active', label: 'Activo' },
        { value: 'inactive', label: 'Inactivo' },
        { value: 'archived', label: 'Finalizado' }
    ];
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
                    <div className="mb-4 flex flex-col md:flex-row md:items-center gap-2">
                        <Command className="rounded-lg border md:flex-1">
                            <CommandInput placeholder="Buscar..." onValueChange={onSearch} />
                        </Command>
                        <SearchSelect
                            options={statusOptions}
                            value={status}
                            onChange={onStatusChange}
                            placeholder="Estado"
                        />
                        <Button variant="outline" onClick={onClearFilters}>Limpiar filtros</Button>
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