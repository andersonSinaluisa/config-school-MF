import {injectable, inject} from "inversify";
import { PARALLEL_REPOSITORY } from "../symbols/ParallelSymbol";
import { ParallelRepository } from "../repositories/ParallelRepository";
import { PaginatedResult } from "@/scolar/infrastructure/dto/paginateDto";
import { Parallel } from "../entities/parallel";
import { ParallelMapper } from "../mappers/ParallelMapper";

@injectable()
export class ParallelService {

    constructor(
        @inject(PARALLEL_REPOSITORY)
        private readonly repository: ParallelRepository
    ) {}

    async all(page: number, size: number, search?: string, order?: string[]) {
        const res = await this.repository.findAll(page, size, search, order);
        return {
            ...res,
            data: res.data.map(ParallelMapper.toDomain),
        } as PaginatedResult<Parallel>
    }
    
    async findByFilters(params: { courseId?: number; schoolYearId?: number; name?: string; capacity?: number; sectionId?: number; }, page: number, size: number, search?: string, order?: string[]) {
        const res = await this.repository.findByFilters(params, page, size, search, order);
        return {
            ...res,
            data: res.data.map(ParallelMapper.toDomain),
        } as PaginatedResult<Parallel>
    }
    async get(id: number) {
        const res = await this.repository.findById(id);
        return ParallelMapper.toDomain(res);
    }

    async create(data: Parallel) {
        const res = await this.repository.create(ParallelMapper.toDto(data));
        return ParallelMapper.toDomain(res);
    }

    async update(data: Parallel) {
        const res = await this.repository.update(data.id, ParallelMapper.toDto(data));
        return ParallelMapper.toDomain(res);
    }

    async delete(id: number) {
        await this.repository.delete(id);
    }


    async getByCourseId(page: number, limit: number, courseId: number, search?: string, orderby?: string[]){
        const res = await this.repository.findByCourseId(page, limit, courseId, search, orderby);
        return {
            ...res,
            data: res.data.map(ParallelMapper.toDomain),
        } as PaginatedResult<Parallel>
    }
     
}