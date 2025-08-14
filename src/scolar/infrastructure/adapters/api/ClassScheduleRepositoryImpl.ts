import { AxiosInstance } from "axios";
import { injectable } from "inversify";
import { PaginatedResult } from "@/scolar/infrastructure/dto/paginateDto";
import { ClassScheduleDto } from "../../dto/ClassScheduleDto";
import { ClassScheduleRepository } from "@/scolar/domain/repositories/ClassScheduleRepository";

@injectable()
export class ClassScheduleRepositoryImpl implements ClassScheduleRepository {
    constructor(private readonly http: AxiosInstance) {}

    async findAll(
        page: number,
        limit: number,
        search?: string,
        orderby?: string[],
        filters?: {
            course_id?: number;
            parallel_id?: number;
            school_year_id?: number;
            subject_id?: number;
            day_of_week?: number;
        },
    ): Promise<PaginatedResult<ClassScheduleDto>> {
        const { data } = await this.http.get<PaginatedResult<ClassScheduleDto>>("/class-schedules/", {
            params: { page, limit, search, orderby, ...(filters ?? {}) },
        });
        return data;
    }
    async findById(id: number): Promise<ClassScheduleDto> {
        const { data } = await this.http.get<ClassScheduleDto>(`/class-schedules/${id}/`);
        return data;
    }
    async create(entity: Omit<ClassScheduleDto, "id">): Promise<ClassScheduleDto> {
        const { data } = await this.http.post<ClassScheduleDto>("/class-schedules/", entity);
        return data;
    }
    async update(id: number, entity: Omit<ClassScheduleDto, "id">): Promise<ClassScheduleDto> {
        const { data } = await this.http.put<ClassScheduleDto>(`/class-schedules/${id}/`, entity);
        return data;
    }
    async delete(id: number): Promise<void> {
        await this.http.delete(`/class-schedules/${id}/`);
    }
}

