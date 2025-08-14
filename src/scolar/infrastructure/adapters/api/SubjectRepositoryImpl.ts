import { PaginatedResult } from "@/scolar/infrastructure/dto/paginateDto";
import { AxiosInstance } from "axios";
import { SubjectRepository } from "@/scolar/domain/repositories/SubjectRepository";
import { SubjectDto } from "../../dto/SubjectDto";
import { injectable } from "inversify";


@injectable()
export class SubjectRepositoryImpl implements SubjectRepository{

    constructor(private readonly http: AxiosInstance) {}
    async findAll(
        page: number,
        limit: number,
        search?: string,
        orderby?: string[],
        filters?: { name?: string; code?: string }
    ): Promise<PaginatedResult<SubjectDto>> {
        const { data } = await this.http.get<PaginatedResult<SubjectDto>>("/subjects/", {
            params: {
                page,
                limit,
                search,
                orderby,
                ...(filters ?? {})
            }
        });

        return data;
    }
    async findById(id: number): Promise<SubjectDto> {
        const { data } = await this.http.get<SubjectDto>(`/subjects/${id}`);
        return data;
    }
    async create(subject: Omit<SubjectDto, "id">): Promise<SubjectDto> {
        const { data } = await this.http.post<SubjectDto>("/subjects/", subject);
        return data;
    }
    async update(id: number, subject: Omit<SubjectDto, "id">): Promise<SubjectDto> {
        const { data } = await this.http.put<SubjectDto>(`/subjects/${id}`, subject);
        return data;
    }
    async delete(id: number): Promise<void> {
        await this.http.delete(`/subjects/${id}`);
    }

}