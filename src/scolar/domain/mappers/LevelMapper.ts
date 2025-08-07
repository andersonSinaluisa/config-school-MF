import { LevelDto } from "../../infrastructure/dto/LevelDto";
import { Level } from "../entities/level";


export class LevelMapper {
    static toDomain(level: LevelDto): Level{
        return new Level(
            level.id,
            level.name,
            level.description,
            level.order
        );
    }

    static toDto(level: Level): Omit<LevelDto, 'id'> {
        return {
            name: level.name,
            description: level.description,
            order: level.order
        };
    }
}