import { startTransition, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useInjection } from "inversify-react";
import { toast } from "@/hooks/use-toast";
import { useNavigate, useParams } from "react-router-dom";
import { BehaviorScale } from "@/scolar/domain/entities/behaviorScale";
import { GetBehaviorScaleUseCase, GetBehaviorScaleCommand } from "@/scolar/application/useCases/behaviorScales/getBehaviorScaleUseCase";
import { UpdateBehaviorScaleUseCase, UpdateBehaviorScaleCommand } from "@/scolar/application/useCases/behaviorScales/updateBehaviorScaleUseCase";
import { BEHAVIOR_SCALE_GET_USE_CASE, BEHAVIOR_SCALE_UPDATE_USE_CASE } from "@/scolar/domain/symbols/BehaviorScaleSymbol";
import { BehaviorScaleEditPresenter } from "./BehaviorScaleEditPresenter";

export const BehaviorScaleEditContainer = () => {
    const { id } = useParams<{ id: string }>();
    const getUseCase = useInjection<GetBehaviorScaleUseCase>(BEHAVIOR_SCALE_GET_USE_CASE);
    const updateUseCase = useInjection<UpdateBehaviorScaleUseCase>(BEHAVIOR_SCALE_UPDATE_USE_CASE);
    const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<UpdateBehaviorScaleCommand>({
        defaultValues: { data: { id: Number(id), name: '', minScore: '', maxScore: '' } }
    });
    const formData = watch();

    const load = useCallback(() => {
        startTransition(() => {
            getUseCase.execute(new GetBehaviorScaleCommand(Number(id))).then(res => {
                if (res.isLeft()) {
                    toast({ title: 'Error', description: 'No encontrado', variant: 'destructive' });
                    return;
                }
                const m = res.extract() as BehaviorScale;
                setValue('data.id', m.id);
                setValue('data.name', m.name);
                setValue('data.minScore', m.minScore);
                setValue('data.maxScore', m.maxScore);
            });
        });
    }, [getUseCase, id, setValue]);

    useEffect(() => { load(); }, [load]);

    const onSubmit = () => {
        startTransition(() => {
            updateUseCase.execute(new UpdateBehaviorScaleCommand(formData.data)).then(res => {
                if (res.isLeft()) {
                    toast({ title: 'Error', description: 'No se pudo actualizar', variant: 'destructive' });
                    return;
                }
                toast({ title: 'Actualizado', description: 'Escala de comportamiento actualizada' });
            });
        });
    };
    const navigate = useNavigate();
    const onCancel = () => navigate('/escalas-comportamiento');
    return (
        <BehaviorScaleEditPresenter
            onSubmit={handleSubmit(onSubmit)}
            onCancel={onCancel}
            register={register}
            errors={errors}
            isSubmitting={false}
            formData={formData}
        />
    );
};
