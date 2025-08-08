import { PaginateUseCaseCommand, UseCase } from "@/scolar/application/useCases/useCase";
import Failure from "@/scolar/domain/failure";
import { PaginatedResult } from "@/scolar/infrastructure/dto/paginateDto";
import { BehaviorScale } from "@/scolar/domain/entities/behaviorScale";
import { BehaviorScaleService } from "@/scolar/domain/services/BehaviorScaleService";
import { BEHAVIOR_SCALE_SERVICE } from "@/scolar/domain/symbols/BehaviorScaleSymbol";
import { injectable, inject } from "inversify";
import { Either, Right, Left } from "purify-ts/Either";
import { LOGGER } from "@/scolar/domain/symbols/SharedSymbol";
import { Logger } from "@/scolar/infrastructure/services/Logger";

export class ListBehaviorScalesCommand extends PaginateUseCaseCommand {}

export type ListBehaviorScalesUseCase = UseCase<PaginatedResult<BehaviorScale>, ListBehaviorScalesCommand>

@injectable()
export class ListBehaviorScalesUseCaseImpl implements ListBehaviorScalesUseCase {
    constructor(
        @inject(BEHAVIOR_SCALE_SERVICE) private service: BehaviorScaleService,
        @inject(LOGGER) private logger: Logger,
    ) {}
    async execute(command: ListBehaviorScalesCommand): Promise<Either<Failure[], PaginatedResult<BehaviorScale> | undefined>> {
        try {
            const result = await this.service.all(command.data.page, command.data.perPage, command.data.search, command.data.orderBy);
            return Right(result);
        } catch (error) {
            this.logger.error("Error listing behavior scales: " + JSON.stringify(error));
            return Left([]);
        }
    }
}
