import { AcademicPlanningDto } from "@/scolar/infrastructure/dto/AcademicPlanningDto";
import { AcademicPlanning } from "../entities/academicPlanning";

export class AcademicPlanningMapper {
    static toDomain(dto: AcademicPlanningDto): AcademicPlanning {
        return new AcademicPlanning(
            dto.id,
            dto.course_id,
            dto.parallel_id,
            dto.school_year_id,
            dto.subject_id,
            dto.topic,
            dto.start_date,
            dto.end_date,
            dto.description,
        );
    }
    static toDto(entity: AcademicPlanning): Omit<AcademicPlanningDto, 'id'> {
        return {
            course_id: entity.courseId,
            parallel_id: entity.parallelId,
            school_year_id: entity.schoolYearId,
            subject_id: entity.subjectId,
            topic: entity.topic,
            start_date: entity.startDate,
            end_date: entity.endDate,
            description: entity.description,
        };
    }
}
