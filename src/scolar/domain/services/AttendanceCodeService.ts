import { inject, injectable } from "inversify";
import { PaginatedResult } from "@/scolar/infrastructure/dto/paginateDto";
import { AttendanceCode } from "../entities/attendanceCode";
import { AttendanceCodeMapper } from "../mappers/AttendanceCodeMapper";
import { AttendanceCodeRepository } from "../repositories/AttendanceCodeRepository";
import { ATTENDANCE_CODE_REPOSITORY } from "../symbols/AttendanceCodeSymbol";

@injectable()
export class AttendanceCodeService {
    constructor(
        @inject(ATTENDANCE_CODE_REPOSITORY)
        private repository: AttendanceCodeRepository
    ) {}

    async all(page: number, size: number, search?: string, order?: string[]) {
        const res = await this.repository.findAll(page, size, search, order);
        return {
            ...res,
            data: res.data.map(AttendanceCodeMapper.toDomain),
        } as PaginatedResult<AttendanceCode>;
    }

    async get(id: number) {
        const res = await this.repository.findById(id);
        return AttendanceCodeMapper.toDomain(res);
    }

    async create(entity: AttendanceCode) {
        const res = await this.repository.create(AttendanceCodeMapper.toDto(entity));
        return AttendanceCodeMapper.toDomain(res);
    }

    async update(entity: AttendanceCode) {
        const res = await this.repository.update(entity.id, AttendanceCodeMapper.toDto(entity));
        return AttendanceCodeMapper.toDomain(res);
    }

    async delete(id: number) {
        return this.repository.delete(id);
    }
}
