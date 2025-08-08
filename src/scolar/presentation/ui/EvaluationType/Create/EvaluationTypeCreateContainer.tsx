import { useInjection } from "inversify-react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useTransition } from "react";
import { toast } from "@/hooks/use-toast";
import { EvaluationTypeCreatePresenter } from "./EvaluationTypeCreatePresenter";
import {
  CreateEvaluationTypeUseCase,
  CreateEvaluationTypeCommand,
} from "@/scolar/application/useCases/evaluationTypes/createEvaluationTypeUseCase";
import { EVALUATION_TYPE_CREATE_USECASE } from "@/scolar/domain/symbols/EvaluationTypeSymbol";

interface FormValues {
    data: {
        name: string;
        description: string;
        weight: number;
    }
}

export const EvaluationTypeCreateContainer = () => {
    const navigate = useNavigate();
    const [isPending, startTransition] = useTransition();
    const createEvalType = useInjection<CreateEvaluationTypeUseCase>(EVALUATION_TYPE_CREATE_USECASE);
    const form = useForm<FormValues>({
        defaultValues: {
            data: { name: "", description: "", weight: 0 }
        }
    });

    const onSubmit = (values: FormValues) => {
        startTransition(async () => {
            const command = new CreateEvaluationTypeCommand(
                values.data.name,
                values.data.description,
                values.data.weight.toString()
            );
            const res = await createEvalType.execute(command);
            if (res.isLeft()) {
                const fail = res.extract();
                toast({
                    title: "Error",
                    description: fail.map(f => f.getMessage()).join(", "),
                    variant: "destructive",
                });
                return;
            }
            toast({
                title: "Tipo de evaluación creado",
                description: "El tipo de evaluación se creó correctamente",
                variant: "success",
            });
            navigate('/tipos-evaluacion');
        });
    };

    const onCancel = () => navigate('/tipos-evaluacion');

    return (
        <EvaluationTypeCreatePresenter
            form={form}
            onSubmit={onSubmit}
            isSubmitting={isPending}
            onCancel={onCancel}
        />
    );
};

