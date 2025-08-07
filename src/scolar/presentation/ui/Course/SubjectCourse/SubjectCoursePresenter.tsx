
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PaginatedResult } from "@/scolar/infrastructure/dto/paginateDto";
import { Course } from "@/scolar/domain/entities/course"
import { CourseSubject } from "@/scolar/domain/entities/course_subject";
import { Subject } from "@/scolar/domain/entities/subject";
import { AlertCircle, ArrowLeft, BookOpen, Check, ChevronRight, HelpCircle, Home, Info, Save, Search, ShieldCheck, Trash } from "lucide-react";
import { Link } from "react-router-dom";

interface SubjectCoursePresenterProps {
    course: Course;
    handleSubmit: () => void;
    isSubmitting: boolean;
    onBack: () => void;
    selectedSubjects: CourseSubject[];
    subjectList: PaginatedResult<Subject>
    onSearch: (searchTerm: string) => void;
    onPaginate: (page: number) => void;
    onAddSubject: (subject: Subject) => void;
    onChangeHours: (subject: CourseSubject) => void;
    onRemoveSubject: (subject: CourseSubject) => void;
}
export const SubjectCoursePresenter = ({
    course,
    handleSubmit,
    isSubmitting,
    onBack,
    subjectList,
    onSearch,
    onPaginate,
    selectedSubjects,
    onAddSubject,
    onChangeHours,
    onRemoveSubject
}: SubjectCoursePresenterProps) => {


    return (
        <div className="space-y-6">
            {/* Breadcrumbs */}
            <nav className="flex items-center text-sm text-muted-foreground">
                <Link to="/school" className="hover:text-foreground transition-colors">
                    <Home className="h-4 w-4" />
                    <span className="sr-only">Inicio</span>
                </Link>
                <ChevronRight className="h-4 w-4 mx-1" />
                <Link to="/school/cursos" className="hover:text-foreground transition-colors">
                    Cursos
                </Link>
                <ChevronRight className="h-4 w-4 mx-1" />
                <Link to={`/school/cursos/${course.id}`} className="hover:text-foreground transition-colors">
                    {course.name || "Curso"}
                </Link>
                <ChevronRight className="h-4 w-4 mx-1" />
                <span className="text-foreground font-medium">
                    Materias de {course.name || ""}
                </span>
            </nav>

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                        <BookOpen className="h-8 w-8 text-primary-500" />
                        {course.name || ""}
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        Completa los campos para crear un nuevo curso. Asegúrate de que toda la información sea correcta antes de guardar.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" onClick={() => onBack()} disabled={isSubmitting}>
                        Cancelar
                    </Button>
                    <Button
                        onClick={handleSubmit}

                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <>
                                <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-current border-t-transparent" />
                                Guardando...
                            </>
                        ) : (
                            <>
                                <Save className="mr-2 h-4 w-4" />
                                Guardar
                            </>
                        )}
                    </Button>
                </div>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Role Form */}
                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle>
                                Información del Curso
                            </CardTitle>
                            <CardDescription>
                                Completa los campos para definir el curso. Asegúrate de que toda la información sea correcta antes de guardar.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                            {
                               selectedSubjects.map((subject, index) => (
                                    
                                      <Alert className="h-full" key={index}>
                                      <BookOpen className="h-4 w-4" />
                                      <AlertTitle>
                                        {subject.subject?.name || "Materia sin nombre"}
                                           <button
                                           type="button"
                                            title="Eliminar materia del curso"
                                                  onClick={() => onRemoveSubject(subject)}
                                               className="absolute top-3 right-3 p-1 rounded-full hover:bg-primary-500 transition"
                                           >

                                               <Trash className="w-5 h-5 text-red-500 hover:text-white" />
                                           </button>
                                      </AlertTitle>
                                      <AlertDescription className="flex justify-between text-sm text-muted-foreground">
                                        {subject.subject?.description || "No hay descripción disponible para esta materia."}
                                       
                                      </AlertDescription>
                                      <div className="flex items-center justify-between mt-2">
                                      <Label>
                                        Horas por semana
                                      </Label>
                                       <Input
                                           type="time"
                                           value={subject.hoursPerWeek || 0}
                                           placeholder="Horas por semana"
                                           onChange={(e) => {
                                                  const updatedSubject = new CourseSubject(
                                                    subject.id,
                                                    subject.courseId,
                                                    subject.subjectId,
                                                    e.target.value,
                                                    subject.isRequired,
                                                    subject.course,
                                                    subject.subject
                                                  );
                                                  onChangeHours(updatedSubject);
                                           }}
                                       />
                                       </div>
                                    </Alert>
                                ))
                            }
                        </CardContent>
                        <CardFooter className="flex justify-between border-t pt-6">
                            <Button variant="outline" onClick={() => onBack()} disabled={isSubmitting}>
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Volver a Cursos
                            </Button>
                            <Button
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-current border-t-transparent" />
                                        Guardando...
                                    </>
                                ) : (
                                    <>
                                        <Save className="mr-2 h-4 w-4" />
                                        Guardar
                                    </>
                                )}
                            </Button>
                        </CardFooter>

                    </Card>



                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle>
                                Selecciona materias para {course.name || "Curso"}
                            </CardTitle>
                            <CardDescription>
                            Busca y selecciona las materias que deseas asignar a este curso. Puedes buscar por nombre o descripción.
                            </CardDescription>
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
                                        <TableHead>ID</TableHead>
                                        <TableHead>Nombre</TableHead>
                                        <TableHead>Descripción</TableHead>
                                        <TableHead className="text-right">Acciones</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {
                                        subjectList.data.map((subject, index) => (
                                            <TableRow key={subject.id}>
                                                <TableCell>
                                                    <span >{index + 1}</span>
                                                </TableCell>
                                                <TableCell>
                                                    <span >{subject.name}</span>
                                                </TableCell>
                                                <TableCell>
                                                    <span >{subject.description || "Sin descripción"}</span>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <Button
                                                        variant="secondary"
                                                        size="icon"
                                                       onClick={() => onAddSubject(subject)}
                                                    >
                                                        <Check className="h-4 w-4" />
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    }
                                </TableBody>
                            </Table>

                        </CardContent>
                        <CardFooter className="flex justify-center border-t pt-6">
                            <div className="mt-4 flex justify-end items-center gap-4">
                                <Pagination>
                                    <PaginationContent>


                                        <PaginationItem>
                                            <PaginationPrevious href="#"

                                                className={
                                                    subjectList.meta.prev ? "cursor-pointer" : "cursor-not-allowed"
                                                }
                                                onClick={() => onPaginate(subjectList.meta.currentPage - 1)}
                                            />
                                        </PaginationItem>

                                        {
                                            Array.from({ length: subjectList.meta.lastPage }, (_, i) => i + 1).map((page) => (
                                                <PaginationItem key={page}>
                                                    <PaginationLink href="#"
                                                        isActive={page === subjectList.meta.currentPage}
                                                        onClick={() => onPaginate(page)}
                                                    >{page}</PaginationLink>
                                                </PaginationItem>
                                            ))
                                        }

                                        <PaginationItem>
                                            <PaginationNext href="#"

                                                className={
                                                    subjectList.meta.next ? "cursor-pointer" : "cursor-not-allowed"
                                                }
                                                onClick={() => onPaginate(subjectList.meta.currentPage + 1)}
                                            />
                                        </PaginationItem>

                                    </PaginationContent>
                                </Pagination>
                            </div>
                        </CardFooter>
                    </Card>
                </div>

                {/* Right Column - Preview & Help */}
                <div className="space-y-6">
                    {/* Preview Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Vista Previa</CardTitle>
                            <CardDescription>
                                Vista previa del curso que estás creando. Asegúrate de que toda la información sea correcta antes de guardar.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <ShieldCheck className="h-5 w-5 text-primary-500" />
                                        <h3 className="font-medium">{course.name || "Nombre del curso"}</h3>
                                    </div>
                                    <Badge className="bg-accent-300 text-accent-800 hover:bg-accent-400 border-accent-500">Activo</Badge>
                                </div>


                                <div className="space-y-1">
                                    <p className="text-xs text-muted-foreground">
                                        Descripción
                                    </p>
                                    <p className="text-sm font-medium">
                                        {course.description || "Descripción del curso"}
                                    </p>
                                </div>

                                <div className="space-y-1">
                                    <p className="text-xs text-muted-foreground">
                                        Nivel
                                    </p>
                                    <p className="text-sm font-medium">
                                        {course.level?.name || "Nivel no seleccionado"}
                                    </p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-xs text-muted-foreground">
                                        Paralelos
                                    </p>
                                    <p className="text-sm font-medium">
                                        <Link to={`/cursos/${course.id}/paralelos`}
                                        className="text-primary-500 hover:underline"
                                        title="Ver paralelos del curso"
                                        >
                                        Ver paralelos
                                        </Link>
                                    </p>
                                </div>

                            </div>
                        </CardContent>
                    </Card>

                    {/* Help Card */}
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="flex items-center">
                                <Info className="h-4 w-4 mr-2 text-primary" />
                                Guía de Mejores Prácticas
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-3 text-sm">
                                <li className="flex items-start">
                                    <Check className="h-4 w-4 mr-2 text-primary mt-0.5" />
                                    <span>
                                        Utilice nombres descriptivos y claros para los cursos
                                    </span>
                                </li>
                                <li className="flex items-start">
                                    <Check className="h-4 w-4 mr-2 text-primary mt-0.5" />
                                    <span>
                                        Proporcione descripciones detalladas para cada curso
                                    </span>
                                </li>
                                <li className="flex items-start">
                                    <Check className="h-4 w-4 mr-2 text-primary mt-0.5" />
                                    <span>
                                        Asigne niveles adecuados a los cursos para facilitar la navegación
                                    </span>
                                </li>
                                <li className="flex items-start">
                                    <AlertCircle className="h-4 w-4 mr-2 text-destructive mt-0.5" />
                                    <span>
                                        Evite usar nombres genéricos o confusos para los cursos
                                    </span>
                                </li>
                            </ul>

                            <div className="mt-4 bg-blue-50 dark:bg-blue-900/20 p-3 rounded-md">
                                <div className="flex items-start">
                                    <HelpCircle className="h-4 w-4 text-blue-500 mr-2 mt-0.5" />
                                    <div className="text-xs">
                                        <p className="font-medium text-blue-700 dark:text-blue-300">¿Necesitas ayuda?</p>
                                        <p className="text-blue-600 dark:text-blue-400">
                                            Consulta la documentación de cursos para más información sobre mejores prácticas.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}