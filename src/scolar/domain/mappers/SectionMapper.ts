import { SectionDto } from "../../infrastructure/dto/SectionDto";
import { Section } from "../entities/section";



export class SectionMapper {
    static toDomain(section: SectionDto): Section {
        return new Section(
            section.id,
            section.name,
            section.type,
            section.description,
            section.start_time,
            section.end_time,
            section.has_break,
            section.break_count,
            section.break_duration,
            section.days.split(','),
            section.class_duration
        );
    }

    static partialToDomain(section: Partial<SectionDto>): Section {
        return new Section(
            section.id || 0,
            section.name || "",
            section.type || "",
            section.description || "",
            section.start_time || "",
            section.end_time || "",
            section.has_break || false,
            section.break_count || 0,
            section.break_duration || "",
            section.days ? section.days.split(',') : [],
            section.class_duration || ""
        );
    }

    static toDto(section: SectionDto): Omit<Section, 'id'> {
        return {
            name: section.name,
           description: section.description,
           type: section.type,
            startTime: section.start_time,
            endTime: section.end_time,
            hasBreak: section.has_break,
            breakCount: section.break_count,
            breakDuration: section.break_duration,
            days: section.days.split(','),
            classDuration: section.class_duration
        };
    }
        
    

}