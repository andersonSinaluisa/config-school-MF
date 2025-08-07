import { PaginatedResult } from "@/scolar/infrastructure/dto/paginateDto";
import { CourseSubjectDto } from "../../infrastructure/dto/CourseSubjectDto";


export interface CourseSubjectRepository {
    create(data: Omit<CourseSubjectDto, 'id'>): Promise<CourseSubjectDto>;
    update(id: number, data: Omit<CourseSubjectDto, 'id'>): Promise<CourseSubjectDto>;
    delete(id: number): Promise<void>;
    findAll(page: number, limit: number, search?: string, orderby?: string[]): 
    Promise<PaginatedResult<CourseSubjectDto>>;
    findById(id: number): Promise<CourseSubjectDto>;

    bulkCreate(courseId:number, data: Omit<CourseSubjectDto, 'id'|"courseId">[]): Promise<CourseSubjectDto[]>;

    listByCourseId(courseId: number): Promise<CourseSubjectDto[]>;
    removeSubjectToCourse(courseId: number, subjectId: number): Promise<void>;
}