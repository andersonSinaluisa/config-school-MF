import { inject, injectable } from "inversify";
import { PaginatedResult } from "@/scolar/infrastructure/dto/paginateDto";
import { BehaviorScale } from "../entities/behaviorScale";
import { BehaviorScaleMapper } from "../mappers/BehaviorScaleMapper";
import { BehaviorScaleRepository } from "../repositories/BehaviorScaleRepository";
import { BEHAVIOR_SCALE_REPOSITORY } from "../symbols/BehaviorScaleSymbol";

@injectable()
export class BehaviorScaleService {
    constructor(
        @inject(BEHAVIOR_SCALE_REPOSITORY)
        private repository: BehaviorScaleRepository
    ) {}

    async all(page: number, size: number, search?: string, order?: string[]) {
        const res = await this.repository.findAll(page, size, search, order);
        return {
            ...res,
            data: res.data.map(BehaviorScaleMapper.toDomain),
        } as PaginatedResult<BehaviorScale>;
    }

    async get(id: number) {
        const res = await this.repository.findById(id);
        return BehaviorScaleMapper.toDomain(res);
    }

    async create(entity: BehaviorScale) {
        const res = await this.repository.create(BehaviorScaleMapper.toDto(entity));
        return BehaviorScaleMapper.toDomain(res);
    }

    async update(entity: BehaviorScale) {
        const res = await this.repository.update(entity.id, BehaviorScaleMapper.toDto(entity));
        return BehaviorScaleMapper.toDomain(res);
    }

    async delete(id: number) {
        return this.repository.delete(id);
    }
}
