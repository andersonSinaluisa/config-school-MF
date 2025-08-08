import { toast } from "@/hooks/use-toast";
import { useInjection } from "inversify-react";
import { DeleteBehaviorScalePresenter } from "./DeleteBehaviorScalePresenter";
import { BehaviorScale } from "@/scolar/domain/entities/behaviorScale";
import { DeleteBehaviorScaleUseCase, DeleteBehaviorScaleCommand } from "@/scolar/application/useCases/behaviorScales/deleteBehaviorScaleUseCase";
import { BEHAVIOR_SCALE_DELETE_USE_CASE } from "@/scolar/domain/symbols/BehaviorScaleSymbol";

interface Props {
    behaviorScale: BehaviorScale;
    onConfirm: () => void;
}

export const DeleteBehaviorScaleContainer = ({ behaviorScale, onConfirm }: Props) => {
    const usecase = useInjection<DeleteBehaviorScaleUseCase>(BEHAVIOR_SCALE_DELETE_USE_CASE);
    const handleDelete = async () => {
        const res = await usecase.execute(new DeleteBehaviorScaleCommand(behaviorScale.id));
        if (res.isRight()) {
            toast({ title: 'Escala eliminada', description: 'La escala ha sido eliminada', variant: 'success' });
            onConfirm();
        } else {
            toast({ title: 'Error', description: 'No se pudo eliminar', variant: 'destructive' });
        }
    };
    return <DeleteBehaviorScalePresenter behaviorScale={behaviorScale} onConfirm={handleDelete} />;
};
