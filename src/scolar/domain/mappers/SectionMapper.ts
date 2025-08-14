import { SectionDto } from "../../infrastructure/dto/SectionDto";
import { Section } from "../entities/section";



export class SectionMapper {
    static toDomain(section: SectionDto): Section {
        return new Section(
            section.id,
            section.name,
            section.type,
            section.description,
            section.startTime,
            section.endTime,
            section.hasBreak,
            section.breakCount,
            section.breakDuration,
            section.days.split(',')
        );
    }

    static partialToDomain(section: Partial<SectionDto>): Section {
        return new Section(
            section.id || 0,
            section.name || "",
            section.type || "",
            section.description || "",
            section.startTime || "",
            section.endTime || "",
            section.hasBreak || false,
            section.breakCount || 0,
            section.breakDuration || "",
            section.days ? section.days.split(',') : []
        );
    }

    static toDto(section: SectionDto): Omit<Section, 'id'> {
        return {
            name: section.name,
           description: section.description,
           type: section.type,
            startTime: section.startTime,
            endTime: section.endTime,
            hasBreak: section.hasBreak,
            breakCount: section.breakCount,
            breakDuration: section.breakDuration,
            days: section.days.split(',')
        };
    }
        
    

}