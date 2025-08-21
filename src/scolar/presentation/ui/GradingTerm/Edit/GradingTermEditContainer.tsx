import { useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useInjection } from "inversify-react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { GradingTermEditPresenter } from "./GradingTermEditPresenter";
import {
    GetGradingTermUseCase,
    GetGradingTermCommand,
} from "@/scolar/application/useCases/gradingTerms/getGradingTermUseCase";
import {
    UpdateGradingTermUseCase,
    UpdateGradingTermCommand,
} from "@/scolar/application/useCases/gradingTerms/updateGradingTermUseCase";
import {
    GRADING_TERM_GET_USECASE,
    GRADING_TERM_UPDATE_USECASE,
} from "@/scolar/domain/symbols/GradingTermSymbol";
import { GradingTerm } from "@/scolar/domain/entities/grading_term";

const formSchema = z.object({
    data: z.object({
        gradingSystem_id: z
            .number({ required_error: "Seleccione un sistema" })
            .positive(),
        academicYear_id: z
            .number({ required_error: "Seleccione un año" })
            .positive(),
        name: z.string().min(1, "El nombre es obligatorio"),
        order: z
            .number({ required_error: "El orden es obligatorio" })
            .min(1),
        weight: z
            .number({ required_error: "El peso es obligatorio" })
            .min(0)
            .max(1),
    }),
});

type FormValues = z.infer<typeof formSchema>;

export const GradingTermEditContainer = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isPending, startTransition] = useTransition();
    const getGT = useInjection<GetGradingTermUseCase>(GRADING_TERM_GET_USECASE);
    const updateGT = useInjection<UpdateGradingTermUseCase>(GRADING_TERM_UPDATE_USECASE);

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            data: {
                gradingSystem_id: undefined,
                academicYear_id: undefined,
                name: '',
                order: 1,
                weight: 0.5,
            },
        },
        mode: 'onChange',
    });

    useEffect(() => {
        if (!id) return;
        startTransition(async () => {
            const res = await getGT.execute(new GetGradingTermCommand(Number(id)));
            if (res.isLeft()) {
                toast({ title: 'Error', description: 'No se pudo cargar', variant: 'destructive' });
                navigate('/terminos-calificacion');
                return;
            }
            const data = res.extract()  as GradingTerm;
            if (data) {
                form.reset({
                    data: {
                        gradingSystem_id: data.gradingSystem_id,
                        academicYear_id: data.academicYear_id,
                        name: data.name,
                        order: data.order,
                        weight: parseFloat(data.weight),
                    },
                });
            }
        });
    }, [id]);

    const onSubmit = (values: FormValues) => {
        if (!id) return;
        startTransition(async () => {
            const command = new UpdateGradingTermCommand(
                Number(id),
                values.data.gradingSystem_id,
                values.data.academicYear_id,
                values.data.name,
                values.data.order,
                values.data.weight.toString(),
            );
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
            form={form}
            onSubmit={onSubmit}
            isSubmitting={isPending}
            onCancel={onCancel}
        />
    );
};

