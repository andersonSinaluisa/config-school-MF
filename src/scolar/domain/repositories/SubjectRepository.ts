import { PaginatedResult } from "@/scolar/infrastructure/dto/paginateDto";
import { SubjectDto } from "../../infrastructure/dto/SubjectDto";

export interface SubjectRepository {
    findAll(page: number, limit: number, search?: string, orderby?: string[]):
        Promise<PaginatedResult<SubjectDto>>;
    findById(id: number): Promise<SubjectDto>;
    create(subject: Omit<SubjectDto, 'id'>): Promise<SubjectDto>;
    update(id: number, subject: Omit<SubjectDto, 'id'>): Promise<SubjectDto>;
    delete(id: number): Promise<void>;
}