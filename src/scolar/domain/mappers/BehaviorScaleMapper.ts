import { BehaviorScaleDto } from "@/scolar/infrastructure/dto/BehaviorScaleDto";
import { BehaviorScale } from "../entities/behaviorScale";

export class BehaviorScaleMapper {
    static toDomain(dto: BehaviorScaleDto): BehaviorScale {
        return new BehaviorScale(dto.id, dto.name, dto.minScore, dto.maxScore);
    }
    static toDto(entity: BehaviorScale): Omit<BehaviorScaleDto, 'id'> {
        return {
            name: entity.name,
            minScore: entity.minScore,
            maxScore: entity.maxScore,
        };
    }
}
