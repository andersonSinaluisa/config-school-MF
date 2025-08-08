import { PaginatedResult } from "@/scolar/infrastructure/dto/paginateDto";
import { GradingSystemRepository } from "@/scolar/domain/repositories/GradingSystemRepository";
import { GradingSystemDto } from "../../dto/GradingSystemDto";
import { AxiosInstance } from "axios";
import { injectable } from "inversify";

@injectable()
export class GradingSystemRepositoryImpl implements GradingSystemRepository {
    private readonly api: AxiosInstance;
    constructor(api: AxiosInstance) {
        this.api = api;
    }

    async create(data: Omit<GradingSystemDto, "id">): Promise<GradingSystemDto> {
        const response = await this.api.post<GradingSystemDto>("/grading-systems/", data);
        return response.data;
    }

    async update(id: number, data: Omit<GradingSystemDto, "id">): Promise<GradingSystemDto> {
        const response = await this.api.put<GradingSystemDto>(`/grading-systems/${id}/`, data);
        return response.data;
    }

    async delete(id: number): Promise<void> {
        await this.api.delete(`/grading-systems/${id}/`);
    }

    async findAll(page: number, limit: number, search?: string, orderby?: string[]): Promise<PaginatedResult<GradingSystemDto>> {
        const response = await this.api.get<PaginatedResult<GradingSystemDto>>("/grading-systems/", {
            params: {
                page,
                limit,
                search,
                orderby
            }
        });
        return response.data;
    }

    async findById(id: number): Promise<GradingSystemDto> {
        const response = await this.api.get<GradingSystemDto>(`/grading-systems/${id}/`);
        return response.data;
    }
}
