import { useEffect, useRef, useState, useTransition } from "react";
import { useInjection } from "inversify-react";
import { PaginatedResult } from "@/scolar/infrastructure/dto/paginateDto";
import { AcademicPlanning } from "@/scolar/domain/entities/academicPlanning";
import { Course } from "@/scolar/domain/entities/course";
import { Parallel } from "@/scolar/domain/entities/parallel";
import { Subject } from "@/scolar/domain/entities/subject";
import { toast } from "@/hooks/use-toast";
import { ListAcademicPlanningsUseCase, ListAcademicPlanningsCommand } from "@/scolar/application/useCases/academicPlannings/listAcademicPlanningsUseCase";
import { ACADEMIC_PLANNING_LIST_USE_CASE } from "@/scolar/domain/symbols/AcademicPlanningSymbol";
import { AcademicPlanningListPresenter } from "./AcademicPlanningListPresenter";
import { useNavigate } from "react-router-dom";
import { COURSE_LIST_USECASE } from "@/scolar/domain/symbols/CourseSymbol";
import { PARALLEL_LIST_USECASE } from "@/scolar/domain/symbols/ParallelSymbol";
import { SUBJECT_LIST_USE_CASE } from "@/scolar/domain/symbols/SubjectSymbol";
import { ListCoursesUseCase, ListCoursesCommand } from "@/scolar/application/useCases/courses/listCoursesUseCase";
import { ListParallelUseCase, ListParallelUseCaseCommand } from "@/scolar/application/useCases/parallels/listParallelUseCase";
import { ListSubjectUseCase, ListSubjectCommand } from "@/scolar/application/useCases/subjects/listSubjectsUseCase";
import { PaginatedResult } from "@/scolar/infrastructure/dto/paginateDto";

export const AcademicPlanningListContainer = () => {
    const listUseCase = useInjection<ListAcademicPlanningsUseCase>(ACADEMIC_PLANNING_LIST_USE_CASE);
    const listCourses = useInjection<ListCoursesUseCase>(COURSE_LIST_USECASE);
    const listParallels = useInjection<ListParallelUseCase>(PARALLEL_LIST_USECASE);
    const listSubjects = useInjection<ListSubjectUseCase>(SUBJECT_LIST_USE_CASE);
    const [isPending, startTransition] = useTransition();
    const [command, setCommand] = useState({ page: 1, perPage: 10, where: '', orderBy: [] as string[] });
    const [result, setResult] = useState<PaginatedResult<AcademicPlanning>>({
        data: [],
        meta: { currentPage: 1, lastPage: 1, next: null, perPage: 10, prev: null, total: 0 }
    });
    const [courses, setCourses] = useState<Course[]>([]);
    const [parallels, setParallels] = useState<Parallel[]>([]);
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const debounceRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        handleLoad();
    }, [command]);

    useEffect(() => {
        listCourses.execute(new ListCoursesCommand(1, 100, ["id"]))
            .then(res => res.isRight() && setCourses((res.extract() as PaginatedResult<Course>).data));
        listParallels.execute(new ListParallelUseCaseCommand(1, 100, ["id"]))
            .then(res => res.isRight() && setParallels((res.extract() as PaginatedResult<Parallel>).data));
        listSubjects.execute(new ListSubjectCommand(1, 100, ["id"]))
            .then(res => res.isRight() && setSubjects((res.extract() as PaginatedResult<Subject>).data));
    }, [listCourses, listParallels, listSubjects]);

    const handleLoad = () => {
        startTransition(() => {
            listUseCase.execute(new ListAcademicPlanningsCommand(command.page, command.perPage, command.orderBy, command.where)).then(res => {
                if (res.isRight()) {
                    setResult(res.extract() as PaginatedResult<AcademicPlanning>);
                } else {
                    toast({ title: 'Error', description: 'Error al cargar', variant: 'destructive' });
                }
            });
        });
    };

    const navigate = useNavigate();
    const handleAdd = () => navigate('/planificaciones-academicas/nuevo');
    const handleEdit = (m: AcademicPlanning) => navigate(`/planificaciones-academicas/${m.id}`);
    const handlePaginate = (page: number) => setCommand({ ...command, page });
    const handleSearch = (term: string) => {
        if (debounceRef.current) clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => setCommand({ ...command, where: term }), 300);
    };

    return (
        <AcademicPlanningListPresenter
            plannings={result}
            onAdd={handleAdd}
            onEdit={handleEdit}
            onDelete={() => handleLoad()}
            onPaginate={handlePaginate}
            isPending={isPending}
            onSearch={handleSearch}
            courses={courses}
            parallels={parallels}
            subjects={subjects}
        />
    );
};
