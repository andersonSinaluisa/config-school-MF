import { PaginatedResult } from "@/scolar/infrastructure/dto/paginateDto";
import { LevelRepository } from "@/scolar/domain/repositories/LevelRepository";
import { LevelDto } from "../../dto/LevelDto";
import { AxiosInstance } from "axios";
import { injectable } from "inversify";

@injectable()
export class LevelRepositoryImpl implements LevelRepository{
    private readonly api: AxiosInstance;
    constructor(api:AxiosInstance) {
        this.api = api;
    }
    async create(data: Omit<LevelDto, "id">): Promise<LevelDto> {
        const response = await this.api.post<LevelDto>("/levels/", data);
        return response.data;
    }
    async update(id: number, data: Omit<LevelDto, "id">): Promise<LevelDto> {
        const response = await this.api.put<LevelDto>(`/levels/${id}`, data);
        return response.data;
    }
    async delete(id: number): Promise<void> {
        await this.api.delete(`/levels/${id}`);
    }
    async findAll(page: number, limit: number, search?: string, orderby?: string[]): Promise<PaginatedResult<LevelDto>> {
        const response = await this.api.get<PaginatedResult<LevelDto>>("/levels/", {
            params: {
                page,
                limit,
                search,
                orderby
            }
        });
        return response.data;
    }
    async findById(id: number): Promise<LevelDto> {
        const response = await this.api.get<LevelDto>(`/levels/${id}`);
        return response.data;
    }

}