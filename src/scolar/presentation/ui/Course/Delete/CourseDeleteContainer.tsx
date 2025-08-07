
import { useInjection } from "inversify-react"
import { CourseDeletePresenter } from "./CourseDeletePresenter"
import { DeleteCourseCommand, DeleteCourseUseCase } from "@/scolar/application/useCases/courses/deleteCourseUseCase"
import { COURSE_DELETE_USECASE } from "@/scolar/domain/symbols/CourseSymbol"
import { Course } from "@/scolar/domain/entities/course"
import { toast } from "@/hooks/use-toast"

interface DeleteAppContainer {
    course:Course
    onConfirm: () => void
}
export const CourseDeleteContainer = (props: DeleteAppContainer) => {
    const deleteCourse = useInjection<DeleteCourseUseCase>(COURSE_DELETE_USECASE)
    const onDeleteApp = async () => {
        const res = await deleteCourse.execute(new DeleteCourseCommand(props.course.id))
        if (res.isRight()) {
            props.onConfirm()
            toast({
                title: "Curso eliminado",
                description: "El curso ha sido eliminado correctamente",
                duration: 2000,
                variant: "success"
            })
            return;
        } else {
            toast({
                title: "Error eliminando curso",
                description: "No se ha podido eliminar el curso",
                duration: 2000,
                variant: "destructive"
            })
        }

    }
    return(
        <CourseDeletePresenter
            curso={props.course}
            onConfirm={onDeleteApp}
        />
    )
}