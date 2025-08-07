import { PaginatedResult } from "@/scolar/infrastructure/dto/paginateDto";
import { ParallelDto } from "../../infrastructure/dto/ParrallelDto";


export interface ParallelRepository {
    findAll(page: number, limit: number, search?: string, orderby?: string[]): Promise<PaginatedResult<ParallelDto>>;
    create(data: Omit<ParallelDto, 'id'>): Promise<ParallelDto>;
    update(id: number, data: Omit<ParallelDto, 'id'>): Promise<ParallelDto>;
    delete(id: number): Promise<void>;
    findById(id: number): Promise<ParallelDto>;
    findByCourseId(page: number, limit: number, courseId: number, search?: string, orderby?: string[]): Promise<PaginatedResult<ParallelDto>>;
}