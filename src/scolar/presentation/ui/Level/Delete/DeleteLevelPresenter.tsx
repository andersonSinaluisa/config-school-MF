import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Level } from "@/scolar/domain/entities/level"
import {  Trash2 } from "lucide-react"

interface DeleteLevelPresenterProps {
    level: Level
    onConfirm: () => void
}
export const DeleteLevelPresenter = ({ level, onConfirm }: DeleteLevelPresenterProps) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant="ghost" size="icon"
                >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Eliminar</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>
                        ¿Estás seguro de que deseas eliminar este nivel escolar?
                    </DialogTitle>
                    <DialogDescription>
                        <>
                            Esta acción no se puede deshacer.
                            <br />
                            Nivel escolar a eliminar:
                            <br />
                            <strong>
                                {level.name} <br />
                                {level.description ? `Descripción: ${level.description}` : "Descripción no definida"} <br />
                            </strong>

                        </>
                    </DialogDescription>
                </DialogHeader>
                <div className="flex items-center space-x-2">

                </div>
                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                        <Button type="button" variant="destructive"
                            onClick={onConfirm}
                        >
                            Confirmar
                        </Button>
                    </DialogClose>
                    <Button type="button" variant="outline">
                        Cancelar
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}