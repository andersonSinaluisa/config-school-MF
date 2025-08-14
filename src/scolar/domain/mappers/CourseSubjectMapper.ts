import { CourseSubjectDto } from "../../infrastructure/dto/CourseSubjectDto";
import { CourseSubject } from "../entities/course_subject";
import { CourseMapper } from "./CourseMapper";
import { SubjectMapper } from "./SubjectMapper";


export class CourseSubjectMapper {
    static toDomain(data: CourseSubjectDto): CourseSubject {
        return new CourseSubject(
            data.id,
            data.courseId,
            data.subjectId,
            data.hoursPerWeek.toString(),
            data.isRequired,
            data.course ? CourseMapper.toDomain(data.course) : undefined,
            data.subject ? SubjectMapper.toDomain(data.subject) : undefined,
        );
    }


    static toDto(data: CourseSubject): Omit<CourseSubjectDto, 'course' | 'subject'|'id'> {
        return {
            courseId: data.courseId,
            subjectId: data.subjectId,
            hoursPerWeek:data.hoursPerWeek,
            isRequired: data.isRequired,
        };
    }

    static toBulkDto(data: Omit<CourseSubject, 'id' | 'courseId'>): Omit<CourseSubjectDto, 'id' | 'courseId'> {
        return {
            subjectId: data.subjectId,
            isRequired: data.isRequired,
            hoursPerWeek: data.hoursPerWeek,
        };
    }

}