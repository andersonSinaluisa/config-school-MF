import { useEffect, useRef, useState, useTransition } from "react";
import { useInjection } from "inversify-react";
import { PaginatedResult } from "@/scolar/infrastructure/dto/paginateDto";
import { AttendanceCode } from "@/scolar/domain/entities/attendanceCode";
import { toast } from "@/hooks/use-toast";
import { ListAttendanceCodesUseCase, ListAttendanceCodesCommand } from "@/scolar/application/useCases/attendanceCodes/listAttendanceCodesUseCase";
import { ATTENDANCE_CODE_LIST_USE_CASE } from "@/scolar/domain/symbols/AttendanceCodeSymbol";
import { AttendanceCodeListPresenter } from "./AttendanceCodeListPresenter";
import { useNavigate } from "react-router-dom";

export const AttendanceCodeListContainer = () => {
    const listUseCase = useInjection<ListAttendanceCodesUseCase>(ATTENDANCE_CODE_LIST_USE_CASE);
    const [isPending, startTransition] = useTransition();
    const [command, setCommand] = useState({ page: 1, perPage: 10, where: '', orderBy: [] as string[] });
    const [result, setResult] = useState<PaginatedResult<AttendanceCode>>({
        data: [],
        meta: { currentPage: 1, lastPage: 1, next: null, perPage: 10, prev: null, total: 0 }
    });
    const debounceRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => { handleLoad(); }, [command]);

    const handleLoad = () => {
        startTransition(() => {
            listUseCase.execute(new ListAttendanceCodesCommand(command.page, command.perPage, command.orderBy, command.where)).then(res => {
                if (res.isRight()) {
                    setResult(res.extract() as PaginatedResult<AttendanceCode>);
                } else {
                    toast({ title: 'Error', description: 'Error al cargar', variant: 'destructive' });
                }
            });
        });
    };

    const navigate = useNavigate();
    const handleAdd = () => navigate('/codigos-asistencia/nuevo');
    const handleEdit = (m: AttendanceCode) => navigate(`/codigos-asistencia/${m.id}`);
    const handlePaginate = (page: number) => setCommand({ ...command, page });
    const handleSearch = (term: string) => {
        if (debounceRef.current) clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => setCommand({ ...command, where: term }), 300);
    };

    return (
        <AttendanceCodeListPresenter
            attendanceCodes={result}
            onAdd={handleAdd}
            onEdit={handleEdit}
            onDelete={() => handleLoad()}
            onPaginate={handlePaginate}
            isPending={isPending}
            onSearch={handleSearch}
        />
    );
};
