import { startTransition, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useInjection } from "inversify-react";
import { toast } from "@/hooks/use-toast";
import { useNavigate, useParams } from "react-router-dom";
import { ClassSchedule } from "@/scolar/domain/entities/classSchedule";
import { GetClassScheduleUseCase, GetClassScheduleCommand } from "@/scolar/application/useCases/classSchedules/getClassScheduleUseCase";
import { UpdateClassScheduleUseCase, UpdateClassScheduleCommand } from "@/scolar/application/useCases/classSchedules/updateClassScheduleUseCase";
import { CLASS_SCHEDULE_GET_USE_CASE, CLASS_SCHEDULE_UPDATE_USE_CASE } from "@/scolar/domain/symbols/ClassScheduleSymbol";
import { ClassScheduleEditPresenter } from "./ClassScheduleEditPresenter";

export const ClassScheduleEditContainer = () => {
    const { id } = useParams<{ id: string }>();
    const getUseCase = useInjection<GetClassScheduleUseCase>(CLASS_SCHEDULE_GET_USE_CASE);
    const updateUseCase = useInjection<UpdateClassScheduleUseCase>(CLASS_SCHEDULE_UPDATE_USE_CASE);
    const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<UpdateClassScheduleCommand>({
        defaultValues: { data: { id: Number(id), courseId: 0, parallelId: 0, schoolYearId: 0, subjectId: 0, dayOfWeek: '', startTime: '', endTime: '' } }
    });
    const data = watch();

    const load = useCallback(() => {
        startTransition(() => {
            getUseCase.execute(new GetClassScheduleCommand(Number(id))).then(res => {
                if (res.isLeft()) {
                    toast({ title: 'Error', description: 'No encontrado', variant: 'destructive' });
                    return;
                }
                const m = res.extract() as ClassSchedule;
                setValue('data.id', m.id);
                setValue('data.courseId', m.courseId);
                setValue('data.parallelId', m.parallelId);
                setValue('data.schoolYearId', m.schoolYearId);
                setValue('data.subjectId', m.subjectId);
                setValue('data.dayOfWeek', m.dayOfWeek);
                setValue('data.startTime', m.startTime);
                setValue('data.endTime', m.endTime);
            });
        });
    }, [getUseCase, id, setValue]);

    useEffect(() => { load(); }, [load]);

    const onSubmit = () => {
        startTransition(() => {
            updateUseCase.execute(new UpdateClassScheduleCommand(data.data)).then(res => {
                if (res.isLeft()) {
                    toast({ title: 'Error', description: 'No se pudo actualizar', variant: 'destructive' });
                    return;
                }
                toast({ title: 'Actualizado', description: 'Horario actualizado' });
            });
        });
    };
    const navigate = useNavigate();
    const onCancel = () => navigate('/horarios-clase');
    return <ClassScheduleEditPresenter onSubmit={handleSubmit(onSubmit)} onCancel={onCancel} register={register} errors={errors} isSubmitting={false} />;
};
