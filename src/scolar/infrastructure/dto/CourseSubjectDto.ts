import { CourseDto } from "./CourseDto";
import { SubjectDto } from "./SubjectDto";

export interface CourseSubjectDto {
    id: number;
    courseId: number;
    subjectId: number;
    hoursPerWeek: number;
    isRequired: boolean;
    course?: CourseDto;
    subject?: SubjectDto;

}