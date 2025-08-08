import { useInjection } from "inversify-react";
import { toast } from "@/hooks/use-toast";
import { GradingSystem } from "@/scolar/domain/entities/grading_system";
import { GradingSystemDeletePresenter } from "./GradingSystemDeletePresenter";
import { DeleteGradingSystemUseCase, DeleteGradingSystemCommand } from "@/scolar/application/useCases/gradingSystems/deleteGradingSystemUseCase";
import { GRADING_SYSTEM_DELETE_USECASE } from "@/scolar/domain/symbols/GradingSystemSymbol";

interface Props {
    gradingSystem: GradingSystem;
    onConfirm: () => void;
}

export const GradingSystemDeleteContainer = ({ gradingSystem, onConfirm }: Props) => {
    const deleteGS = useInjection<DeleteGradingSystemUseCase>(GRADING_SYSTEM_DELETE_USECASE);

    const handleDelete = async () => {
        const res = await deleteGS.execute(new DeleteGradingSystemCommand(gradingSystem.id));
        if (res.isLeft()) {
            toast({ title: 'Error eliminando', description: 'No se pudo eliminar', variant: 'destructive' });
            return;
        }
        toast({ title: 'Sistema de calificación eliminado', description: 'Eliminado correctamente', variant: 'success' });
        onConfirm();
    };

    return <GradingSystemDeletePresenter gradingSystem={gradingSystem} onConfirm={handleDelete} />;
};

