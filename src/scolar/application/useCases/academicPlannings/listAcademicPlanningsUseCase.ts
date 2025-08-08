import { PaginateUseCaseCommand, UseCase } from "@/scolar/application/useCases/useCase";
import Failure from "@/scolar/domain/failure";
import { PaginatedResult } from "@/scolar/infrastructure/dto/paginateDto";
import { AcademicPlanning } from "@/scolar/domain/entities/academicPlanning";
import { AcademicPlanningService } from "@/scolar/domain/services/AcademicPlanningService";
import { ACADEMIC_PLANNING_SERVICE } from "@/scolar/domain/symbols/AcademicPlanningSymbol";
import { injectable, inject } from "inversify";
import { Either, Right, Left } from "purify-ts/Either";
import { LOGGER } from "@/scolar/domain/symbols/SharedSymbol";
import { Logger } from "@/scolar/infrastructure/services/Logger";

export class ListAcademicPlanningsCommand extends PaginateUseCaseCommand {}

export type ListAcademicPlanningsUseCase = UseCase<PaginatedResult<AcademicPlanning>, ListAcademicPlanningsCommand>;

@injectable()
export class ListAcademicPlanningsUseCaseImpl implements ListAcademicPlanningsUseCase {
    constructor(
        @inject(ACADEMIC_PLANNING_SERVICE) private service: AcademicPlanningService,
        @inject(LOGGER) private logger: Logger,
    ) {}
    async execute(command: ListAcademicPlanningsCommand): Promise<Either<Failure[], PaginatedResult<AcademicPlanning> | undefined>> {
        try {
            const result = await this.service.all(command.data.page, command.data.perPage, command.data.search, command.data.orderBy);
            return Right(result);
        } catch (error) {
            this.logger.error("Error listing academic plannings: " + JSON.stringify(error));
            return Left([]);
        }
    }
}
