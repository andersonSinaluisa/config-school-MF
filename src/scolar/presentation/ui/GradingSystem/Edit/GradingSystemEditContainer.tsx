import { useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import { useInjection } from "inversify-react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { GradingSystemEditPresenter } from "./GradingSystemEditPresenter";
import { GetGradingSystemUseCase, GetGradingSystemCommand } from "@/scolar/application/useCases/gradingSystems/getGradingSystemUseCase";
import { UpdateGradingSystemUseCase, UpdateGradingSystemCommand } from "@/scolar/application/useCases/gradingSystems/updateGradingSystemUseCase";
import { GRADING_SYSTEM_GET_USECASE, GRADING_SYSTEM_UPDATE_USECASE } from "@/scolar/domain/symbols/GradingSystemSymbol";
import { GradingSystem } from "@/scolar/domain/entities/grading_system";

interface FormValues {
    data: {
        name: string;
        description: string;
        numberOfTerms: number;
        passingScore: string;
    }
}

export const GradingSystemEditContainer = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isPending, startTransition] = useTransition();
    const getGS = useInjection<GetGradingSystemUseCase>(GRADING_SYSTEM_GET_USECASE);
    const updateGS = useInjection<UpdateGradingSystemUseCase>(GRADING_SYSTEM_UPDATE_USECASE);

    const { register, handleSubmit, formState: { errors }, reset, watch } = useForm<FormValues>({
        defaultValues: { data: { name: '', description: '', numberOfTerms: 1, passingScore: '' } }
    });

    const formData = watch('data');

    useEffect(() => {
        if (!id) return;
        startTransition(async () => {
            const res = await getGS.execute(new GetGradingSystemCommand(Number(id)));
            if (res.isLeft()) {
                toast({ title: 'Error', description: 'No se pudo cargar', variant: 'destructive' });
                navigate('/sistemas-calificacion');
                return;
            }
            const data = res.extract() as GradingSystem;
            if (data) {
                reset({ data: { name: data.name, description: data.description, numberOfTerms: data.numberOfTerms, passingScore: data.passingScore } });
            }
        });
    }, [id]);

    const onSubmit = (values: FormValues) => {
        if (!id) return;
        startTransition(async () => {
            const command = new UpdateGradingSystemCommand(Number(id), values.data.name, values.data.description, values.data.numberOfTerms, values.data.passingScore);
            const res = await updateGS.execute(command);
            if (res.isLeft()) {
                const fail = res.extract();
                toast({ title: 'Error', description: fail.map(f => f.getMessage()).join(', '), variant: 'destructive' });
                return;
            }
            toast({ title: 'Sistema de calificación actualizado', description: 'Cambios guardados', variant: 'success' });
            navigate('/sistemas-calificacion');
        });
    };

    const onCancel = () => navigate('/sistemas-calificacion');

    return (
        <GradingSystemEditPresenter
            onSubmit={handleSubmit(onSubmit)}
            register={register}
            errors={errors}
            isSubmitting={isPending}
            onCancel={onCancel}
            formData={formData}
        />
    );
};

