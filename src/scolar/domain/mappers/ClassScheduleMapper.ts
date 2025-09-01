import { ClassScheduleDto } from "@/scolar/infrastructure/dto/ClassScheduleDto";
import { ClassSchedule } from "../entities/classSchedule";
import { CourseMapper } from "./CourseMapper";
import { SubjectMapper } from "./SubjectMapper";
import { SchoolYearMapper } from "./SchoolYearMapper";

export class ClassScheduleMapper {
    static toDomain(dto: ClassScheduleDto): ClassSchedule {
        return new ClassSchedule(
            dto.id,
            dto.course_id,
            dto.parallel_id,
            dto.school_year_id,
            dto.subject_id,
            dto.day_of_week,
            dto.start_time,
            dto.end_time,
            dto.course ? CourseMapper.toDomain(dto.course) : undefined,
            dto.subject ? SubjectMapper.toDomain(dto.subject) : undefined,
            dto.school_year ? SchoolYearMapper.toDomain(dto.school_year) : undefined
        );
    }
    static toDto(entity: ClassSchedule): Omit<ClassScheduleDto, 'id'> {
        return {
            course_id: entity.courseId,
            parallel_id: entity.parallelId,
            school_year_id: entity.schoolYearId,
            subject_id: entity.subjectId,
            day_of_week: entity.dayOfWeek,
            start_time: entity.startTime,
            end_time: entity.endTime,
        };
    }
}
