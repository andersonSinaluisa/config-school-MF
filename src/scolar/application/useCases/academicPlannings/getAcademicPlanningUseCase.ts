import { UseCase, UseCaseCommand } from "@/scolar/application/useCases/useCase";
import Failure from "@/scolar/domain/failure";
import { AcademicPlanning } from "@/scolar/domain/entities/academicPlanning";
import { AcademicPlanningService } from "@/scolar/domain/services/AcademicPlanningService";
import { ACADEMIC_PLANNING_SERVICE } from "@/scolar/domain/symbols/AcademicPlanningSymbol";
import { injectable, inject } from "inversify";
import { Either, Right, Left } from "purify-ts/Either";
import { LOGGER } from "@/scolar/domain/symbols/SharedSymbol";
import { Logger } from "@/scolar/infrastructure/services/Logger";

export class GetAcademicPlanningCommand extends UseCaseCommand<number> {}

export type GetAcademicPlanningUseCase = UseCase<AcademicPlanning, GetAcademicPlanningCommand>;

@injectable()
export class GetAcademicPlanningUseCaseImpl implements GetAcademicPlanningUseCase {
    constructor(
        @inject(ACADEMIC_PLANNING_SERVICE) private service: AcademicPlanningService,
        @inject(LOGGER) private logger: Logger,
    ) {}
    async execute(command: GetAcademicPlanningCommand): Promise<Either<Failure[], AcademicPlanning | undefined>> {
        try {
            const result = await this.service.get(command.data);
            return Right(result);
        } catch (error) {
            this.logger.error("Error getting academic planning: " + JSON.stringify(error));
            return Left([]);
        }
    }
}
