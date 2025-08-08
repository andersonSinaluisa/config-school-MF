import { toast } from "@/hooks/use-toast";
import { useInjection } from "inversify-react";
import { DeleteAttendanceCodePresenter } from "./DeleteAttendanceCodePresenter";
import { AttendanceCode } from "@/scolar/domain/entities/attendanceCode";
import { DeleteAttendanceCodeUseCase, DeleteAttendanceCodeCommand } from "@/scolar/application/useCases/attendanceCodes/deleteAttendanceCodeUseCase";
import { ATTENDANCE_CODE_DELETE_USE_CASE } from "@/scolar/domain/symbols/AttendanceCodeSymbol";

interface Props {
    attendanceCode: AttendanceCode;
    onConfirm: () => void;
}

export const DeleteAttendanceCodeContainer = ({ attendanceCode, onConfirm }: Props) => {
    const usecase = useInjection<DeleteAttendanceCodeUseCase>(ATTENDANCE_CODE_DELETE_USE_CASE);
    const handleDelete = async () => {
        const res = await usecase.execute(new DeleteAttendanceCodeCommand(attendanceCode.id));
        if (res.isRight()) {
            toast({ title: 'Código eliminado', description: 'El código de asistencia ha sido eliminado', variant: 'success' });
            onConfirm();
        } else {
            toast({ title: 'Error', description: 'No se pudo eliminar', variant: 'destructive' });
        }
    };
    return <DeleteAttendanceCodePresenter attendanceCode={attendanceCode} onConfirm={handleDelete} />;
};
