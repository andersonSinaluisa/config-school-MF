import { AxiosInstance } from "axios";
import { injectable } from "inversify";
import { PaginatedResult } from "@/scolar/infrastructure/dto/paginateDto";
import { SectionBreakDto } from "@/scolar/infrastructure/dto/SectionBreakDto";
import { SectionBreakRepository } from "@/scolar/domain/repositories/SectionBreakRepository";

@injectable()
export class SectionBreakRepositoryImpl implements SectionBreakRepository {
    constructor(private readonly http: AxiosInstance) {}

    async findAll(page: number, limit: number, filters?: { section_id?: number }): Promise<PaginatedResult<SectionBreakDto>> {
        const { data } = await this.http.get<PaginatedResult<SectionBreakDto>>("/section-breaks/", {
            params: {
                page,
                limit,
                section_id: filters?.section_id,
            },
        });
        return data;
    }

    async findById(id: number): Promise<SectionBreakDto> {
        const { data } = await this.http.get<SectionBreakDto>(`/section-breaks/${id}/`);
        return data;
    }

    async create(entity: Omit<SectionBreakDto, 'id'>): Promise<SectionBreakDto> {
        const { data } = await this.http.post<SectionBreakDto>("/section-breaks/", entity);
        return data;
    }

    async update(id: number, entity: Omit<SectionBreakDto, 'id'>): Promise<SectionBreakDto> {
        const { data } = await this.http.put<SectionBreakDto>(`/section-breaks/${id}/`, entity);
        return data;
    }

    async delete(id: number): Promise<void> {
        await this.http.delete(`/section-breaks/${id}/`);
    }
}

