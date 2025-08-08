import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AttendanceCode } from "@/scolar/domain/entities/attendanceCode";
import { Trash2 } from "lucide-react";

interface Props {
    attendanceCode: AttendanceCode;
    onConfirm: () => void;
}

export const DeleteAttendanceCodePresenter = ({ attendanceCode, onConfirm }: Props) => (
    <Dialog>
        <DialogTrigger asChild>
            <Button variant="ghost" size="icon">
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Eliminar</span>
            </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
            <DialogHeader>
                <DialogTitle>¿Eliminar código de asistencia?</DialogTitle>
                <DialogDescription>
                    Esta acción no se puede deshacer.
                    <br />
                    <strong>{attendanceCode.code}</strong>
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
