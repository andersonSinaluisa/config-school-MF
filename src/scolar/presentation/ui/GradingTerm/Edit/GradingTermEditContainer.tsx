import { useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import { useInjection } from "inversify-react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { GradingTermEditPresenter } from "./GradingTermEditPresenter";
import { GetGradingTermUseCase, GetGradingTermCommand } from "@/scolar/application/useCases/gradingTerms/getGradingTermUseCase";
import { UpdateGradingTermUseCase, UpdateGradingTermCommand } from "@/scolar/application/useCases/gradingTerms/updateGradingTermUseCase";
import { GRADING_TERM_GET_USECASE, GRADING_TERM_UPDATE_USECASE } from "@/scolar/domain/symbols/GradingTermSymbol";

interface FormValues {
    data: {
        gradingSystem_id: number;
        academicYear_id: number;
        name: string;
        order: number;
        weight: string;
    }
}

export const GradingTermEditContainer = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isPending, startTransition] = useTransition();
    const getGT = useInjection<GetGradingTermUseCase>(GRADING_TERM_GET_USECASE);
    const updateGT = useInjection<UpdateGradingTermUseCase>(GRADING_TERM_UPDATE_USECASE);

    const { register, handleSubmit, formState: { errors }, reset, watch } = useForm<FormValues>({
        defaultValues: { data: { gradingSystem_id: 0, academicYear_id: 0, name: '', order: 1, weight: '' } }
    });

    const formData = watch('data');

    useEffect(() => {
        if (!id) return;
        startTransition(async () => {
            const res = await getGT.execute(new GetGradingTermCommand(Number(id)));
            if (res.isLeft()) {
                toast({ title: 'Error', description: 'No se pudo cargar', variant: 'destructive' });
                navigate('/terminos-calificacion');
                return;
            }
            const data = res.extract();
            if (data) {
                reset({ data: { gradingSystem_id: data.gradingSystem_id, academicYear_id: data.academicYear_id, name: data.name, order: data.order, weight: data.weight } });
            }
        });
    }, [id]);

    const onSubmit = (values: FormValues) => {
        if (!id) return;
        startTransition(async () => {
            const command = new UpdateGradingTermCommand(Number(id), values.data.gradingSystem_id, values.data.academicYear_id, values.data.name, values.data.order, values.data.weight);
            const res = await updateGT.execute(command);
            if (res.isLeft()) {
                const fail = res.extract();
                toast({ title: 'Error', description: fail.map(f => f.getMessage()).join(', '), variant: 'destructive' });
                return;
            }
            toast({ title: 'Período actualizado', description: 'Cambios guardados', variant: 'success' });
            navigate('/terminos-calificacion');
        });
    };

    const onCancel = () => navigate('/terminos-calificacion');

    return (
        <GradingTermEditPresenter
            onSubmit={handleSubmit(onSubmit)}
            register={register}
            errors={errors}
            isSubmitting={isPending}
            onCancel={onCancel}
            formData={formData}
        />
    );
};

