import { CourseSubject } from "../entities/course_subject";
import { CourseSubjectMapper } from "../mappers/CourseSubjectMapper";
import { CourseSubjectRepository } from "../repositories/CourseSubjectRepository";
import { COURSE_SUBJECT_REPOSITORY } from "../symbols/CourseSubjectSymbol";
import { inject, injectable } from "inversify";

@injectable()
export class CourseSubjetService {

    constructor(
        @inject(COURSE_SUBJECT_REPOSITORY)
        private readonly repository: CourseSubjectRepository
    ){}


    async listByCourse(courseId: number) {
        const res = await this.repository.listByCourseId(courseId);
        return res.map(CourseSubjectMapper.toDomain);
    }
    async all(page: number, size: number, search?: string, order?: string[]) {
        const res = await this.repository.findAll(page, size, search, order);
        return {
            ...res,
            data: res.data.map(CourseSubjectMapper.toDomain)
        };
    }


    async get(id: number) {
        const res = await this.repository.findById(id);
        return CourseSubjectMapper.toDomain(res);
    }


    async create(data: CourseSubject) {
        const res = await this.repository.create(CourseSubjectMapper.toDto(data));
        return CourseSubjectMapper.toDomain(res);
    }


    async bulkCreate(courseId:number,data: Omit<CourseSubject, 'id' | 'courseId'>[]) {
       
       
        const res = await this.repository.bulkCreate(courseId,
          data.map(CourseSubjectMapper.toBulkDto)
        );
        return res.map(CourseSubjectMapper.toDomain);
    }


    async update(data: CourseSubject) {
        const res = await this.repository.update(data.id, CourseSubjectMapper.toDto(data));
        return CourseSubjectMapper.toDomain(res);
    }

    async delete(id: number) {
        await this.repository.delete(id);
    }


    async removeSubjectToCourse(courseId: number, subjectId: number) {
        await this.repository.removeSubjectToCourse(courseId, subjectId);
    }
    
    
}