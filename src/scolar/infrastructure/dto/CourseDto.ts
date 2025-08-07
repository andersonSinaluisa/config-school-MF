import { LevelDto } from "./LevelDto";

export interface CourseDto {
    id: number;
    name: string;
    level_id: number;
    description: string;
    level: LevelDto
}