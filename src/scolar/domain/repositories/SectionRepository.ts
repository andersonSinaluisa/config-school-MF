import { PaginatedResult } from "@/scolar/infrastructure/dto/paginateDto";
import { SectionDto } from "../../infrastructure/dto/SectionDto";


export interface SectionRepository{
    findAll(
        page: number,
        limit: number,
        search?: string,
        orderby?: string[]
    ): Promise<PaginatedResult<SectionDto>>;

    findById(id: number): Promise<SectionDto>;

    create(data: Omit<SectionDto, 'id'>): Promise<SectionDto>;

    update(id: number, data: Omit<SectionDto, 'id'>): Promise<SectionDto>;

    delete(id: number): Promise<void>; 
}