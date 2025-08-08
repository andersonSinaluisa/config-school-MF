import { useInjection } from "inversify-react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useTransition } from "react";
import { toast } from "@/hooks/use-toast";
import { GradingSystemCreatePresenter } from "./GradingSystemCreatePresenter";
import { CreateGradingSystemUseCase, CreateGradingSystemCommand } from "@/scolar/application/useCases/gradingSystems/createGradingSystemUseCase";
import { GRADING_SYSTEM_CREATE_USECASE } from "@/scolar/domain/symbols/GradingSystemSymbol";

interface FormValues {
    data: {
        name: string;
        description: string;
        numberOfTerms: number;
        passingScore: string;
    }
}

export const GradingSystemCreateContainer = () => {
    const navigate = useNavigate();
    const [isPending, startTransition] = useTransition();
    const createGS = useInjection<CreateGradingSystemUseCase>(GRADING_SYSTEM_CREATE_USECASE);
    const { register, handleSubmit, formState: { errors }, watch } = useForm<FormValues>({
        defaultValues: { data: { name: '', description: '', numberOfTerms: 1, passingScore: '' } }
    });
    const formData = watch('data');

    const onSubmit = (values: FormValues) => {
        startTransition(async () => {
            const command = new CreateGradingSystemCommand(values.data.name, values.data.description, values.data.numberOfTerms, values.data.passingScore);
            const res = await createGS.execute(command);
            if (res.isLeft()) {
                const fail = res.extract();
                toast({ title: 'Error', description: fail.map(f => f.getMessage()).join(', '), variant: 'destructive' });
                return;
            }
            toast({ title: 'Sistema de calificación creado', description: 'Se creó correctamente', variant: 'success' });
            navigate('/sistemas-calificacion');
        });
    };

    const onCancel = () => navigate('/sistemas-calificacion');

    return (
        <GradingSystemCreatePresenter
            onSubmit={handleSubmit(onSubmit)}
            register={register}
            errors={errors}
            isSubmitting={isPending}
            onCancel={onCancel}
            formData={formData}
        />
    );
};

