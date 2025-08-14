import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Command, CommandInput } from "@/components/ui/command";
import { SearchSelect } from "@/components/ui/search-select";
import { PaginatedResult } from "@/scolar/infrastructure/dto/paginateDto";
import { AcademicPlanning } from "@/scolar/domain/entities/academicPlanning";
import { Course } from "@/scolar/domain/entities/course";
import { Parallel } from "@/scolar/domain/entities/parallel";
import { Subject } from "@/scolar/domain/entities/subject";
import { SchoolYear } from "@/scolar/domain/entities/school_year";
import { Edit, Plus } from "lucide-react";
import { format, parseISO } from "date-fns";
import { DeleteAcademicPlanningContainer } from "../Delete/DeleteAcademicPlanningContainer";

interface Props {
    plannings: PaginatedResult<AcademicPlanning>;
    onEdit: (m: AcademicPlanning) => void;
    onDelete: (id: number) => void;
    onAdd: () => void;
    onPaginate: (page: number) => void;
    isPending?: boolean;
    onSearch: (term: string) => void;
    courses: Course[];
    parallels: Parallel[];
    subjects: Subject[];
    schoolYears: SchoolYear[];
    onCourseChange: (value: string | number) => void;
    onParallelChange: (value: string | number) => void;
    onSchoolYearChange: (value: string | number) => void;
    onSubjectChange: (value: string | number) => void;
    onClearFilters: () => void;
}

export const AcademicPlanningListPresenter = ({ plannings, onEdit, onDelete, onAdd, onPaginate, isPending, onSearch, courses, parallels, subjects, schoolYears, onCourseChange, onParallelChange, onSchoolYearChange, onSubjectChange, onClearFilters }: Props) => {
    const getCourseName = (id: number) => courses.find(c => c.id === id)?.name || '';
    const getParallelName = (id: number) => parallels.find(p => p.id === id)?.name || '';
    const getSubjectName = (id: number) => subjects.find(s => s.id === id)?.name || '';
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Planificaciones Académicas</CardTitle>
                <Button onClick={onAdd} size="sm">
                    <Plus className="h-4 w-4 mr-2" /> Nuevo
                </Button>
            </CardHeader>
            <CardContent>
                <div className="mb-4 flex flex-col md:grid md:grid-cols-5 gap-2">
                    <Command className="rounded-lg border md:col-span-2">
                        <CommandInput placeholder="Buscar..." onValueChange={onSearch} />
                    </Command>
                    <SearchSelect options={courses.map(c => ({ value: c.id, label: c.name }))} onChange={onCourseChange} placeholder="Curso" />
                    <SearchSelect options={parallels.map(p => ({ value: p.id, label: p.name }))} onChange={onParallelChange} placeholder="Paralelo" />
                    <SearchSelect options={schoolYears.map(s => ({ value: s.id, label: s.name }))} onChange={onSchoolYearChange} placeholder="Año lectivo" />
                    <SearchSelect options={subjects.map(s => ({ value: s.id, label: s.name }))} onChange={onSubjectChange} placeholder="Materia" />
                    <Button variant="outline" onClick={onClearFilters} className="md:col-span-1">Limpiar filtros</Button>
                </div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Curso</TableHead>
                            <TableHead>Paralelo</TableHead>
                            <TableHead>Materia</TableHead>
                            <TableHead>Tema</TableHead>
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
                        {plannings.data.map((m) => (
                            <TableRow key={m.id}>
                                <TableCell className="font-medium">{getCourseName(m.courseId)}</TableCell>
                                <TableCell>{getParallelName(m.parallelId)}</TableCell>
                                <TableCell>{getSubjectName(m.subjectId)}</TableCell>
                                <TableCell>{m.topic}</TableCell>
                                <TableCell>{format(parseISO(m.startDate), 'dd/MM/yyyy')}</TableCell>
                                <TableCell>{format(parseISO(m.endDate), 'dd/MM/yyyy')}</TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-2">
                                        <Button variant="ghost" size="icon" onClick={() => onEdit(m)}>
                                            <Edit className="h-4 w-4" />
                                            <span className="sr-only">Editar</span>
                                        </Button>
                                        <DeleteAcademicPlanningContainer planning={m} onConfirm={() => onDelete(m.id)} />
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
                                <PaginationPrevious href="#" className={plannings.meta.prev ? 'cursor-pointer' : 'cursor-not-allowed'} onClick={() => onPaginate(plannings.meta.currentPage - 1)} />
                            </PaginationItem>
                            {Array.from({ length: plannings.meta.lastPage }, (_, i) => i + 1).map((page) => (
                                <PaginationItem key={page}>
                                    <PaginationLink href="#" isActive={page === plannings.meta.currentPage} onClick={() => onPaginate(page)}>
                                        {page}
                                    </PaginationLink>
                                </PaginationItem>
                            ))}
                            <PaginationItem>
                                <PaginationNext href="#" className={plannings.meta.next ? 'cursor-pointer' : 'cursor-not-allowed'} onClick={() => onPaginate(plannings.meta.currentPage + 1)} />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            </CardContent>
        </Card>
    );
};
