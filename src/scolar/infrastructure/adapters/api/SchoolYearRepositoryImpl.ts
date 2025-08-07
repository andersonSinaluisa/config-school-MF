import { PaginatedResult } from "@/scolar/infrastructure/dto/paginateDto";
import { SchoolYearRepository } from "@/scolar/domain/repositories/SchoolYearRepository";
import { SchoolYearDto } from "../../dto/SchoolYearDto";
import { AxiosInstance } from "axios";
import { injectable } from "inversify";

@injectable()
export class SchoolYearRepositoryImpl implements SchoolYearRepository{
    constructor(private readonly http: AxiosInstance) {}
    async findById(id: number): Promise<SchoolYearDto> {
        const { data } = await this.http.get<SchoolYearDto>(`/school-years/${id}/`);
        return data;
    }
    async findAll(page: number, limit: number, search?: string, orderby?: string[]): Promise<PaginatedResult<SchoolYearDto>> {
        const { data } = await this.http.get<PaginatedResult<SchoolYearDto>>("/school-years/", {
            params: {
                page,
                limit,
                search,
                orderby
            }
        });
        return data;
    }
    async create(data: Omit<SchoolYearDto, "id">): Promise<SchoolYearDto> {
        const { data: schoolYear } = await this.http.post<SchoolYearDto>("/school-years/", data);
        return schoolYear;
    }
    async update(id: number, data: Omit<SchoolYearDto, "id">): Promise<SchoolYearDto> {
        const { data: schoolYear } = await this.http.put<SchoolYearDto>(`/school-years/${id}/`, data);
        return schoolYear;
    }
    async delete(id: number): Promise<void> {
        await this.http.delete(`/school-years/${id}/`);
    }

}