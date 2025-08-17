import { useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import { useInjection } from "inversify-react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { SubjectEditPresenter } from "./SubjectEditPresenter";
import { GetSubjectUseCase, GetSubjectCommand } from "@/scolar/application/useCases/subjects/getSubjectUseCase";
import { UpdateSubjectUseCase, UpdateSubjectCommand } from "@/scolar/application/useCases/subjects/updateSubjectUseCase";
import { SUBJECT_GET_USE_CASE, SUBJECT_UPDATE_USE_CASE } from "@/scolar/domain/symbols/SubjectSymbol";

interface FormValues {
    data: {
        id: number;
        name: string;
        code: string;
        description: string;
        hoursPerWeek: number;
    };
}

export const SubjectEditContainer = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isPending, startTransition] = useTransition();

    const getSubject = useInjection<GetSubjectUseCase>(SUBJECT_GET_USE_CASE);
    const updateSubject = useInjection<UpdateSubjectUseCase>(SUBJECT_UPDATE_USE_CASE);

    const { register, handleSubmit, formState: { errors }, reset, watch } = useForm<FormValues>({
        defaultValues: {
            data: {
                id: 0,
                name: "",
                code: "",
                description: "",
                hoursPerWeek: 1,
            }
        }
    });

    const formData = watch();

    useEffect(() => {
        if (!id) return;
        startTransition(async () => {
            const res = await getSubject.execute(new GetSubjectCommand(Number(id)));
            if (res.isLeft()) {
                toast({ title: "Error", description: "No se pudo cargar la materia", variant: "destructive" });
                navigate('/materias');
                return;
            }
            const subject = res.extract();
            reset({
                data: {
                    id: subject.id,
                    name: subject.name,
                    code: subject.code,
                    description: subject.description,
                    hoursPerWeek: subject.hoursPerWeek,
                }
            });
        });
    }, [id, getSubject, navigate, reset]);

    const onSubmit = (values: FormValues) => {
        if (!id) return;
        startTransition(async () => {
            const command = new UpdateSubjectCommand({
                id: Number(id),
                name: values.data.name,
                code: values.data.code,
                description: values.data.description,
                hoursPerWeek: values.data.hoursPerWeek,
            });
            const res = await updateSubject.execute(command);
            if (res.isLeft()) {
                const fail = res.extract();
                toast({ title: "Error", description: fail.map(f => f.getMessage()).join(", "), variant: "destructive" });
                return;
            }
            toast({ title: "Materia actualizada", description: "Cambios guardados", variant: "success" });
            navigate('/materias');
        });
    };

    const onCancel = () => navigate('/materias');

    return (
        <SubjectEditPresenter
            onSubmit={handleSubmit(onSubmit)}
            register={register}
            errors={errors}
            isSubmitting={isPending}
            onCancel={onCancel}
            formData={formData}
        />
    );
};

