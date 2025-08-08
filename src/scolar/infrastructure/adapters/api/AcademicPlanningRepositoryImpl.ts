import { AxiosInstance } from "axios";
import { injectable } from "inversify";
import { PaginatedResult } from "@/scolar/infrastructure/dto/paginateDto";
import { AcademicPlanningDto } from "../../dto/AcademicPlanningDto";
import { AcademicPlanningRepository } from "@/scolar/domain/repositories/AcademicPlanningRepository";

@injectable()
export class AcademicPlanningRepositoryImpl implements AcademicPlanningRepository {
    constructor(private readonly http: AxiosInstance) {}

    async findAll(page: number, limit: number, search?: string, orderby?: string[]): Promise<PaginatedResult<AcademicPlanningDto>> {
        const { data } = await this.http.get<PaginatedResult<AcademicPlanningDto>>("/academic-plannings/", {
            params: { page, limit, search, orderby },
        });
        return data;
    }
    async findById(id: number): Promise<AcademicPlanningDto> {
        const { data } = await this.http.get<AcademicPlanningDto>(`/academic-plannings/${id}`);
        return data;
    }
    async create(entity: Omit<AcademicPlanningDto, 'id'>): Promise<AcademicPlanningDto> {
        const { data } = await this.http.post<AcademicPlanningDto>("/academic-plannings/", entity);
        return data;
    }
    async update(id: number, entity: Omit<AcademicPlanningDto, 'id'>): Promise<AcademicPlanningDto> {
        const { data } = await this.http.put<AcademicPlanningDto>(`/academic-plannings/${id}`, entity);
        return data;
    }
    async delete(id: number): Promise<void> {
        await this.http.delete(`/academic-plannings/${id}`);
    }
}
