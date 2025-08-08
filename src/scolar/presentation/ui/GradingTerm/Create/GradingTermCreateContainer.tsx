import { useInjection } from "inversify-react";
import { useNavigate } from "react-router-dom";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "@/hooks/use-toast";
import { GradingTermCreatePresenter } from "./GradingTermCreatePresenter";
import {
    CreateGradingTermUseCase,
    CreateGradingTermCommand,
} from "@/scolar/application/useCases/gradingTerms/createGradingTermUseCase";
import { GRADING_TERM_CREATE_USECASE } from "@/scolar/domain/symbols/GradingTermSymbol";

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

export const GradingTermCreateContainer = () => {
    const navigate = useNavigate();
    const [isPending, startTransition] = useTransition();
    const createGT = useInjection<CreateGradingTermUseCase>(GRADING_TERM_CREATE_USECASE);
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

    const onSubmit = (values: FormValues) => {
        startTransition(async () => {
            const c = new CreateGradingTermCommand(
                values.data.gradingSystem_id,
                values.data.academicYear_id,
                values.data.name,
                values.data.order,
                values.data.weight.toString(),
            );
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
            form={form}
            onSubmit={onSubmit}
            isSubmitting={isPending}
            onCancel={onCancel}
        />
    );
};

