import { startTransition, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useInjection } from "inversify-react";
import { toast } from "@/hooks/use-toast";
import { useNavigate, useParams } from "react-router-dom";
import { AcademicPlanning } from "@/scolar/domain/entities/academicPlanning";
import { GetAcademicPlanningUseCase, GetAcademicPlanningCommand } from "@/scolar/application/useCases/academicPlannings/getAcademicPlanningUseCase";
import { UpdateAcademicPlanningUseCase, UpdateAcademicPlanningCommand } from "@/scolar/application/useCases/academicPlannings/updateAcademicPlanningUseCase";
import { ACADEMIC_PLANNING_GET_USE_CASE, ACADEMIC_PLANNING_UPDATE_USE_CASE } from "@/scolar/domain/symbols/AcademicPlanningSymbol";
import { AcademicPlanningEditPresenter } from "./AcademicPlanningEditPresenter";

export const AcademicPlanningEditContainer = () => {
    const { id } = useParams<{ id: string }>();
    const getUseCase = useInjection<GetAcademicPlanningUseCase>(ACADEMIC_PLANNING_GET_USE_CASE);
    const updateUseCase = useInjection<UpdateAcademicPlanningUseCase>(ACADEMIC_PLANNING_UPDATE_USE_CASE);
    const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<UpdateAcademicPlanningCommand>({
        defaultValues: { data: { id: Number(id), courseId: 0, parallelId: 0, schoolYearId: 0, subjectId: 0, topic: '', startDate: '', endDate: '', description: '' } }
    });
    const data = watch();

    const load = useCallback(() => {
        startTransition(() => {
            getUseCase.execute(new GetAcademicPlanningCommand(Number(id))).then(res => {
                if (res.isLeft()) {
                    toast({ title: 'Error', description: 'No encontrado', variant: 'destructive' });
                    return;
                }
                const m = res.extract() as AcademicPlanning;
                setValue('data.id', m.id);
                setValue('data.courseId', m.courseId);
                setValue('data.parallelId', m.parallelId);
                setValue('data.schoolYearId', m.schoolYearId);
                setValue('data.subjectId', m.subjectId);
                setValue('data.topic', m.topic);
                setValue('data.startDate', m.startDate);
                setValue('data.endDate', m.endDate);
                setValue('data.description', m.description);
            });
        });
    }, [getUseCase, id, setValue]);

    useEffect(() => { load(); }, [load]);

    const onSubmit = () => {
        startTransition(() => {
            updateUseCase.execute(new UpdateAcademicPlanningCommand(data.data)).then(res => {
                if (res.isLeft()) {
                    toast({ title: 'Error', description: 'No se pudo actualizar', variant: 'destructive' });
                    return;
                }
                toast({ title: 'Actualizado', description: 'Planificación actualizada' });
            });
        });
    };
    const navigate = useNavigate();
    const onCancel = () => navigate('/planificaciones-academicas');
    return <AcademicPlanningEditPresenter onSubmit={handleSubmit(onSubmit)} onCancel={onCancel} register={register} errors={errors} isSubmitting={false} />;
};
