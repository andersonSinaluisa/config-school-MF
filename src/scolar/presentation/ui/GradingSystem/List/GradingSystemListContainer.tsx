import { useEffect, useRef, useState, useTransition } from "react";
import { useInjection } from "inversify-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { PaginatedResult } from "@/scolar/infrastructure/dto/paginateDto";
import { GradingSystem } from "@/scolar/domain/entities/grading_system";
import { ListGradingSystemUseCase, ListGradingSystemCommand } from "@/scolar/application/useCases/gradingSystems/listGradingSystemUseCase";
import { GRADING_SYSTEM_LIST_USECASE } from "@/scolar/domain/symbols/GradingSystemSymbol";
import { GradingSystemListPresenter } from "./GradingSystemListPresenter";

export const GradingSystemListContainer = () => {
    const listGS = useInjection<ListGradingSystemUseCase>(GRADING_SYSTEM_LIST_USECASE);
    const [isPending, startTransition] = useTransition();
    const [command, setCommand] = useState({ page: 1, perPage: 10, where: '', orderBy: [] as string[] });
    const [result, setResult] = useState<PaginatedResult<GradingSystem>>({
        data: [],
        meta: { currentPage: 1, lastPage: 1, next: null, perPage: 10, prev: null, total: 0 }
    });
    const debounceRef = useRef<NodeJS.Timeout | null>(null);
    const navigate = useNavigate();

    const loadData = async () => {
        startTransition(async () => {
            const res = await listGS.execute(new ListGradingSystemCommand(command.page, command.perPage, command.orderBy, command.where));
            if (res.isLeft()) {
                toast({ title: 'Error', description: 'No se pudo cargar', variant: 'destructive' });
                return;
            }
            setResult(res.extract() as PaginatedResult<GradingSystem>);
        });
    };

    useEffect(() => { loadData(); }, [command]);

    const handleAdd = () => navigate('/sistemas-calificacion/nuevo');
    const handleEdit = (gs: GradingSystem) => navigate(`/sistemas-calificacion/${gs.id}`);
    const handlePaginate = (page: number) => setCommand({ ...command, page });
    const handleSearch = (term: string) => {
        if (debounceRef.current) clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => setCommand({ ...command, where: term }), 300);
    };
    const handleDeleted = () => loadData();

    return (
        <GradingSystemListPresenter
            gradingSystems={result}
            onAdd={handleAdd}
            onEdit={handleEdit}
            onDeleted={handleDeleted}
            onPaginate={handlePaginate}
            onSearch={handleSearch}
            isPending={isPending}
        />
    );
};

