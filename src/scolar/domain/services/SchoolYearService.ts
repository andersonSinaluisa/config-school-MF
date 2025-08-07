import { PaginatedResult } from "@/scolar/infrastructure/dto/paginateDto";
import { SchoolYearRepository } from "../repositories/SchoolYearRepository";
import { SCHOOL_YEAR_REPOSITORY } from "../symbols/SchoolYearSymbol";
import { inject, injectable } from "inversify";
import { SchoolYear } from "../entities/school_year";
import { SchoolYearMapper } from "../mappers/SchoolYearMapper";

@injectable()
export class SchoolYearService {


    constructor(
        @inject(SCHOOL_YEAR_REPOSITORY)
        private readonly repository: SchoolYearRepository
    ){}


    async all(page: number, size: number, search?: string, order?: string[]) {
        const res = await this.repository.findAll(page, size, search, order);
        return {
            ...res,
            data: res.data.map(SchoolYearMapper.toDomain),
        } as PaginatedResult<SchoolYear>
    }


    async get(id: number) {
        const res = await this.repository.findById(id);
        return SchoolYearMapper.toDomain(res);
    }

    async create(data: SchoolYear) {
        const res = await this.repository.create(SchoolYearMapper.toDto(data));
        return SchoolYearMapper.toDomain(res);
    }

    async update(data: SchoolYear) {
        const res = await this.repository.update(data.id, SchoolYearMapper.toDto(data));
        return SchoolYearMapper.toDomain(res);
    }

    async delete(id: number) {
        await this.repository.delete(id);
    }
    
}