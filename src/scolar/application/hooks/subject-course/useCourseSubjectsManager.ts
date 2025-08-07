import { useEffect, useState } from "react";
import { AssignSubjectToCourseUseCaseCommand } from "@/scolar/application/useCases/courses/assingSubjectToCourse";
import { Course } from "@/scolar/domain/entities/course";
import { Subject } from "@/scolar/domain/entities/subject";
import { CourseSubject } from "@/scolar/domain/entities/course_subject";
import { toast } from "@/hooks/use-toast";

export function useCourseSubjectsManager(course: Course, subjectsFromCourse: CourseSubject[]) {
    const [selectedSubjects, setSelectedSubjects] = useState(
      ()=>  new AssignSubjectToCourseUseCaseCommand(
            course.id,
           []
        )
    );

    useEffect(() => {
        setSelectedSubjects(new AssignSubjectToCourseUseCaseCommand(
            course.id,
            subjectsFromCourse.map(s => new CourseSubject(s.id, 
                course.id, s.subjectId, s.hoursPerWeek, s.isRequired,
                s.course, s.subject
            ))
        ));
    }, [course.id, subjectsFromCourse]);

  

    const addSubject = (subject: Subject) => {
        const exists = selectedSubjects.data.subjects.some(s => s.subjectId === subject.id);
        if (exists) {
            toast({
                title: "Error",
                description: "La materia ya está seleccionada.",
                variant: "destructive"
            });
            return;
        }

        const updated = new AssignSubjectToCourseUseCaseCommand(course.id, [
            ...selectedSubjects._list,
            new CourseSubject(0, course.id, subject.id, "0:00", false)
        ]);
        setSelectedSubjects(updated);
        toast({
            title: "Éxito",
            description: "Materia agregada al curso.",
            variant: "success"
        });
    };

    const removeSubject = (subject: CourseSubject) => {
        const updated = selectedSubjects._list.filter(s => s.subjectId !== subject.subjectId);
        setSelectedSubjects(new AssignSubjectToCourseUseCaseCommand(course.id, updated));
        toast({
            title: "Éxito",
            description: "Materia eliminada del curso.",
            variant: "success"
        });
    };

    const updateHours = (subject: CourseSubject) => {
        const updated = selectedSubjects._list.map(s => {
            return s.subjectId === subject.subjectId
                ? new CourseSubject(s.id, s.courseId, s.subjectId, subject.hoursPerWeek, s.isRequired)
                : s;
        });
        setSelectedSubjects(new AssignSubjectToCourseUseCaseCommand(course.id, updated));
        toast({
            title: "Éxito",
            description: "Horas actualizadas.",
            variant: "success"
        });
    };


   
    
    return {
        selectedSubjects,
        addSubject,
        removeSubject,
        updateHours
    };
}