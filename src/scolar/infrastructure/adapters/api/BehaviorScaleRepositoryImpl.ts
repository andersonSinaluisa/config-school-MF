import { AxiosInstance } from "axios";
import { injectable } from "inversify";
import { PaginatedResult } from "@/scolar/infrastructure/dto/paginateDto";
import { BehaviorScaleDto } from "../../dto/BehaviorScaleDto";
import { BehaviorScaleRepository } from "@/scolar/domain/repositories/BehaviorScaleRepository";

@injectable()
export class BehaviorScaleRepositoryImpl implements BehaviorScaleRepository {
    constructor(private readonly http: AxiosInstance) {}

    async findAll(page: number, limit: number, search?: string, orderby?: string[]): Promise<PaginatedResult<BehaviorScaleDto>> {
        const { data } = await this.http.get<PaginatedResult<BehaviorScaleDto>>("/behavior-scales/", {
            params: { page, limit, search, orderby },
        });
        return data;
    }
    async findById(id: number): Promise<BehaviorScaleDto> {
        const { data } = await this.http.get<BehaviorScaleDto>(`/behavior-scales/${id}`);
        return data;
    }
    async create(entity: Omit<BehaviorScaleDto, 'id'>): Promise<BehaviorScaleDto> {
        const { data } = await this.http.post<BehaviorScaleDto>("/behavior-scales/", entity);
        return data;
    }
    async update(id: number, entity: Omit<BehaviorScaleDto, 'id'>): Promise<BehaviorScaleDto> {
        const { data } = await this.http.put<BehaviorScaleDto>(`/behavior-scales/${id}`, entity);
        return data;
    }
    async delete(id: number): Promise<void> {
        await this.http.delete(`/behavior-scales/${id}`);
    }
}
