import { AxiosInstance } from "axios";
import { injectable } from "inversify";
import { PaginatedResult } from "@/scolar/infrastructure/dto/paginateDto";
import { MeetingTypeDto } from "../../dto/MeetingTypeDto";
import { MeetingTypeRepository } from "@/scolar/domain/repositories/MeetingTypeRepository";

@injectable()
export class MeetingTypeRepositoryImpl implements MeetingTypeRepository {
    constructor(private readonly http: AxiosInstance) {}

    async findAll(page: number, limit: number, search?: string, orderby?: string[]): Promise<PaginatedResult<MeetingTypeDto>> {
        const { data } = await this.http.get<PaginatedResult<MeetingTypeDto>>("/meeting-types/", {
            params: { page, limit, search, orderby },
        });
        return data;
    }
    async findById(id: number): Promise<MeetingTypeDto> {
        const { data } = await this.http.get<MeetingTypeDto>(`/meeting-types/${id}`);
        return data;
    }
    async create(entity: Omit<MeetingTypeDto, 'id'>): Promise<MeetingTypeDto> {
        const { data } = await this.http.post<MeetingTypeDto>("/meeting-types/", entity);
        return data;
    }
    async update(id: number, entity: Omit<MeetingTypeDto, 'id'>): Promise<MeetingTypeDto> {
        const { data } = await this.http.put<MeetingTypeDto>(`/meeting-types/${id}`, entity);
        return data;
    }
    async delete(id: number): Promise<void> {
        await this.http.delete(`/meeting-types/${id}`);
    }
}
