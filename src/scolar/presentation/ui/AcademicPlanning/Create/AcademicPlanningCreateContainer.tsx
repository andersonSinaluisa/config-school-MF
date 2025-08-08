import { useInjection } from "inversify-react";
import { AcademicPlanningCreatePresenter } from "./AcademicPlanningCreatePresenter";
import { CreateAcademicPlanningCommand, CreateAcademicPlanningUseCase } from "@/scolar/application/useCases/academicPlannings/createAcademicPlanningUseCase";
import { ACADEMIC_PLANNING_CREATE_USE_CASE } from "@/scolar/domain/symbols/AcademicPlanningSymbol";
import { useForm } from "react-hook-form";
import { toast } from "@/hooks/use-toast";
import { useTransition } from "react";
import { useNavigate } from "react-router-dom";

export const AcademicPlanningCreateContainer = () => {
    const usecase = useInjection<CreateAcademicPlanningUseCase>(ACADEMIC_PLANNING_CREATE_USE_CASE);
    const [isPending, startTransition] = useTransition();
    const { register, handleSubmit, formState: { errors } } = useForm<CreateAcademicPlanningCommand>({
        defaultValues: { data: { id: 0, courseId: 0, parallelId: 0, schoolYearId: 0, subjectId: 0, topic: '', startDate: '', endDate: '', description: '' } }
    });
    const navigate = useNavigate();
    const onSubmit = (data: CreateAcademicPlanningCommand) => {
        startTransition(async () => {
            const res = await usecase.execute(new CreateAcademicPlanningCommand(data.data));
            if (res.isLeft()) {
                toast({ title: 'Error', description: 'No se pudo crear', variant: 'destructive' });
                return;
            }
            toast({ title: 'Planificación creada', description: 'Planificación creada correctamente', variant: 'success' });
            navigate('/planificaciones-academicas');
        });
    };
    const onCancel = () => navigate('/planificaciones-academicas');
    return (
        <AcademicPlanningCreatePresenter
            onSubmit={handleSubmit(onSubmit)}
            onCancel={onCancel}
            register={register}
            errors={errors}
            isSubmitting={isPending}
        />
    );
};
