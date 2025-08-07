import { GradingSystemDto } from "@/scolar/infrastructure/dto/GradingSystemDto";
import { GradingSystem } from "../entities/grading_system";

export class GradingSystemMapper {
    static toDomain(gs: GradingSystemDto): GradingSystem {
        return new GradingSystem(
            gs.id,
            gs.name,
            gs.description,
            gs.numberOfTerms,
            gs.passingScore
        );
    }

    static toDto(gs: GradingSystem): Omit<GradingSystemDto, 'id'> {
        return {
            name: gs.name,
            description: gs.description,
            numberOfTerms: gs.numberOfTerms,
            passingScore: gs.passingScore
        };
    }
}
