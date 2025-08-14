import { PaginatedResult } from "@/scolar/infrastructure/dto/paginateDto";
import { SectionRepository } from "@/scolar/domain/repositories/SectionRepository";
import { SectionDto } from "../../dto/SectionDto";
import { AxiosInstance } from "axios";
import { injectable } from "inversify";

@injectable()
export class SectionRepositoryImpl implements SectionRepository{

    constructor(private readonly http: AxiosInstance) {}
    async findAll(page: number, limit: number, search?: string, orderby?: string[]): Promise<PaginatedResult<SectionDto>> {
        const { data } = await this.http.get<PaginatedResult<SectionDto>>("/sections/", {
            params: {
                page,
                limit,
                search,
                orderby
            }
        });

        return data;
    }
    async findById(id: number): Promise<SectionDto> {
        const { data } = await this.http.get<SectionDto>(`/sections/${id}/`);
        return data;
    }
    async create(data: Omit<SectionDto, "id">): Promise<SectionDto> {
        const { data: section } = await this.http.post<SectionDto>("/sections/", data);
        return section;
    }
    async update(id: number, data: Omit<SectionDto, "id">): Promise<SectionDto> {
        const { data: section } = await this.http.put<SectionDto>(`/sections/${id}/`, data);
        return section;
    }
    async delete(id: number): Promise<void> {
        await this.http.delete(`/sections/${id}/`);
    }

}