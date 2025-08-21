import { useInjection } from "inversify-react"
import { COURSE_SUBJECT_LIST_FROM_COURSE_USECASE } from "@/scolar/domain/symbols/CourseSubjectSymbol";
import { ListSubjectFromCourseCommand, ListSubjectFromCourseUseCase } from "../../useCases/courses/listSubjectFromCourse";
import { useCallback, useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";
import { CourseSubject } from "@/scolar/domain/entities/course_subject";


export const useByCourseSubject = (
    courseId: number,
)=>{

    const listSubjectFilter = useInjection<ListSubjectFromCourseUseCase>(COURSE_SUBJECT_LIST_FROM_COURSE_USECASE);

    const [subject, setSubject] = useState<CourseSubject[]>([])

    const fetchSubjects = useCallback(async ()=>{
        const result = await listSubjectFilter.execute(
            new ListSubjectFromCourseCommand(courseId)
        )
        if(result.isLeft()){
            toast({
                title: "Error",
                description: result.extract().map(
                    e => e.getMessage()
                ).join(", "),
                variant: "destructive"
            })
            return;
        }
        const response = result.extract() as CourseSubject[]
        setSubject(response)
    },[listSubjectFilter,courseId])

    useEffect(()=>{
        fetchSubjects()
    }, [fetchSubjects])
    return subject;
}