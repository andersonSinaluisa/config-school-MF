import { useEffect, useRef, useState, useTransition } from "react";
import { useInjection } from "inversify-react";
import { PaginatedResult } from "@/scolar/infrastructure/dto/paginateDto";
import { ClassSchedule } from "@/scolar/domain/entities/classSchedule";
import { toast } from "@/hooks/use-toast";
import { ListClassSchedulesUseCase, ListClassSchedulesCommand } from "@/scolar/application/useCases/classSchedules/listClassSchedulesUseCase";
import { CLASS_SCHEDULE_LIST_USE_CASE } from "@/scolar/domain/symbols/ClassScheduleSymbol";
import { ClassScheduleListPresenter } from "./ClassScheduleListPresenter";
import { useNavigate } from "react-router-dom";

export const ClassScheduleListContainer = () => {
    const listUseCase = useInjection<ListClassSchedulesUseCase>(CLASS_SCHEDULE_LIST_USE_CASE);
    const [isPending, startTransition] = useTransition();
    const [command, setCommand] = useState({ page: 1, perPage: 10, where: '', orderBy: [] as string[] });
    const [result, setResult] = useState<PaginatedResult<ClassSchedule>>({
        data: [],
        meta: { currentPage: 1, lastPage: 1, next: null, perPage: 10, prev: null, total: 0 }
    });
    const debounceRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        handleLoad();
    }, [command]);

    const handleLoad = () => {
        startTransition(() => {
            listUseCase.execute(new ListClassSchedulesCommand(command.page, command.perPage, command.orderBy, command.where)).then(res => {
                if (res.isRight()) {
                    setResult(res.extract() as PaginatedResult<ClassSchedule>);
                } else {
                    toast({ title: 'Error', description: 'Error al cargar', variant: 'destructive' });
                }
            });
        });
    };

    const navigate = useNavigate();
    const handleAdd = () => navigate('/horarios-clase/nuevo');
    const handleEdit = (m: ClassSchedule) => navigate(`/horarios-clase/${m.id}`);
    const handlePaginate = (page: number) => setCommand({ ...command, page });
    const handleSearch = (term: string) => {
        if (debounceRef.current) clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => setCommand({ ...command, where: term }), 300);
    };

    return (
        <ClassScheduleListPresenter
            schedules={result}
            onAdd={handleAdd}
            onEdit={handleEdit}
            onDelete={() => handleLoad()}
            onPaginate={handlePaginate}
            isPending={isPending}
            onSearch={handleSearch}
        />
    );
};
