import { useEffect, useRef, useState, useTransition } from "react";
import { useInjection } from "inversify-react";
import { PaginatedResult } from "@/scolar/infrastructure/dto/paginateDto";
import { MeetingType } from "@/scolar/domain/entities/meetingType";
import { toast } from "@/hooks/use-toast";
import { ListMeetingTypesUseCase, ListMeetingTypesCommand } from "@/scolar/application/useCases/meetingTypes/listMeetingTypesUseCase";
import { MEETING_TYPE_LIST_USE_CASE } from "@/scolar/domain/symbols/MeetingTypeSymbol";
import { MeetingTypeListPresenter } from "./MeetingTypeListPresenter";
import { useNavigate } from "react-router-dom";

export const MeetingTypeListContainer = () => {
    const listUseCase = useInjection<ListMeetingTypesUseCase>(MEETING_TYPE_LIST_USE_CASE);
    const [isPending, startTransition] = useTransition();
    const [command, setCommand] = useState({ page: 1, perPage: 10, where: '', orderBy: [] as string[] });
    const [result, setResult] = useState<PaginatedResult<MeetingType>>({
        data: [],
        meta: { currentPage: 1, lastPage: 1, next: null, perPage: 10, prev: null, total: 0 }
    });
    const debounceRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        handleLoad();
    }, [command]);

    const handleLoad = () => {
        startTransition(() => {
            listUseCase.execute(new ListMeetingTypesCommand(command.page, command.perPage, command.orderBy, command.where)).then(res => {
                if (res.isRight()) {
                    setResult(res.extract() as PaginatedResult<MeetingType>);
                } else {
                    toast({ title: 'Error', description: 'Error al cargar', variant: 'destructive' });
                }
            });
        });
    };

    const navigate = useNavigate();
    const handleAdd = () => navigate('/tipos-reuniones/nuevo');
    const handleEdit = (m: MeetingType) => navigate(`/tipos-reuniones/${m.id}`);
    const handlePaginate = (page: number) => setCommand({ ...command, page });
    const handleSearch = (term: string) => {
        if (debounceRef.current) clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => setCommand({ ...command, where: term }), 300);
    };

    return (
        <MeetingTypeListPresenter
            meetingTypes={result}
            onAdd={handleAdd}
            onEdit={handleEdit}
            onDelete={() => handleLoad()}
            onPaginate={handlePaginate}
            isPending={isPending}
            onSearch={handleSearch}
        />
    );
};
