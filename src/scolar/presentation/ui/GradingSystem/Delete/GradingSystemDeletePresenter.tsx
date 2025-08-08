import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { GradingSystem } from "@/scolar/domain/entities/grading_system";
import { Trash } from "lucide-react";

interface Props {
    gradingSystem: GradingSystem;
    onConfirm: () => void;
}

export const GradingSystemDeletePresenter = ({ gradingSystem, onConfirm }: Props) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <button title="Eliminar" type="button" className="p-1 rounded-full hover:bg-primary-500 transition">
                    <Trash className="w-5 h-5 text-primary-200 hover:text-white" />
                </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>¿Eliminar sistema de calificación?</DialogTitle>
                    <DialogDescription>
                        <>Esta acción no se puede deshacer.<br />Sistema: <strong>{gradingSystem.name}</strong></>
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
};

