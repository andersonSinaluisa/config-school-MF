import { AxiosInstance } from "axios";
import { injectable } from "inversify";
import { PaginatedResult } from "@/scolar/infrastructure/dto/paginateDto";
import { ClassScheduleDto } from "../../dto/ClassScheduleDto";
import { ClassScheduleRepository } from "@/scolar/domain/repositories/ClassScheduleRepository";

@injectable()
export class ClassScheduleRepositoryImpl implements ClassScheduleRepository {
    constructor(private readonly http: AxiosInstance) {}

    async findAll(page: number, limit: number, search?: string, orderby?: string[]): Promise<PaginatedResult<ClassScheduleDto>> {
        const { data } = await this.http.get<PaginatedResult<ClassScheduleDto>>("/class-schedules/", {
            params: { page, limit, search, orderby },
        });
        return data;
    }
    async findById(id: number): Promise<ClassScheduleDto> {
        const { data } = await this.http.get<ClassScheduleDto>(`/class-schedules/${id}`);
        return data;
    }
    async create(entity: Omit<ClassScheduleDto, 'id'>): Promise<ClassScheduleDto> {
        const { data } = await this.http.post<ClassScheduleDto>("/class-schedules/", entity);
        return data;
    }
    async update(id: number, entity: Omit<ClassScheduleDto, 'id'>): Promise<ClassScheduleDto> {
        const { data } = await this.http.put<ClassScheduleDto>(`/class-schedules/${id}`, entity);
        return data;
    }
    async delete(id: number): Promise<void> {
        await this.http.delete(`/class-schedules/${id}`);
    }
}
