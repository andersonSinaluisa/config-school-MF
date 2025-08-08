import { inject, injectable } from "inversify";
import { PaginatedResult } from "@/scolar/infrastructure/dto/paginateDto";
import { AcademicPlanning } from "../entities/academicPlanning";
import { AcademicPlanningMapper } from "../mappers/AcademicPlanningMapper";
import { AcademicPlanningRepository } from "../repositories/AcademicPlanningRepository";
import { ACADEMIC_PLANNING_REPOSITORY } from "../symbols/AcademicPlanningSymbol";

@injectable()
export class AcademicPlanningService {
    constructor(
        @inject(ACADEMIC_PLANNING_REPOSITORY)
        private repository: AcademicPlanningRepository
    ) {}

    async all(page: number, size: number, search?: string, order?: string[]) {
        const res = await this.repository.findAll(page, size, search, order);
        return {
            ...res,
            data: res.data.map(AcademicPlanningMapper.toDomain),
        } as PaginatedResult<AcademicPlanning>;
    }

    async get(id: number) {
        const res = await this.repository.findById(id);
        return AcademicPlanningMapper.toDomain(res);
    }

    async create(entity: AcademicPlanning) {
        const res = await this.repository.create(AcademicPlanningMapper.toDto(entity));
        return AcademicPlanningMapper.toDomain(res);
    }

    async update(entity: AcademicPlanning) {
        const res = await this.repository.update(entity.id, AcademicPlanningMapper.toDto(entity));
        return AcademicPlanningMapper.toDomain(res);
    }

    async delete(id: number) {
        return this.repository.delete(id);
    }
}
