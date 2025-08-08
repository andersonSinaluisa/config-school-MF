import { toast } from "@/hooks/use-toast";
import { useInjection } from "inversify-react";
import { DeleteClassSchedulePresenter } from "./DeleteClassSchedulePresenter";
import { ClassSchedule } from "@/scolar/domain/entities/classSchedule";
import { DeleteClassScheduleCommand, DeleteClassScheduleUseCase } from "@/scolar/application/useCases/classSchedules/deleteClassScheduleUseCase";
import { CLASS_SCHEDULE_DELETE_USE_CASE } from "@/scolar/domain/symbols/ClassScheduleSymbol";

interface Props {
    schedule: ClassSchedule;
    onConfirm: () => void;
}

export const DeleteClassScheduleContainer = ({ schedule, onConfirm }: Props) => {
    const usecase = useInjection<DeleteClassScheduleUseCase>(CLASS_SCHEDULE_DELETE_USE_CASE);
    const handleDelete = async () => {
        const res = await usecase.execute(new DeleteClassScheduleCommand(schedule.id));
        if (res.isRight()) {
            toast({
                title: "Horario eliminado",
                description: "El horario ha sido eliminado correctamente",
                variant: "success",
            });
            onConfirm();
        } else {
            toast({
                title: "Error eliminando",
                description: "No se pudo eliminar el horario",
                variant: "destructive",
            });
        }
    };
    return <DeleteClassSchedulePresenter schedule={schedule} onConfirm={handleDelete} />;
};
