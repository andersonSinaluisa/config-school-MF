import { inject, injectable } from "inversify";
import { PaginatedResult } from "@/scolar/infrastructure/dto/paginateDto";
import { ClassSchedule } from "../entities/classSchedule";
import { ClassScheduleMapper } from "../mappers/ClassScheduleMapper";
import { ClassScheduleRepository } from "../repositories/ClassScheduleRepository";
import { CLASS_SCHEDULE_REPOSITORY } from "../symbols/ClassScheduleSymbol";

@injectable()
export class ClassScheduleService {
    constructor(
        @inject(CLASS_SCHEDULE_REPOSITORY)
        private repository: ClassScheduleRepository
    ) {}

    async all(page: number, size: number, search?: string, order?: string[]) {
        const res = await this.repository.findAll(page, size, search, order);
        return {
            ...res,
            data: res.data.map(ClassScheduleMapper.toDomain),
        } as PaginatedResult<ClassSchedule>;
    }

    async get(id: number) {
        const res = await this.repository.findById(id);
        return ClassScheduleMapper.toDomain(res);
    }

    async create(entity: ClassSchedule) {
        const res = await this.repository.create(ClassScheduleMapper.toDto(entity));
        return ClassScheduleMapper.toDomain(res);
    }

    async update(entity: ClassSchedule) {
        const res = await this.repository.update(entity.id, ClassScheduleMapper.toDto(entity));
        return ClassScheduleMapper.toDomain(res);
    }

    async delete(id: number) {
        return this.repository.delete(id);
    }
}
