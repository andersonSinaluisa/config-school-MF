import { toast } from "@/hooks/use-toast";
import { useInjection } from "inversify-react";
import { DeleteAcademicPlanningPresenter } from "./DeleteAcademicPlanningPresenter";
import { AcademicPlanning } from "@/scolar/domain/entities/academicPlanning";
import { DeleteAcademicPlanningCommand, DeleteAcademicPlanningUseCase } from "@/scolar/application/useCases/academicPlannings/deleteAcademicPlanningUseCase";
import { ACADEMIC_PLANNING_DELETE_USE_CASE } from "@/scolar/domain/symbols/AcademicPlanningSymbol";

interface Props {
    planning: AcademicPlanning;
    onConfirm: () => void;
}

export const DeleteAcademicPlanningContainer = ({ planning, onConfirm }: Props) => {
    const usecase = useInjection<DeleteAcademicPlanningUseCase>(ACADEMIC_PLANNING_DELETE_USE_CASE);
    const handleDelete = async () => {
        const res = await usecase.execute(new DeleteAcademicPlanningCommand(planning.id));
        if (res.isRight()) {
            toast({
                title: "Planificación eliminada",
                description: "La planificación ha sido eliminada correctamente",
                variant: "success",
            });
            onConfirm();
        } else {
            toast({
                title: "Error eliminando",
                description: "No se pudo eliminar la planificación",
                variant: "destructive",
            });
        }
    };
    return <DeleteAcademicPlanningPresenter planning={planning} onConfirm={handleDelete} />;
};
