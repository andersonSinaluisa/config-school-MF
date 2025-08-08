import { useInjection } from "inversify-react";
import { MeetingTypeCreatePresenter } from "./MeetingTypeCreatePresenter";
import { CreateMeetingTypeCommand, CreateMeetingTypeUseCase } from "@/scolar/application/useCases/meetingTypes/createMeetingTypeUseCase";
import { MEETING_TYPE_CREATE_USE_CASE } from "@/scolar/domain/symbols/MeetingTypeSymbol";
import { useForm } from "react-hook-form";
import { toast } from "@/hooks/use-toast";
import { useTransition } from "react";
import { useNavigate } from "react-router-dom";

export const MeetingTypeCreateContainer = () => {
    const usecase = useInjection<CreateMeetingTypeUseCase>(MEETING_TYPE_CREATE_USE_CASE);
    const [isPending, startTransition] = useTransition();
    const { register, handleSubmit, formState: { errors } } = useForm<CreateMeetingTypeCommand>({
        defaultValues: { data: { id: 0, name: '', description: '' } }
    });
    const onSubmit = (data: CreateMeetingTypeCommand) => {
        startTransition(async () => {
            const res = await usecase.execute(new CreateMeetingTypeCommand(data.data));
            if (res.isLeft()) {
                toast({ title: 'Error', description: 'No se pudo crear', variant: 'destructive' });
                return;
            }
            toast({ title: 'Tipo de reunión creado', description: `Tipo ${data.data.name} creado correctamente`, variant: 'success' });
            navigate('/tipos-reuniones');
        });
    };
    const navigate = useNavigate();
    const onCancel = () => navigate('/tipos-reuniones');
    return (
        <MeetingTypeCreatePresenter
            onSubmit={handleSubmit(onSubmit)}
            onCancel={onCancel}
            register={register}
            errors={errors}
            isSubmitting={isPending}
        />
    );
};
