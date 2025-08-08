import { useEffect, useRef, useState, useTransition } from "react";
import { useInjection } from "inversify-react";
import { PaginatedResult } from "@/scolar/infrastructure/dto/paginateDto";
import { AcademicPlanning } from "@/scolar/domain/entities/academicPlanning";
import { toast } from "@/hooks/use-toast";
import { ListAcademicPlanningsUseCase, ListAcademicPlanningsCommand } from "@/scolar/application/useCases/academicPlannings/listAcademicPlanningsUseCase";
import { ACADEMIC_PLANNING_LIST_USE_CASE } from "@/scolar/domain/symbols/AcademicPlanningSymbol";
import { AcademicPlanningListPresenter } from "./AcademicPlanningListPresenter";
import { useNavigate } from "react-router-dom";

export const AcademicPlanningListContainer = () => {
    const listUseCase = useInjection<ListAcademicPlanningsUseCase>(ACADEMIC_PLANNING_LIST_USE_CASE);
    const [isPending, startTransition] = useTransition();
    const [command, setCommand] = useState({ page: 1, perPage: 10, where: '', orderBy: [] as string[] });
    const [result, setResult] = useState<PaginatedResult<AcademicPlanning>>({
        data: [],
        meta: { currentPage: 1, lastPage: 1, next: null, perPage: 10, prev: null, total: 0 }
    });
    const debounceRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        handleLoad();
    }, [command]);

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
        />
    );
};
