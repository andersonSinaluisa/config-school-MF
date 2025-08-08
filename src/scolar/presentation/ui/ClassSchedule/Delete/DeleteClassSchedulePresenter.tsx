import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ClassSchedule } from "@/scolar/domain/entities/classSchedule";
import { Trash2 } from "lucide-react";

interface Props {
    schedule: ClassSchedule;
    onConfirm: () => void;
}

export const DeleteClassSchedulePresenter = ({ schedule, onConfirm }: Props) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Eliminar</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>¿Eliminar horario?</DialogTitle>
                    <DialogDescription>
                        Esta acción no se puede deshacer.
                        <br />
                        <strong>{schedule.dayOfWeek} {schedule.startTime}-{schedule.endTime}</strong>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                        <Button type="button" variant="destructive" onClick={onConfirm}>
                            Confirmar
                        </Button>
                    </DialogClose>
                    <Button type="button" variant="outline">
                        Cancelar
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
