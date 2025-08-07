import { GradingSystemRepository } from "../repositories/GradingSystemRepository";
import { inject, injectable } from "inversify";
import { GRADING_SYSTEM_REPOSITORY } from "../symbols/GradingSystemSymbol";
import { GradingSystemMapper } from "../mappers/GradingSystemMapper";
import { PaginatedResult } from "@/scolar/infrastructure/dto/paginateDto";
import { GradingSystem } from "../entities/grading_system";

@injectable()
export class GradingSystemService {
    constructor(
        @inject(GRADING_SYSTEM_REPOSITORY)
        private repository: GradingSystemRepository
    ) {}

    async all(page: number, size: number, search?: string, order?: string[]) {
        const res = await this.repository.findAll(page, size, search, order);
        return {
            ...res,
            data: res.data.map(GradingSystemMapper.toDomain)
        } as PaginatedResult<GradingSystem>;
    }

    async get(id: number) {
        const res = await this.repository.findById(id);
        return GradingSystemMapper.toDomain(res);
    }

    async create(gs: GradingSystem) {
        const res = await this.repository.create(GradingSystemMapper.toDto(gs));
        return GradingSystemMapper.toDomain(res);
    }

    async update(gs: GradingSystem) {
        const res = await this.repository.update(gs.id, GradingSystemMapper.toDto(gs));
        return GradingSystemMapper.toDomain(res);
    }

    async delete(id: number) {
        const res = await this.repository.delete(id);
        return res;
    }
}
