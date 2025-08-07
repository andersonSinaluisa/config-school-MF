import { PaginatedResult } from "@/scolar/infrastructure/dto/paginateDto";
import { CourseRepository } from "@/scolar/domain/repositories/CourseRepository";
import { CourseDto } from "../../dto/CourseDto";
import { AxiosInstance } from "axios";
import { injectable } from "inversify";

@injectable()
export class CourseRepositoryImpl implements CourseRepository{

    constructor(private readonly http: AxiosInstance) {}
    async findAll(page: number, limit: number, search?: string, orderby?: string[]): Promise<PaginatedResult<CourseDto>> {
        const { data } = await this.http.get<PaginatedResult<CourseDto>>("/courses/", {
            params: {
                page,
                limit,
                search,
                orderby
            }
        });
        return data;
    }
    async create(course: Omit<CourseDto, "id" | "level">): Promise<CourseDto> {
        const { data } = await this.http.post<CourseDto>("/courses/", course);
        return data;
    }
    async update(id: number, course: Omit<CourseDto, "id" | "level">): Promise<CourseDto> {
        const { data } = await this.http.put<CourseDto>(`/courses/${id}/`, course);
        return data;
    }
    async delete(id: number): Promise<void> {
        await this.http.delete(`/courses/${id}`);
    }
    async findById(id: number): Promise<CourseDto> {
        const { data } = await this.http.get<CourseDto>(`/courses/${id}/`);
        return data;
    }

}