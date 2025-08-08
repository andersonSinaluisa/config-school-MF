import { toast } from "@/hooks/use-toast";
import { useInjection } from "inversify-react";
import { DeleteMeetingTypePresenter } from "./DeleteMeetingTypePresenter";
import { MeetingType } from "@/scolar/domain/entities/meetingType";
import { DeleteMeetingTypeCommand, DeleteMeetingTypeUseCase } from "@/scolar/application/useCases/meetingTypes/deleteMeetingTypeUseCase";
import { MEETING_TYPE_DELETE_USE_CASE } from "@/scolar/domain/symbols/MeetingTypeSymbol";

interface Props {
    meetingType: MeetingType;
    onConfirm: () => void;
}

export const DeleteMeetingTypeContainer = ({ meetingType, onConfirm }: Props) => {
    const usecase = useInjection<DeleteMeetingTypeUseCase>(MEETING_TYPE_DELETE_USE_CASE);
    const handleDelete = async () => {
        const res = await usecase.execute(new DeleteMeetingTypeCommand(meetingType.id));
        if (res.isRight()) {
            toast({
                title: "Tipo de reunión eliminado",
                description: "El tipo de reunión ha sido eliminado correctamente",
                variant: "success",
            });
            onConfirm();
        } else {
            toast({
                title: "Error eliminando",
                description: "No se pudo eliminar el tipo de reunión",
                variant: "destructive",
            });
        }
    };
    return <DeleteMeetingTypePresenter meetingType={meetingType} onConfirm={handleDelete} />;
};
