import { PaginatedResult } from "@/scolar/infrastructure/dto/paginateDto";
import { EvaluationTypeRepository } from "@/scolar/domain/repositories/EvaluationTypeRepository";
import { EvaluationTypeDto } from "../../dto/EvaluationTypeDto";
import { AxiosInstance } from "axios";
import { injectable } from "inversify";

@injectable()
export class EvaluationTypeRepositoryImpl implements EvaluationTypeRepository {
    private readonly api: AxiosInstance;
    constructor(api: AxiosInstance) {
        this.api = api;
    }

    async create(data: Omit<EvaluationTypeDto, 'id'>): Promise<EvaluationTypeDto> {
        const response = await this.api.post<EvaluationTypeDto>("/evaluation-types/", data);
        return response.data;
    }

    async update(id: number, data: Omit<EvaluationTypeDto, 'id'>): Promise<EvaluationTypeDto> {
        const response = await this.api.put<EvaluationTypeDto>(`/evaluation-types/${id}/`, data);
        return response.data;
    }

    async delete(id: number): Promise<void> {
        await this.api.delete(`/evaluation-types/${id}/`);
    }

    async findAll(page: number, limit: number, search?: string, orderby?: string[]): Promise<PaginatedResult<EvaluationTypeDto>> {
        const response = await this.api.get<PaginatedResult<EvaluationTypeDto>>("/evaluation-types/", {
            params: {
                page,
                limit,
                search,
                orderby
            }
        });
        return response.data;
    }

    async findById(id: number): Promise<EvaluationTypeDto> {
        const response = await this.api.get<EvaluationTypeDto>(`/evaluation-types/${id}/`);
        return response.data;
    }
}
