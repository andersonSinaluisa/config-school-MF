import { useInjection } from "inversify-react";
import { toast } from "@/hooks/use-toast";
import { EvaluationType } from "@/scolar/domain/entities/evaluation_type";
import { EvaluationTypeDeletePresenter } from "./EvaluationTypeDeletePresenter";
import { DeleteEvaluationTypeUseCase, DeleteEvaluationTypeCommand } from "@/scolar/application/useCases/evaluationTypes/deleteEvaluationTypeUseCase";
import { EVALUATION_TYPE_DELETE_USECASE } from "@/scolar/domain/symbols/EvaluationTypeSymbol";

interface Props {
    evaluationType: EvaluationType;
    onConfirm: () => void;
}

export const EvaluationTypeDeleteContainer = ({ evaluationType, onConfirm }: Props) => {
    const deleteEvalType = useInjection<DeleteEvaluationTypeUseCase>(EVALUATION_TYPE_DELETE_USECASE);

    const handleDelete = async () => {
        const res = await deleteEvalType.execute(new DeleteEvaluationTypeCommand(evaluationType.id));
        if (res.isLeft()) {
            toast({
                title: 'Error eliminando',
                description: 'No se pudo eliminar el tipo de evaluación',
                variant: 'destructive'
            });
            return;
        }
        toast({
            title: 'Tipo de evaluación eliminado',
            description: 'El tipo de evaluación se eliminó correctamente',
            variant: 'success'
        });
        onConfirm();
    };

    return <EvaluationTypeDeletePresenter evaluationType={evaluationType} onConfirm={handleDelete} />;
};

