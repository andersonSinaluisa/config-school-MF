import { SECTION_REPOSITORY } from "../symbols/SectionSymbol";
import { SectionRepository } from "../repositories/SectionRepository";
import {inject} from "inversify";
import { PaginatedResult } from "@/scolar/infrastructure/dto/paginateDto";
import { Section } from "../entities/section";
import { SectionMapper } from "../mappers/SectionMapper";



export class SectionService{

    constructor(
        @inject(SECTION_REPOSITORY)
        private readonly repository: SectionRepository
    ) {}


    async all(page: number, size: number, search?: string, order?: string[]) {
        const res = await this.repository.findAll(page, size, search, order);
        return {
            ...res,
            data: res.data.map(SectionMapper.toDomain),
        } as PaginatedResult<Section>;
    }


    async get(id: number) {
        const res = await this.repository.findById(id);
        return SectionMapper.toDomain(res);
    }

    async create(data: Section) {
        const res = await this.repository.create(SectionMapper.toDto(data));
        return SectionMapper.toDomain(res);
    }

    async update(data: Section) {
        const res = await this.repository.update(data.id, SectionMapper.toDto(data));
        return SectionMapper.toDomain(res);
    }

    async delete(id: number) {
        await this.repository.delete(id);
    }
    
}