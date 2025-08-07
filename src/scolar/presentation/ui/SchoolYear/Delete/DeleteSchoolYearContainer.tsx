import { toast } from "@/hooks/use-toast"
import { DeleteSchoolYearUseCase, DeleteSchoolYearUseCaseCommand } from "@/scolar/application/useCases/schoolYears/deleteSchoolYearUseCase"
import { SchoolYear } from "@/scolar/domain/entities/school_year"
import { SCHOOL_YEAR_DELETE_USE_CASE } from "@/scolar/domain/symbols/SchoolYearSymbol"
import { useInjection } from "inversify-react"
import { DeleteSchoolYearPresenter } from "./DeleteSchoolYearPresenter"

interface DeleteAppContainer {
    course:SchoolYear
    onConfirm: () => void
}
export const DeleteSchoolYearContainer = (props: DeleteAppContainer) => {
    const deleteCourse = useInjection<DeleteSchoolYearUseCase>(SCHOOL_YEAR_DELETE_USE_CASE)
    const onDeleteApp = async () => {
        const res = await deleteCourse.execute(new DeleteSchoolYearUseCaseCommand(props.course.id))
        if (res.isRight()) {
            props.onConfirm()
            toast({
                title: "Periodo escolar eliminado",
                description: "El periodo escolar ha sido eliminado correctamente",
                duration: 2000,
                variant: "success"
            })
            return;
        } else {
            toast({
                title: "Error eliminando el periodo escolar",
                description: "No se ha podido eliminar el periodo escolar",
                duration: 2000,
                variant: "destructive"
            })
        }

    }
    return (
        <DeleteSchoolYearPresenter
            schoolYear={props.course}
            onConfirm={onDeleteApp}
        />
    )
}