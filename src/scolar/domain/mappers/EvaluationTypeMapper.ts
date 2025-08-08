import { EvaluationTypeDto } from "@/scolar/infrastructure/dto/EvaluationTypeDto";
import { EvaluationType } from "../entities/evaluation_type";

export class EvaluationTypeMapper {
    static toDomain(et: EvaluationTypeDto): EvaluationType {
        return new EvaluationType(
            et.id,
            et.name,
            et.description,
            et.weight
        );
    }

    static toDto(et: EvaluationType): Omit<EvaluationTypeDto, 'id'> {
        return {
            name: et.name,
            description: et.description,
            weight: et.weight
        };
    }
}
