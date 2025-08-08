import { startTransition, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useInjection } from "inversify-react";
import { toast } from "@/hooks/use-toast";
import { useNavigate, useParams } from "react-router-dom";
import { AttendanceCode } from "@/scolar/domain/entities/attendanceCode";
import { GetAttendanceCodeUseCase, GetAttendanceCodeCommand } from "@/scolar/application/useCases/attendanceCodes/getAttendanceCodeUseCase";
import { UpdateAttendanceCodeUseCase, UpdateAttendanceCodeCommand } from "@/scolar/application/useCases/attendanceCodes/updateAttendanceCodeUseCase";
import { ATTENDANCE_CODE_GET_USE_CASE, ATTENDANCE_CODE_UPDATE_USE_CASE } from "@/scolar/domain/symbols/AttendanceCodeSymbol";
import { AttendanceCodeEditPresenter } from "./AttendanceCodeEditPresenter";

export const AttendanceCodeEditContainer = () => {
    const { id } = useParams<{ id: string }>();
    const getUseCase = useInjection<GetAttendanceCodeUseCase>(ATTENDANCE_CODE_GET_USE_CASE);
    const updateUseCase = useInjection<UpdateAttendanceCodeUseCase>(ATTENDANCE_CODE_UPDATE_USE_CASE);
    const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<UpdateAttendanceCodeCommand>({
        defaultValues: { data: { id: Number(id), code: '', description: '', affectsGrade: false } }
    });
    const data = watch();

    const load = useCallback(() => {
        startTransition(() => {
            getUseCase.execute(new GetAttendanceCodeCommand(Number(id))).then(res => {
                if (res.isLeft()) {
                    toast({ title: 'Error', description: 'No encontrado', variant: 'destructive' });
                    return;
                }
                const m = res.extract() as AttendanceCode;
                setValue('data.id', m.id);
                setValue('data.code', m.code);
                setValue('data.description', m.description);
                setValue('data.affectsGrade', m.affectsGrade);
            });
        });
    }, [getUseCase, id, setValue]);

    useEffect(() => { load(); }, [load]);

    const onSubmit = () => {
        startTransition(() => {
            updateUseCase.execute(new UpdateAttendanceCodeCommand(data.data)).then(res => {
                if (res.isLeft()) {
                    toast({ title: 'Error', description: 'No se pudo actualizar', variant: 'destructive' });
                    return;
                }
                toast({ title: 'Actualizado', description: 'Código de asistencia actualizado' });
            });
        });
    };
    const navigate = useNavigate();
    const onCancel = () => navigate('/codigos-asistencia');
    return <AttendanceCodeEditPresenter onSubmit={handleSubmit(onSubmit)} onCancel={onCancel} register={register} errors={errors} isSubmitting={false} />;
};
