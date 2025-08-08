import { MeetingTypeDto } from "@/scolar/infrastructure/dto/MeetingTypeDto";
import { MeetingType } from "../entities/meetingType";

export class MeetingTypeMapper {
    static toDomain(dto: MeetingTypeDto): MeetingType {
        return new MeetingType(dto.id, dto.name, dto.description);
    }
    static toDto(entity: MeetingType): Omit<MeetingTypeDto, 'id'> {
        return {
            name: entity.name,
            description: entity.description,
        };
    }
}
