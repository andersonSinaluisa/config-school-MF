import { useInjection } from "inversify-react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useTransition } from "react";
import { toast } from "@/hooks/use-toast";
import { GradingTermCreatePresenter } from "./GradingTermCreatePresenter";
import { CreateGradingTermUseCase, CreateGradingTermCommand } from "@/scolar/application/useCases/gradingTerms/createGradingTermUseCase";
import { GRADING_TERM_CREATE_USECASE } from "@/scolar/domain/symbols/GradingTermSymbol";

interface FormValues {
    data: {
        gradingSystem_id: number;
        academicYear_id: number;
        name: string;
        order: number;
        weight: string;
    }
}

export const GradingTermCreateContainer = () => {
    const navigate = useNavigate();
    const [isPending, startTransition] = useTransition();
    const createGT = useInjection<CreateGradingTermUseCase>(GRADING_TERM_CREATE_USECASE);
    const { register, handleSubmit, formState: { errors }, watch } = useForm<FormValues>({
        defaultValues: { data: { gradingSystem_id: 0, academicYear_id: 0, name: '', order: 1, weight: '' } }
    });
    const formData = watch('data');

    const onSubmit = (values: FormValues) => {
        startTransition(async () => {
            const c = new CreateGradingTermCommand(values.data.gradingSystem_id, values.data.academicYear_id, values.data.name, values.data.order, values.data.weight);
            const res = await createGT.execute(c);
            if (res.isLeft()) {
                const fail = res.extract();
                toast({ title: 'Error', description: fail.map(f => f.getMessage()).join(', '), variant: 'destructive' });
                return;
            }
            toast({ title: 'Período de calificación creado', description: 'Creado correctamente', variant: 'success' });
            navigate('/terminos-calificacion');
        });
    };

    const onCancel = () => navigate('/terminos-calificacion');

    return (
        <GradingTermCreatePresenter
            onSubmit={handleSubmit(onSubmit)}
            register={register}
            errors={errors}
            isSubmitting={isPending}
            onCancel={onCancel}
            formData={formData}
        />
    );
};

