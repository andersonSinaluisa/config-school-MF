import { useInjection } from "inversify-react";
import { toast } from "@/hooks/use-toast";
import { GradingTerm } from "@/scolar/domain/entities/grading_term";
import { GradingTermDeletePresenter } from "./GradingTermDeletePresenter";
import { DeleteGradingTermUseCase, DeleteGradingTermCommand } from "@/scolar/application/useCases/gradingTerms/deleteGradingTermUseCase";
import { GRADING_TERM_DELETE_USECASE } from "@/scolar/domain/symbols/GradingTermSymbol";

interface Props {
    gradingTerm: GradingTerm;
    onConfirm: () => void;
}

export const GradingTermDeleteContainer = ({ gradingTerm, onConfirm }: Props) => {
    const deleteGT = useInjection<DeleteGradingTermUseCase>(GRADING_TERM_DELETE_USECASE);

    const handleDelete = async () => {
        const res = await deleteGT.execute(new DeleteGradingTermCommand(gradingTerm.id));
        if (res.isLeft()) {
            toast({ title: 'Error eliminando', description: 'No se pudo eliminar', variant: 'destructive' });
            return;
        }
        toast({ title: 'Período eliminado', description: 'Eliminado correctamente', variant: 'success' });
        onConfirm();
    };

    return <GradingTermDeletePresenter gradingTerm={gradingTerm} onConfirm={handleDelete} />;
};

