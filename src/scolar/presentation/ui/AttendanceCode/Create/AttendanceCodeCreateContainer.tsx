import { useInjection } from "inversify-react";
import { AttendanceCodeCreatePresenter } from "./AttendanceCodeCreatePresenter";
import { CreateAttendanceCodeCommand, CreateAttendanceCodeUseCase } from "@/scolar/application/useCases/attendanceCodes/createAttendanceCodeUseCase";
import { ATTENDANCE_CODE_CREATE_USE_CASE } from "@/scolar/domain/symbols/AttendanceCodeSymbol";
import { useForm } from "react-hook-form";
import { toast } from "@/hooks/use-toast";
import { useTransition } from "react";
import { useNavigate } from "react-router-dom";

export const AttendanceCodeCreateContainer = () => {
    const usecase = useInjection<CreateAttendanceCodeUseCase>(ATTENDANCE_CODE_CREATE_USE_CASE);
    const [isPending, startTransition] = useTransition();
    const { register, handleSubmit, formState: { errors } } = useForm<CreateAttendanceCodeCommand>({
        defaultValues: { data: { id: 0, code: '', description: '', affectsGrade: false } }
    });
    const onSubmit = (data: CreateAttendanceCodeCommand) => {
        startTransition(async () => {
            const res = await usecase.execute(new CreateAttendanceCodeCommand(data.data));
            if (res.isLeft()) {
                toast({ title: 'Error', description: 'No se pudo crear', variant: 'destructive' });
                return;
            }
            toast({ title: 'Código creado', description: `Código ${data.data.code} creado`, variant: 'success' });
            navigate('/codigos-asistencia');
        });
    };
    const navigate = useNavigate();
    const onCancel = () => navigate('/codigos-asistencia');
    return (
        <AttendanceCodeCreatePresenter
            onSubmit={handleSubmit(onSubmit)}
            onCancel={onCancel}
            register={register}
            errors={errors}
            isSubmitting={isPending}
        />
    );
};
