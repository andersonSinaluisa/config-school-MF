import { PaginatedResult } from "@/scolar/infrastructure/dto/paginateDto";
import { GradingTermDto } from "@/scolar/infrastructure/dto/GradingTermDto";

export interface GradingTermRepository {
    create(data: Omit<GradingTermDto, 'id'>): Promise<GradingTermDto>;
    update(id: number, data: Omit<GradingTermDto, 'id'>): Promise<GradingTermDto>;
    delete(id: number): Promise<void>;
    findAll(page: number, limit: number, search?: string, orderby?: string[]): Promise<PaginatedResult<GradingTermDto>>;
    findById(id: number): Promise<GradingTermDto>;
}
