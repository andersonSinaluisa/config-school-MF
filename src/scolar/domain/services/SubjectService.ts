import {injectable, inject} from "inversify";
import { SUBJECT_REPOSITORY } from "../symbols/SubjectSymbol";
import { SubjectRepository } from "../repositories/SubjectRepository";
import { SubjectMapper } from "../mappers/SubjectMapper";
import { PaginatedResult } from "@/scolar/infrastructure/dto/paginateDto";
import { Subject } from "../entities/subject";

@injectable()
export class SubjectService{

    constructor(
         @inject(SUBJECT_REPOSITORY)
         private repository: SubjectRepository
    ){}

    async all(
        page: number,
        size: number,
        search?: string,
        order?: string[],
        filters?: { name?: string; code?: string }
    ){
        const res = await this.repository.findAll(page, size, search, order, filters);
        return {
            ...res,
            data: res.data.map(SubjectMapper.toDomain)
        } as PaginatedResult<Subject>
    }
    
    async get(id: number){
        const res = await this.repository.findById(id);
        return SubjectMapper.toDomain(res);
    }

    async create(subject: Subject){
        const res = await this.repository.create(SubjectMapper.toDto(subject));
        return SubjectMapper.toDomain(res);
    }

    async update(subject: Subject){
        const res = await this.repository.update(subject.id, SubjectMapper.toDto(subject));
        return SubjectMapper.toDomain(res);
    }

    async delete(id: number){
        const res = await this.repository.delete(id);
        return res;
    }
}