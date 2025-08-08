import { startTransition, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useInjection } from "inversify-react";
import { toast } from "@/hooks/use-toast";
import { useNavigate, useParams } from "react-router-dom";
import { MeetingType } from "@/scolar/domain/entities/meetingType";
import { GetMeetingTypeUseCase, GetMeetingTypeCommand } from "@/scolar/application/useCases/meetingTypes/getMeetingTypeUseCase";
import { UpdateMeetingTypeUseCase, UpdateMeetingTypeCommand } from "@/scolar/application/useCases/meetingTypes/updateMeetingTypeUseCase";
import { MEETING_TYPE_GET_USE_CASE, MEETING_TYPE_UPDATE_USE_CASE } from "@/scolar/domain/symbols/MeetingTypeSymbol";
import { MeetingTypeEditPresenter } from "./MeetingTypeEditPresenter";

export const MeetingTypeEditContainer = () => {
    const { id } = useParams<{ id: string }>();
    const getUseCase = useInjection<GetMeetingTypeUseCase>(MEETING_TYPE_GET_USE_CASE);
    const updateUseCase = useInjection<UpdateMeetingTypeUseCase>(MEETING_TYPE_UPDATE_USE_CASE);
    const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<UpdateMeetingTypeCommand>({
        defaultValues: { data: { id: Number(id), name: '', description: '' } }
    });
    const data = watch();

    const load = useCallback(() => {
        startTransition(() => {
            getUseCase.execute(new GetMeetingTypeCommand(Number(id))).then(res => {
                if (res.isLeft()) {
                    toast({ title: 'Error', description: 'No encontrado', variant: 'destructive' });
                    return;
                }
                const m = res.extract() as MeetingType;
                setValue('data.id', m.id);
                setValue('data.name', m.name);
                setValue('data.description', m.description);
            });
        });
    }, [getUseCase, id, setValue]);

    useEffect(() => { load(); }, [load]);

    const onSubmit = () => {
        startTransition(() => {
            updateUseCase.execute(new UpdateMeetingTypeCommand(data.data)).then(res => {
                if (res.isLeft()) {
                    toast({ title: 'Error', description: 'No se pudo actualizar', variant: 'destructive' });
                    return;
                }
                toast({ title: 'Actualizado', description: 'Tipo de reunión actualizado' });
            });
        });
    };
    const navigate = useNavigate();
    const onCancel = () => navigate('/tipos-reuniones');
    return <MeetingTypeEditPresenter onSubmit={handleSubmit(onSubmit)} onCancel={onCancel} register={register} errors={errors} isSubmitting={false} />;
};
