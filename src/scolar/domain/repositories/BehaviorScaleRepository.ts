import { PaginatedResult } from "@/scolar/infrastructure/dto/paginateDto";
import { BehaviorScaleDto } from "../../infrastructure/dto/BehaviorScaleDto";

export interface BehaviorScaleRepository {
    findAll(page: number, limit: number, search?: string, orderby?: string[]): Promise<PaginatedResult<BehaviorScaleDto>>;
    findById(id: number): Promise<BehaviorScaleDto>;
    create(data: Omit<BehaviorScaleDto, 'id'>): Promise<BehaviorScaleDto>;
    update(id: number, data: Omit<BehaviorScaleDto, 'id'>): Promise<BehaviorScaleDto>;
    delete(id: number): Promise<void>;
}
