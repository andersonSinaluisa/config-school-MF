import { PaginatedResult } from "@/scolar/infrastructure/dto/paginateDto";
import { LevelDto } from "../../infrastructure/dto/LevelDto";


export interface LevelRepository {
    create(data: Omit<LevelDto, 'id'>): Promise<LevelDto>;
    update(id: number, data: Omit<LevelDto, 'id'>): Promise<LevelDto>;
    delete(id: number): Promise<void>;
    findAll(page: number, limit: number, search?: string, orderby?: string[]): Promise<PaginatedResult<LevelDto>>;
    findById(id: number): Promise<LevelDto>;
    
}