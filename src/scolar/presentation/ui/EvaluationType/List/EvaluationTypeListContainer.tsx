import { useEffect, useState, useTransition, useRef } from "react";
import { useInjection } from "inversify-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { PaginatedResult } from "@/scolar/infrastructure/dto/paginateDto";
import { EvaluationType } from "@/scolar/domain/entities/evaluation_type";
import { ListEvaluationTypeUseCase, ListEvaluationTypeCommand } from "@/scolar/application/useCases/evaluationTypes/listEvaluationTypeUseCase";
import { EVALUATION_TYPE_LIST_USECASE } from "@/scolar/domain/symbols/EvaluationTypeSymbol";
import { EvaluationTypeListPresenter } from "./EvaluationTypeListPresenter";

export const EvaluationTypeListContainer = () => {
    const listEvalTypes = useInjection<ListEvaluationTypeUseCase>(EVALUATION_TYPE_LIST_USECASE);
    const [isPending, startTransition] = useTransition();
    const [command, setCommand] = useState({ page: 1, perPage: 10, where: '', orderBy: [] as string[] });
    const [result, setResult] = useState<PaginatedResult<EvaluationType>>({
        data: [],
        meta: { currentPage: 1, lastPage: 1, next: null, perPage: 10, prev: null, total: 0 }
    });
    const debounceRef = useRef<NodeJS.Timeout | null>(null);
    const navigate = useNavigate();

    const loadData = async () => {
        startTransition(async () => {
            const res = await listEvalTypes.execute(new ListEvaluationTypeCommand(command.page, command.perPage, command.orderBy, command.where));
            if (res.isLeft()) {
                toast({ title: 'Error', description: 'No se pudo cargar', variant: 'destructive' });
                return;
            }
            setResult(res.extract() as PaginatedResult<EvaluationType>);
        });
    };

    useEffect(() => { loadData(); }, [command]);

    const handleAdd = () => navigate('/tipos-evaluacion/nuevo');
    const handleEdit = (et: EvaluationType) => navigate(`/tipos-evaluacion/${et.id}`);

    const handlePaginate = (page: number) => setCommand({ ...command, page });

    const handleSearch = (term: string) => {
        if (debounceRef.current) clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => setCommand({ ...command, where: term }), 300);
    };

    const handleDeleted = () => loadData();

    return (
        <EvaluationTypeListPresenter
            evaluationTypes={result}
            onAdd={handleAdd}
            onEdit={handleEdit}
            onDeleted={handleDeleted}
            isPending={isPending}
            onPaginate={handlePaginate}
            onSearch={handleSearch}
        />
    );
};

