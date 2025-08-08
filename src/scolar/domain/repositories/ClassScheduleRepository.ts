import { PaginatedResult } from "@/scolar/infrastructure/dto/paginateDto";
import { ClassScheduleDto } from "../../infrastructure/dto/ClassScheduleDto";

export interface ClassScheduleRepository {
    findAll(page: number, limit: number, search?: string, orderby?: string[]): Promise<PaginatedResult<ClassScheduleDto>>;
    findById(id: number): Promise<ClassScheduleDto>;
    create(data: Omit<ClassScheduleDto, 'id'>): Promise<ClassScheduleDto>;
    update(id: number, data: Omit<ClassScheduleDto, 'id'>): Promise<ClassScheduleDto>;
    delete(id: number): Promise<void>;
}
