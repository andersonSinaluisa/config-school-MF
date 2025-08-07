import { PaginatedResult } from "@/scolar/infrastructure/dto/paginateDto";
import { CourseDto } from "../../infrastructure/dto/CourseDto";


export interface CourseRepository {

    findAll(page: number, limit: number, search?: string, orderby?: string[])
    : Promise<PaginatedResult<CourseDto>>;

    create(course: Omit<CourseDto, 'id'| 'level'>): Promise<CourseDto>;

    update(id: number, course: Omit<CourseDto, 'id' | 'level'>): Promise<CourseDto>;

    delete(id: number): Promise<void>;

    findById(id: number): Promise<CourseDto>;
}