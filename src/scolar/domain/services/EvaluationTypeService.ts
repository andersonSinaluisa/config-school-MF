import { EvaluationTypeRepository } from "../repositories/EvaluationTypeRepository";
import { inject, injectable } from "inversify";
import { EVALUATION_TYPE_REPOSITORY } from "../symbols/EvaluationTypeSymbol";
import { EvaluationTypeMapper } from "../mappers/EvaluationTypeMapper";
import { PaginatedResult } from "@/scolar/infrastructure/dto/paginateDto";
import { EvaluationType } from "../entities/evaluation_type";

@injectable()
export class EvaluationTypeService {
    constructor(
        @inject(EVALUATION_TYPE_REPOSITORY)
        private repository: EvaluationTypeRepository
    ) {}

    async all(page: number, size: number, search?: string, order?: string[]) {
        const res = await this.repository.findAll(page, size, search, order);
        return {
            ...res,
            data: res.data.map(EvaluationTypeMapper.toDomain)
        } as PaginatedResult<EvaluationType>;
    }

    async get(id: number) {
        const res = await this.repository.findById(id);
        return EvaluationTypeMapper.toDomain(res);
    }

    async create(et: EvaluationType) {
        const res = await this.repository.create(EvaluationTypeMapper.toDto(et));
        return EvaluationTypeMapper.toDomain(res);
    }

    async update(et: EvaluationType) {
        const res = await this.repository.update(et.id, EvaluationTypeMapper.toDto(et));
        return EvaluationTypeMapper.toDomain(res);
    }

    async delete(id: number) {
        const res = await this.repository.delete(id);
        return res;
    }
}
