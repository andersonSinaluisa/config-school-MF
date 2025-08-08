import { GradingTermDto } from "@/scolar/infrastructure/dto/GradingTermDto";
import { GradingTerm } from "../entities/grading_term";

export class GradingTermMapper {
    static toDomain(gt: GradingTermDto): GradingTerm {
        return new GradingTerm(
            gt.id,
            gt.gradingSystem_id,
            gt.academicYear_id,
            gt.name,
            gt.order,
            gt.weight
        );
    }

    static toDto(gt: GradingTerm): Omit<GradingTermDto, 'id'> {
        return {
            gradingSystem_id: gt.gradingSystem_id,
            academicYear_id: gt.academicYear_id,
            name: gt.name,
            order: gt.order,
            weight: gt.weight
        };
    }
}
