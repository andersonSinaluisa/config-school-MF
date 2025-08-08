import { useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import { useInjection } from "inversify-react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { EvaluationTypeEditPresenter } from "./EvaluationTypeEditPresenter";
import { GetEvaluationTypeUseCase, GetEvaluationTypeCommand } from "@/scolar/application/useCases/evaluationTypes/getEvaluationTypeUseCase";
import { UpdateEvaluationTypeUseCase, UpdateEvaluationTypeCommand } from "@/scolar/application/useCases/evaluationTypes/updateEvaluationTypeUseCase";
import { EVALUATION_TYPE_GET_USECASE, EVALUATION_TYPE_UPDATE_USECASE } from "@/scolar/domain/symbols/EvaluationTypeSymbol";

interface FormValues {
    data: {
        name: string;
        description: string;
        weight: string;
    }
}

export const EvaluationTypeEditContainer = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isPending, startTransition] = useTransition();
    const getEvalType = useInjection<GetEvaluationTypeUseCase>(EVALUATION_TYPE_GET_USECASE);
    const updateEvalType = useInjection<UpdateEvaluationTypeUseCase>(EVALUATION_TYPE_UPDATE_USECASE);

    const { register, handleSubmit, formState: { errors }, reset, watch } = useForm<FormValues>({
        defaultValues: { data: { name: '', description: '', weight: '' } }
    });

    const formData = watch('data');

    useEffect(() => {
        if (!id) return;
        startTransition(async () => {
            const res = await getEvalType.execute(new GetEvaluationTypeCommand(Number(id)));
            if (res.isLeft()) {
                toast({ title: 'Error', description: 'No se pudo cargar', variant: 'destructive' });
                navigate('/tipos-evaluacion');
                return;
            }
            const data = res.extract();
            if (data) {
                reset({ data: { name: data.name, description: data.description, weight: data.weight } });
            }
        });
    }, [id]);

    const onSubmit = (values: FormValues) => {
        if (!id) return;
        startTransition(async () => {
            const command = new UpdateEvaluationTypeCommand(Number(id), values.data.name, values.data.description, values.data.weight);
            const res = await updateEvalType.execute(command);
            if (res.isLeft()) {
                const fail = res.extract();
                toast({ title: 'Error', description: fail.map(f => f.getMessage()).join(', '), variant: 'destructive' });
                return;
            }
            toast({ title: 'Tipo de evaluación actualizado', description: 'Cambios guardados', variant: 'success' });
            navigate('/tipos-evaluacion');
        });
    };

    const onCancel = () => navigate('/tipos-evaluacion');

    return (
        <EvaluationTypeEditPresenter
            onSubmit={handleSubmit(onSubmit)}
            register={register}
            errors={errors}
            isSubmitting={isPending}
            onCancel={onCancel}
            formData={formData}
        />
    );
};

