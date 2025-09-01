import { inject, injectable } from "inversify";
import { PaginatedResult } from "@/scolar/infrastructure/dto/paginateDto";
import { SectionBreak } from "../entities/sectionBreak";
import { SectionBreakMapper } from "../mappers/SectionBreakMapper";
import { SectionBreakRepository } from "../repositories/SectionBreakRepository";
import { SECTION_BREAK_REPOSITORY } from "../symbols/SectionBreakSymbol";

@injectable()
export class SectionBreakService {
    constructor(
        @inject(SECTION_BREAK_REPOSITORY)
        private repository: SectionBreakRepository
    ) {}

    async all(page: number, size: number, filters?: { sectionId?: number }) {
        const res = await this.repository.findAll(page, size, {
            section_id: filters?.sectionId,
        });
        return {
            ...res,
            data: res.data.map(SectionBreakMapper.toDomain),
        } as PaginatedResult<SectionBreak>;
    }

    async get(id: number) {
        const res = await this.repository.findById(id);
        return SectionBreakMapper.toDomain(res);
    }

    async create(entity: SectionBreak) {
        const res = await this.repository.create(SectionBreakMapper.toDto(entity));
        return SectionBreakMapper.toDomain(res);
    }

    async update(entity: SectionBreak) {
        const res = await this.repository.update(entity.id, SectionBreakMapper.toDto(entity));
        return SectionBreakMapper.toDomain(res);
    }

    async delete(id: number) {
        return this.repository.delete(id);
    }
}

