import { PaginatedResult } from "@/scolar/infrastructure/dto/paginateDto";
import { EvaluationTypeDto } from "@/scolar/infrastructure/dto/EvaluationTypeDto";

export interface EvaluationTypeRepository {
    create(data: Omit<EvaluationTypeDto, 'id'>): Promise<EvaluationTypeDto>;
    update(id: number, data: Omit<EvaluationTypeDto, 'id'>): Promise<EvaluationTypeDto>;
    delete(id: number): Promise<void>;
    findAll(page: number, limit: number, search?: string, orderby?: string[]): Promise<PaginatedResult<EvaluationTypeDto>>;
    findById(id: number): Promise<EvaluationTypeDto>;
}
