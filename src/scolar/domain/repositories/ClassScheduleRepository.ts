import { PaginatedResult } from "@/scolar/infrastructure/dto/paginateDto";
import { ClassScheduleDto } from "../../infrastructure/dto/ClassScheduleDto";

export interface ClassScheduleRepository {
    findAll(
        page: number,
        limit: number,
        search?: string,
        orderby?: string[],
        filters?: {
            course_id?: number;
            parallel_id?: number;
            school_year_id?: number;
            subject_id?: number;
            day_of_week?: number;
        },
    ): Promise<PaginatedResult<ClassScheduleDto>>;
    findById(id: number): Promise<ClassScheduleDto>;
    create(data: Omit<ClassScheduleDto, 'id'>): Promise<ClassScheduleDto>;
    update(id: number, data: Omit<ClassScheduleDto, 'id'>): Promise<ClassScheduleDto>;
    delete(id: number): Promise<void>;
}
