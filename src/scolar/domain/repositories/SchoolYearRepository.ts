import { PaginatedResult } from "@/scolar/infrastructure/dto/paginateDto";
import { SchoolYearDto } from "../../infrastructure/dto/SchoolYearDto";


export interface SchoolYearRepository {
    findAll(
        page: number,
        limit: number,
        search?: string,
        orderby?: string[],
        filters?: {
            name?: string;
            status?: string;
        },
    ): Promise<PaginatedResult<SchoolYearDto>>;
    findById(id: number): Promise<SchoolYearDto>;

    create(data: Omit<SchoolYearDto, 'id'>): Promise<SchoolYearDto>;
    update(id: number, data: Omit<SchoolYearDto, 'id'>): Promise<SchoolYearDto>;
    delete(id: number): Promise<void>;


}