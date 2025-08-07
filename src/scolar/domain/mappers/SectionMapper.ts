import { SectionDto } from "../../infrastructure/dto/SectionDto";
import { Section } from "../entities/section";



export class SectionMapper {
    static toDomain(section: SectionDto): Section {
        return new Section(
            section.id,
            section.name,
            section.description,

        );
    }


    static toDto(section: SectionDto): Omit<Section, 'id'> {
        return {
            name: section.name,
           description: section.description,
           type: section.type,
        };
    }
        
    

}