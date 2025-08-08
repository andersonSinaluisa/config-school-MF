import { AxiosInstance } from "axios";
import { injectable } from "inversify";
import { PaginatedResult } from "@/scolar/infrastructure/dto/paginateDto";
import { AttendanceCodeDto } from "../../dto/AttendanceCodeDto";
import { AttendanceCodeRepository } from "@/scolar/domain/repositories/AttendanceCodeRepository";

@injectable()
export class AttendanceCodeRepositoryImpl implements AttendanceCodeRepository {
    constructor(private readonly http: AxiosInstance) {}

    async findAll(page: number, limit: number, search?: string, orderby?: string[]): Promise<PaginatedResult<AttendanceCodeDto>> {
        const { data } = await this.http.get<PaginatedResult<AttendanceCodeDto>>("/attendance-codes/", {
            params: { page, limit, search, orderby },
        });
        return data;
    }
    async findById(id: number): Promise<AttendanceCodeDto> {
        const { data } = await this.http.get<AttendanceCodeDto>(`/attendance-codes/${id}/`);
        return data;
    }
    async create(entity: Omit<AttendanceCodeDto, 'id'>): Promise<AttendanceCodeDto> {
        const { data } = await this.http.post<AttendanceCodeDto>("/attendance-codes/", entity);
        return data;
    }
    async update(id: number, entity: Omit<AttendanceCodeDto, 'id'>): Promise<AttendanceCodeDto> {
        const { data } = await this.http.put<AttendanceCodeDto>(`/attendance-codes/${id}/`, entity);
        return data;
    }
    async delete(id: number): Promise<void> {
        await this.http.delete(`/attendance-codes/${id}/`);
    }
}
