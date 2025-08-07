import { PaginatedResult } from "@/scolar/infrastructure/dto/paginateDto";
import { CourseSubjectRepository } from "@/scolar/domain/repositories/CourseSubjectRepository";
import { CourseSubjectDto } from "../../dto/CourseSubjectDto";
import { AxiosInstance } from "axios";
import { injectable } from "inversify";

@injectable()
export class CourseSubjectRepositoryImpl implements CourseSubjectRepository{

    constructor(private readonly http: AxiosInstance) {}
    async listByCourseId(courseId: number): Promise<CourseSubjectDto[]> {
        const { data } = await this.http.get<CourseSubjectDto[]>(`/course-subjects/assing/${courseId}/`);
        return data;
    }
    async removeSubjectToCourse(courseId: number, subjectId: number): Promise<void> {
        await this.http.delete(`/course-subjects/${courseId}/remove-subject/${subjectId}`);
    }
    async bulkCreate(courseId:number, data: Omit<CourseSubjectDto, "id" |"courseId">[]): Promise<CourseSubjectDto[]> {
        const { data: courseSubjects } = await this.http.post<CourseSubjectDto[]>(`/course-subjects/assing/${courseId}/`, data);
        return courseSubjects;
    }
    async create(data: Omit<CourseSubjectDto, "id">): Promise<CourseSubjectDto> {
        const { data: courseSubject } = await this.http.post<CourseSubjectDto>("/course-subjects", data);
        return courseSubject;
    }
    async update(id: number, data: Omit<CourseSubjectDto, "id">): Promise<CourseSubjectDto> {
        const { data: courseSubject } = await this.http.put<CourseSubjectDto>(`/course-subjects/${id}`, data);
        return courseSubject;
    }
    async delete(id: number): Promise<void> {
        await this.http.delete(`/course-subjects/${id}`);
    }
    async findAll(page: number, limit: number, search?: string, orderby?: string[]): Promise<PaginatedResult<CourseSubjectDto>> {
        const { data } = await this.http.get<PaginatedResult<CourseSubjectDto>>("/course-subjects", {
            params: {
                page,
                limit,
                search,
                orderby
            }
        });
        return data;
    }
    async findById(id: number): Promise<CourseSubjectDto> {
        const { data } = await this.http.get<CourseSubjectDto>(`/course-subjects/${id}`);
        return data;
    }

}