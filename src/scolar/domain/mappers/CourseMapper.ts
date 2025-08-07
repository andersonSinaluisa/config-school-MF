import { CourseDto } from "../../infrastructure/dto/CourseDto";
import { Course } from "../entities/course";


export class CourseMapper {
    
    static toDomain(dto: CourseDto): Course {
        return new Course(
            dto.id,
            dto.name,
            dto.level_id,
            dto.description,
            dto.level
        );
    }

    static toDto(entity: Course): Omit<CourseDto, 'id'|'level'> {
        return {
            name: entity.name,
            level_id: entity.level_id,
            description: entity.description,
        };
    }
}