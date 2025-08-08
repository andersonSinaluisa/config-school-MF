import { PaginatedResult } from "@/scolar/infrastructure/dto/paginateDto";
import { AttendanceCodeDto } from "../../infrastructure/dto/AttendanceCodeDto";

export interface AttendanceCodeRepository {
    findAll(page: number, limit: number, search?: string, orderby?: string[]): Promise<PaginatedResult<AttendanceCodeDto>>;
    findById(id: number): Promise<AttendanceCodeDto>;
    create(data: Omit<AttendanceCodeDto, 'id'>): Promise<AttendanceCodeDto>;
    update(id: number, data: Omit<AttendanceCodeDto, 'id'>): Promise<AttendanceCodeDto>;
    delete(id: number): Promise<void>;
}
