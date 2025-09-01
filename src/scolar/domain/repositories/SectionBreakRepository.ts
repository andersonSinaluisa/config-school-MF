import { PaginatedResult } from "@/scolar/infrastructure/dto/paginateDto";
import { SectionBreakDto } from "@/scolar/infrastructure/dto/SectionBreakDto";

export interface SectionBreakRepository {
    findAll(
        page: number,
        limit: number,
        filters?: { section_id?: number }
    ): Promise<PaginatedResult<SectionBreakDto>>;
    findById(id: number): Promise<SectionBreakDto>;
    create(data: Omit<SectionBreakDto, 'id'>): Promise<SectionBreakDto>;
    update(id: number, data: Omit<SectionBreakDto, 'id'>): Promise<SectionBreakDto>;
    delete(id: number): Promise<void>;
}

