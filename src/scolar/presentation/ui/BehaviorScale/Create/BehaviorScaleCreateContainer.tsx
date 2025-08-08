import { useInjection } from "inversify-react";
import { BehaviorScaleCreatePresenter } from "./BehaviorScaleCreatePresenter";
import { CreateBehaviorScaleCommand, CreateBehaviorScaleUseCase } from "@/scolar/application/useCases/behaviorScales/createBehaviorScaleUseCase";
import { BEHAVIOR_SCALE_CREATE_USE_CASE } from "@/scolar/domain/symbols/BehaviorScaleSymbol";
import { useForm } from "react-hook-form";
import { toast } from "@/hooks/use-toast";
import { useTransition } from "react";
import { useNavigate } from "react-router-dom";

export const BehaviorScaleCreateContainer = () => {
    const usecase = useInjection<CreateBehaviorScaleUseCase>(BEHAVIOR_SCALE_CREATE_USE_CASE);
    const [isPending, startTransition] = useTransition();
    const { register, handleSubmit, formState: { errors }, watch } = useForm<CreateBehaviorScaleCommand>({
        defaultValues: { data: { id: 0, name: '', minScore: '', maxScore: '' } }
    });
    const formData = watch();
    const onSubmit = (data: CreateBehaviorScaleCommand) => {
        startTransition(async () => {
            const res = await usecase.execute(new CreateBehaviorScaleCommand(data.data));
            if (res.isLeft()) {
                toast({ title: 'Error', description: 'No se pudo crear', variant: 'destructive' });
                return;
            }
            toast({ title: 'Escala creada', description: `Escala ${data.data.name} creada`, variant: 'success' });
            navigate('/escalas-comportamiento');
        });
    };
    const navigate = useNavigate();
    const onCancel = () => navigate('/escalas-comportamiento');
    return (
        <BehaviorScaleCreatePresenter
            onSubmit={handleSubmit(onSubmit)}
            onCancel={onCancel}
            register={register}
            errors={errors}
            isSubmitting={isPending}
            formData={formData}
        />
    );
};
