import { PaginatedResult } from "@/scolar/infrastructure/dto/paginateDto";
import { ParallelRepository } from "@/scolar/domain/repositories/ParallelRepository";
import { ParallelDto } from "../../dto/ParrallelDto";
import { AxiosInstance } from "axios";
import { injectable } from "inversify";


@injectable()
export class ParallelRepositoryImpl implements ParallelRepository{

    constructor(private readonly http: AxiosInstance) {}
    async findByFilters(params: { courseId?: number; schoolYearId?: number; name?: string; capacity?: number; sectionId?: number; }, page: number, limit: number, search?: string, orderby?: string[]): Promise<PaginatedResult<ParallelDto>> {

        const {data} = await this.http.get<PaginatedResult<ParallelDto>>("/parallels/", {
            params: {
                ...params,
                page,
                limit,
                search,
                orderby
            }
        });
        return data;
    }
    async findAll(page: number, limit: number, search?: string, orderby?: string[]): Promise<PaginatedResult<ParallelDto>> {
        const { data } = await this.http.get<PaginatedResult<ParallelDto>>("/parallels/", {
            params: {
                page,
                limit,
                search,
                orderby
            }
        });

        return data;
    }
    async create(data: Omit<ParallelDto, "id">): Promise<ParallelDto> {
        const { data: parallel } = await this.http.post<ParallelDto>("/parallels/", data);
        return parallel;
    }
    async update(id: number, data: Omit<ParallelDto, "id">): Promise<ParallelDto> {
        const { data: parallel } = await this.http.put<ParallelDto>(`/parallels/${id}`, data);
        return parallel;
    }
    async delete(id: number): Promise<void> {
        await this.http.delete(`/parallels/${id}`);
    }
    async findById(id: number): Promise<ParallelDto> {
       const { data } = await this.http.get<ParallelDto>(`/parallels/${id}`);
         return data;
    }

    async findByCourseId(page: number, limit: number, courseId: number,  search?: string, orderby?: string[]): Promise<PaginatedResult<ParallelDto>> {
        const { data } = await this.http.get<PaginatedResult<ParallelDto>>(`/parallels/`,{
            params: {
                course_id: courseId,
                page,
                limit,
                search,
                orderby
            }
        });
        return data;
    }

}