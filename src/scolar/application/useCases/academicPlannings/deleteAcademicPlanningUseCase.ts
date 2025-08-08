import { UseCase, UseCaseCommand } from "@/scolar/application/useCases/useCase";
import Failure from "@/scolar/domain/failure";
import { AcademicPlanningService } from "@/scolar/domain/services/AcademicPlanningService";
import { ACADEMIC_PLANNING_SERVICE } from "@/scolar/domain/symbols/AcademicPlanningSymbol";
import { injectable, inject } from "inversify";
import { Either, Right, Left } from "purify-ts/Either";
import { LOGGER } from "@/scolar/domain/symbols/SharedSymbol";
import { Logger } from "@/scolar/infrastructure/services/Logger";

export class DeleteAcademicPlanningCommand implements UseCaseCommand {
    constructor(
        private id: number
    ) { }

    get data() {
        return this.id;
    }
}

export type DeleteAcademicPlanningUseCase = UseCase<void, DeleteAcademicPlanningCommand>;

@injectable()
export class DeleteAcademicPlanningUseCaseImpl implements DeleteAcademicPlanningUseCase {
    constructor(
        @inject(ACADEMIC_PLANNING_SERVICE) private service: AcademicPlanningService,
        @inject(LOGGER) private logger: Logger,
    ) {}
    async execute(command: DeleteAcademicPlanningCommand): Promise<Either<Failure[], void>> {
        try {
            await this.service.delete(command.data);
            return Right(undefined);
        } catch (error) {
            this.logger.error("Error deleting academic planning: " + JSON.stringify(error));
            return Left([]);
        }
    }
}
