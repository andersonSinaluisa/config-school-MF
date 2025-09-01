import { SectionBreakDto } from "@/scolar/infrastructure/dto/SectionBreakDto";
import { SectionBreak } from "../entities/sectionBreak";

export class SectionBreakMapper {
    static toDomain(dto: SectionBreakDto): SectionBreak {
        return new SectionBreak(
            dto.id,
            dto.section_id,
            dto.day,
            dto.start_time,
            dto.end_time,
        );
    }

    static toDto(entity: SectionBreak): Omit<SectionBreakDto, 'id'> {
        return {
            section_id: entity.sectionId,
            day: entity.day,
            start_time: entity.startTime,
            end_time: entity.endTime,
        };
    }
}

