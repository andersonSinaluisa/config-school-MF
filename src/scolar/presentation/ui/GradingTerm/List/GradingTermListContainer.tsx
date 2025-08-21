import { useEffect, useRef, useState, useTransition } from "react";
import { useInjection } from "inversify-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { PaginatedResult } from "@/scolar/infrastructure/dto/paginateDto";
import { GradingTerm } from "@/scolar/domain/entities/grading_term";
import {
    ListGradingTermUseCase,
    ListGradingTermCommand,
} from "@/scolar/application/useCases/gradingTerms/listGradingTermUseCase";
import { GRADING_TERM_LIST_USECASE } from "@/scolar/domain/symbols/GradingTermSymbol";
import { GradingTermListPresenter } from "./GradingTermListPresenter";

export const GradingTermListContainer = () => {
    const listGT = useInjection<ListGradingTermUseCase>(GRADING_TERM_LIST_USECASE);
    const [isPending, startTransition] = useTransition();
    const [command, setCommand] = useState({ page: 1, perPage: 10, where: '', orderBy: [] as string[] });
    const [result, setResult] = useState<PaginatedResult<GradingTerm>>({
        data: [],
        meta: { currentPage: 1, lastPage: 1, next: null, perPage: 10, prev: null, total: 0 }
    });
    const debounceRef = useRef<NodeJS.Timeout | null>(null);
    const navigate = useNavigate();

    const loadData = async () => {
        startTransition(async () => {
            const res = await listGT.execute(new ListGradingTermCommand(command.page, command.perPage, command.orderBy, command.where));
            if (res.isLeft()) {
                toast({ title: 'Error', description: 'No se pudo cargar', variant: 'destructive' });
                return;
            }
            setResult(res.extract() as PaginatedResult<GradingTerm>);
        });
    };

    useEffect(() => { loadData(); }, [command]);

    const handleAdd = () => navigate('/terminos-calificacion/nuevo');
    const handlePaginate = (page: number) => setCommand({ ...command, page });
    const handleSearch = (term: string) => {
        if (debounceRef.current) clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => setCommand({ ...command, where: term }), 300);
    };
    const handleDeleted = () => loadData();
    
    const handleEdit = (id:string) => {
        navigate(`/terminos-calificacion/${id}/`);
    }
   
    return (
        <GradingTermListPresenter
            gradingTerms={result}
            onAdd={handleAdd}
            onDeleted={handleDeleted}
            onPaginate={handlePaginate}
            onSearch={handleSearch}
            isPending={isPending}   
            onEdit={handleEdit}
        />
    );
};

