
import { toast } from "@/hooks/use-toast"
import { AssignSubjectToCourseUseCase } from "@/scolar/application/useCases/courses/assingSubjectToCourse"
import { useInjection } from "inversify-react"
import { useTransition } from "react"
import { SubjectCoursePresenter } from "./SubjectCoursePresenter"

import { PaginateUseCaseCommand } from "@/scolar/application/useCases/useCase"
import { COURSE_SUBJECT_ASSIGN_TO_COURSE_USECASE } from "@/scolar/domain/symbols/CourseSubjectSymbol"
import { useCourseSubjectsManager } from "@/scolar/application/hooks/subject-course/useCourseSubjectsManager"
import { useCourseWithSubjectsData } from "@/scolar/application/hooks/subject-course/useCourseWithSubjectsData"
import { useNavigate, useParams } from "react-router-dom"



export const SubjectCourseContainer = () => {
    const { id } = useParams<{ id: string }>();
    const assignSubjectToCourse = useInjection<AssignSubjectToCourseUseCase>(COURSE_SUBJECT_ASSIGN_TO_COURSE_USECASE);




    const {
        course,
        allSubjects,
        
        setPaginateCommand,
        paginateCommand,
        subjectsFromCourse
    } = useCourseWithSubjectsData(Number(id));
    const {
        selectedSubjects,
        addSubject,
        removeSubject,
        updateHours
    } = useCourseSubjectsManager(course, subjectsFromCourse);
    
    const [isPending, startTransition] = useTransition()


    const navigate = useNavigate();
    const handleSubmit = () => {

        startTransition( () => {
            assignSubjectToCourse.execute(selectedSubjects).then(res => {
                if (res.isLeft()) {
                    toast({
                        title: "Error",
                        description: "No se pudieron asignar las materias al curso.",
                        variant: "destructive"
                    });
                    return;
                }
                toast({
                    title: "Éxito",
                    description: "Materias asignadas al curso.",
                    variant: "success"
                });
                navigate("/cursos");
            })
        }
        )
    }

    
    return (
        <SubjectCoursePresenter
            course={course}
            handleSubmit={handleSubmit}
            isSubmitting={isPending}
            onBack={() => window.history.back()}
            key={`subject-course-${id}`}
            subjectList={allSubjects}
            onSearch={(searchTerm: string) => setPaginateCommand(
                new PaginateUseCaseCommand(paginateCommand.data.page, 10, ["id"], searchTerm)
            )}
            onPaginate={(page: number) => setPaginateCommand(
                new PaginateUseCaseCommand(page, 10, ["id"], paginateCommand.data.search)
            )}
            selectedSubjects={selectedSubjects._list}
            onAddSubject={addSubject}
            onChangeHours={updateHours}
            onRemoveSubject={removeSubject}
        />
    )

}