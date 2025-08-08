import { PaginatedResult } from "@/scolar/infrastructure/dto/paginateDto";
import { AcademicPlanningDto } from "../../infrastructure/dto/AcademicPlanningDto";

export interface AcademicPlanningRepository {
    findAll(page: number, limit: number, search?: string, orderby?: string[]): Promise<PaginatedResult<AcademicPlanningDto>>;
    findById(id: number): Promise<AcademicPlanningDto>;
    create(data: Omit<AcademicPlanningDto, 'id'>): Promise<AcademicPlanningDto>;
    update(id: number, data: Omit<AcademicPlanningDto, 'id'>): Promise<AcademicPlanningDto>;
    delete(id: number): Promise<void>;
}
