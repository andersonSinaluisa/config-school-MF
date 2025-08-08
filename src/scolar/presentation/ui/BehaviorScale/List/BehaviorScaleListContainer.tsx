import { useEffect, useRef, useState, useTransition } from "react";
import { useInjection } from "inversify-react";
import { PaginatedResult } from "@/scolar/infrastructure/dto/paginateDto";
import { BehaviorScale } from "@/scolar/domain/entities/behaviorScale";
import { toast } from "@/hooks/use-toast";
import { ListBehaviorScalesUseCase, ListBehaviorScalesCommand } from "@/scolar/application/useCases/behaviorScales/listBehaviorScalesUseCase";
import { BEHAVIOR_SCALE_LIST_USE_CASE } from "@/scolar/domain/symbols/BehaviorScaleSymbol";
import { BehaviorScaleListPresenter } from "./BehaviorScaleListPresenter";
import { useNavigate } from "react-router-dom";

export const BehaviorScaleListContainer = () => {
    const listUseCase = useInjection<ListBehaviorScalesUseCase>(BEHAVIOR_SCALE_LIST_USE_CASE);
    const [isPending, startTransition] = useTransition();
    const [command, setCommand] = useState({ page: 1, perPage: 10, where: '', orderBy: [] as string[] });
    const [result, setResult] = useState<PaginatedResult<BehaviorScale>>({
        data: [],
        meta: { currentPage: 1, lastPage: 1, next: null, perPage: 10, prev: null, total: 0 }
    });
    const debounceRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => { handleLoad(); }, [command]);

    const handleLoad = () => {
        startTransition(() => {
            listUseCase.execute(new ListBehaviorScalesCommand(command.page, command.perPage, command.orderBy, command.where)).then(res => {
                if (res.isRight()) {
                    setResult(res.extract() as PaginatedResult<BehaviorScale>);
                } else {
                    toast({ title: 'Error', description: 'Error al cargar', variant: 'destructive' });
                }
            });
        });
    };

    const navigate = useNavigate();
    const handleAdd = () => navigate('/escalas-comportamiento/nuevo');
    const handleEdit = (m: BehaviorScale) => navigate(`/escalas-comportamiento/${m.id}`);
    const handlePaginate = (page: number) => setCommand({ ...command, page });
    const handleSearch = (term: string) => {
        if (debounceRef.current) clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => setCommand({ ...command, where: term }), 300);
    };

    return (
        <BehaviorScaleListPresenter
            behaviorScales={result}
            onAdd={handleAdd}
            onEdit={handleEdit}
            onDelete={() => handleLoad()}
            onPaginate={handlePaginate}
            isPending={isPending}
            onSearch={handleSearch}
        />
    );
};
