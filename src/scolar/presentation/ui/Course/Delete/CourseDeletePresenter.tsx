import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Course } from "@/scolar/domain/entities/course"
import { Trash } from "lucide-react"

interface CourseDeletePresenterProps {
    curso: Course
    onConfirm: () => void
}
export const CourseDeletePresenter = (  { curso, onConfirm }: CourseDeletePresenterProps) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <button 
                title="Eliminar curso"
                    type="button"
                    className="absolute top-3 right-3 p-1 rounded-full hover:bg-primary-500 transition"
                >
                    
                    <Trash className="w-5 h-5 text-primary-200 hover:text-white" />
                </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>
                        ¿Estás seguro de que deseas eliminar este curso?
                    </DialogTitle>
                    <DialogDescription>
                        <>
                            Esta acción no se puede deshacer.
                            <br />
                            Curso a eliminar: <strong>
                                {curso.name}
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