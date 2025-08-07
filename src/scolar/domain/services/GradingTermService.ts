import { GradingTermRepository } from "../repositories/GradingTermRepository";
import { inject, injectable } from "inversify";
import { GRADING_TERM_REPOSITORY } from "../symbols/GradingTermSymbol";
import { GradingTermMapper } from "../mappers/GradingTermMapper";
import { PaginatedResult } from "@/scolar/infrastructure/dto/paginateDto";
import { GradingTerm } from "../entities/grading_term";

@injectable()
export class GradingTermService {
    constructor(
        @inject(GRADING_TERM_REPOSITORY)
        private repository: GradingTermRepository
    ) {}

    async all(page: number, size: number, search?: string, order?: string[]) {
        const res = await this.repository.findAll(page, size, search, order);
        return {
            ...res,
            data: res.data.map(GradingTermMapper.toDomain)
        } as PaginatedResult<GradingTerm>;
    }

    async get(id: number) {
        const res = await this.repository.findById(id);
        return GradingTermMapper.toDomain(res);
    }

    async create(gt: GradingTerm) {
        const res = await this.repository.create(GradingTermMapper.toDto(gt));
        return GradingTermMapper.toDomain(res);
    }

    async update(gt: GradingTerm) {
        const res = await this.repository.update(gt.id, GradingTermMapper.toDto(gt));
        return GradingTermMapper.toDomain(res);
    }

    async delete(id: number) {
        const res = await this.repository.delete(id);
        return res;
    }
}
