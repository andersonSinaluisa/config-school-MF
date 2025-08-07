import {injectable, inject} from "inversify";
import { COURSE_REPOSITORY } from "../symbols/CourseSymbol";
import { CourseRepository } from "../repositories/CourseRepository";
import { Course } from "../entities/course";
import { PaginatedResult } from "@/scolar/infrastructure/dto/paginateDto";
import { CourseMapper } from "../mappers/CourseMapper";

@injectable()
export class CourseService{

    constructor(
         @inject(COURSE_REPOSITORY)
         private repository: CourseRepository
    ){}

    async all(page: number, size: number, search?: string, order?: string[]){
        const res = await this.repository.findAll(page, size, search, order);
        return {
            ...res,
            data: res.data.map(CourseMapper.toDomain)
        } as PaginatedResult<Course>
    }

    async get(id: number){
        const res = await this.repository.findById(id);
        return res;
    }

    async create(course: Course){
        const res = await this.repository.create(CourseMapper.toDto(course));
        return CourseMapper.toDomain(res);
    }

    async update(course: Course){
        const res = await this.repository.update(course.id, CourseMapper.toDto(course));
        return CourseMapper.toDomain(res);
    }

    async delete(id: number){
        const res = await this.repository.delete(id);
        return res;
    }

    

}