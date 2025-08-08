import { useInjection } from "inversify-react";
import { ClassScheduleCreatePresenter } from "./ClassScheduleCreatePresenter";
import { CreateClassScheduleCommand, CreateClassScheduleUseCase } from "@/scolar/application/useCases/classSchedules/createClassScheduleUseCase";
import { CLASS_SCHEDULE_CREATE_USE_CASE } from "@/scolar/domain/symbols/ClassScheduleSymbol";
import { useForm } from "react-hook-form";
import { toast } from "@/hooks/use-toast";
import { useTransition } from "react";
import { useNavigate } from "react-router-dom";

export const ClassScheduleCreateContainer = () => {
    const usecase = useInjection<CreateClassScheduleUseCase>(CLASS_SCHEDULE_CREATE_USE_CASE);
    const [isPending, startTransition] = useTransition();
    const { register, handleSubmit, formState: { errors } } = useForm<CreateClassScheduleCommand>({
        defaultValues: { data: { id: 0, courseId: 0, parallelId: 0, schoolYearId: 0, subjectId: 0, dayOfWeek: '', startTime: '', endTime: '' } }
    });
    const navigate = useNavigate();
    const onSubmit = (data: CreateClassScheduleCommand) => {
        startTransition(async () => {
            const res = await usecase.execute(new CreateClassScheduleCommand(data.data));
            if (res.isLeft()) {
                toast({ title: 'Error', description: 'No se pudo crear', variant: 'destructive' });
                return;
            }
            toast({ title: 'Horario creado', description: 'Horario creado correctamente', variant: 'success' });
            navigate('/horarios-clase');
        });
    };
    const onCancel = () => navigate('/horarios-clase');
    return (
        <ClassScheduleCreatePresenter
            onSubmit={handleSubmit(onSubmit)}
            onCancel={onCancel}
            register={register}
            errors={errors}
            isSubmitting={isPending}
        />
    );
};
