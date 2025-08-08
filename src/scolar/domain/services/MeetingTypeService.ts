import { inject, injectable } from "inversify";
import { PaginatedResult } from "@/scolar/infrastructure/dto/paginateDto";
import { MeetingType } from "../entities/meetingType";
import { MeetingTypeMapper } from "../mappers/MeetingTypeMapper";
import { MeetingTypeRepository } from "../repositories/MeetingTypeRepository";
import { MEETING_TYPE_REPOSITORY } from "../symbols/MeetingTypeSymbol";

@injectable()
export class MeetingTypeService {
    constructor(
        @inject(MEETING_TYPE_REPOSITORY)
        private repository: MeetingTypeRepository
    ) {}

    async all(page: number, size: number, search?: string, order?: string[]) {
        const res = await this.repository.findAll(page, size, search, order);
        return {
            ...res,
            data: res.data.map(MeetingTypeMapper.toDomain),
        } as PaginatedResult<MeetingType>;
    }

    async get(id: number) {
        const res = await this.repository.findById(id);
        return MeetingTypeMapper.toDomain(res);
    }

    async create(entity: MeetingType) {
        const res = await this.repository.create(MeetingTypeMapper.toDto(entity));
        return MeetingTypeMapper.toDomain(res);
    }

    async update(entity: MeetingType) {
        const res = await this.repository.update(entity.id, MeetingTypeMapper.toDto(entity));
        return MeetingTypeMapper.toDomain(res);
    }

    async delete(id: number) {
        return this.repository.delete(id);
    }
}
