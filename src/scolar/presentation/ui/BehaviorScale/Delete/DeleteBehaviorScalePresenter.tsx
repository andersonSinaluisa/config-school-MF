import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { BehaviorScale } from "@/scolar/domain/entities/behaviorScale";
import { Trash2 } from "lucide-react";

interface Props {
    behaviorScale: BehaviorScale;
    onConfirm: () => void;
}

export const DeleteBehaviorScalePresenter = ({ behaviorScale, onConfirm }: Props) => (
    <Dialog>
        <DialogTrigger asChild>
            <Button variant="ghost" size="icon">
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Eliminar</span>
            </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
            <DialogHeader>
                <DialogTitle>¿Eliminar escala de comportamiento?</DialogTitle>
                <DialogDescription>
                    Esta acción no se puede deshacer.
                    <br />
                    <strong>{behaviorScale.name}</strong>
                </DialogDescription>
            </DialogHeader>
            <DialogFooter className="sm:justify-start">
                <DialogClose asChild>
                    <Button type="button" variant="destructive" onClick={onConfirm}>Confirmar</Button>
                </DialogClose>
                <Button type="button" variant="outline">Cancelar</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
);
