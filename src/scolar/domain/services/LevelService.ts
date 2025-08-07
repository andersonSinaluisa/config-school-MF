import { LevelRepository } from "../repositories/LevelRepository";
import { inject, injectable } from "inversify";
import { LEVEL_REPOSITORY } from "../symbols/LevelSymbol";
import { LevelMapper } from "../mappers/LevelMapper";
import { PaginatedResult } from "@/scolar/infrastructure/dto/paginateDto";
import { Level } from "../entities/level";

@injectable()
export class LevelService{

    constructor(
        @inject(LEVEL_REPOSITORY)
        private repository: LevelRepository
    ){}

    async all(page: number, size: number, search?: string, order?: string[]){
        const res = await this.repository.findAll(page, size, search, order);
        return {
            ...res,
            data: res.data.map(LevelMapper.toDomain)
        } as PaginatedResult<Level>
    }

    async get(id: number){
        const res = await this.repository.findById(id);
        return LevelMapper.toDomain(res);
    }

    async create(level: Level){
        const res = await this.repository.create(LevelMapper.toDto(level));
        return LevelMapper.toDomain(res);
    }

    async update(level: Level){
        const res = await this.repository.update(level.id, LevelMapper.toDto(level));
        return LevelMapper.toDomain(res);
    }

    async delete(id: number){
        const res = await this.repository.delete(id);
        return res;
    }

    
}