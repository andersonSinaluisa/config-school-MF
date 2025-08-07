import { PaginatedResult } from "@/scolar/infrastructure/dto/paginateDto";
import { GradingSystemDto } from "@/scolar/infrastructure/dto/GradingSystemDto";

export interface GradingSystemRepository {
    create(data: Omit<GradingSystemDto, 'id'>): Promise<GradingSystemDto>;
    update(id: number, data: Omit<GradingSystemDto, 'id'>): Promise<GradingSystemDto>;
    delete(id: number): Promise<void>;
    findAll(page: number, limit: number, search?: string, orderby?: string[]): Promise<PaginatedResult<GradingSystemDto>>;
    findById(id: number): Promise<GradingSystemDto>;
}
