import { PaginatedResult } from "@/scolar/infrastructure/dto/paginateDto";
import { GradingTermRepository } from "@/scolar/domain/repositories/GradingTermRepository";
import { GradingTermDto } from "../../dto/GradingTermDto";
import { AxiosInstance } from "axios";
import { injectable } from "inversify";

@injectable()
export class GradingTermRepositoryImpl implements GradingTermRepository {
    private readonly api: AxiosInstance;
    constructor(api: AxiosInstance) {
        this.api = api;
    }

    async create(data: Omit<GradingTermDto, 'id'>): Promise<GradingTermDto> {
        const response = await this.api.post<GradingTermDto>("/grading-terms/", data);
        return response.data;
    }

    async update(id: number, data: Omit<GradingTermDto, 'id'>): Promise<GradingTermDto> {
        const response = await this.api.put<GradingTermDto>(`/grading-terms/${id}/`, data);
        return response.data;
    }

    async delete(id: number): Promise<void> {
        await this.api.delete(`/grading-terms/${id}`);
    }

    async findAll(page: number, limit: number, search?: string, orderby?: string[]): Promise<PaginatedResult<GradingTermDto>> {
        const response = await this.api.get<PaginatedResult<GradingTermDto>>("/grading-terms/", {
            params: {
                page,
                limit,
                search,
                orderby
            }
        });
        return response.data;
    }

    async findById(id: number): Promise<GradingTermDto> {
        const response = await this.api.get<GradingTermDto>(`/grading-terms/${id}/`);
        return response.data;
    }
}
