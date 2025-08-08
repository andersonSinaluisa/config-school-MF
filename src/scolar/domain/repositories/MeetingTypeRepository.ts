import { PaginatedResult } from "@/scolar/infrastructure/dto/paginateDto";
import { MeetingTypeDto } from "../../infrastructure/dto/MeetingTypeDto";

export interface MeetingTypeRepository {
    findAll(page: number, limit: number, search?: string, orderby?: string[]): Promise<PaginatedResult<MeetingTypeDto>>;
    findById(id: number): Promise<MeetingTypeDto>;
    create(data: Omit<MeetingTypeDto, 'id'>): Promise<MeetingTypeDto>;
    update(id: number, data: Omit<MeetingTypeDto, 'id'>): Promise<MeetingTypeDto>;
    delete(id: number): Promise<void>;
}
