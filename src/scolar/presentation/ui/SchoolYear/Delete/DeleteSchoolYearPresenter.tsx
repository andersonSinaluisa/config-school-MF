import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { SchoolYear } from "@/scolar/domain/entities/school_year"
import { Trash2 } from "lucide-react"

interface DeleteSchoolYearPresenterProps {
    schoolYear: SchoolYear
    onConfirm: () => void
}
export const DeleteSchoolYearPresenter = ({ schoolYear, onConfirm }: DeleteSchoolYearPresenterProps) => {
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
                        ¿Estás seguro de que deseas eliminar este periodo escolar?
                    </DialogTitle>
                    <DialogDescription>
                        <>
                            Esta acción no se puede deshacer.
                            <br />
                            Periodo escolar a eliminar: 
                            <br />
                            <strong>
                                {schoolYear.name} <br />
                                {schoolYear.startDate ? `Desde: ${new Date(schoolYear.startDate).toLocaleDateString()}` : "Fecha de inicio no definida"} <br />
                                {schoolYear.endDate ? `Hasta: ${new Date(schoolYear.endDate).toLocaleDateString()}` : "Fecha de fin no definida"}
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