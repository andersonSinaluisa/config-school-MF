import { UseCase, UseCaseCommand } from "@/scolar/application/useCases/useCase";
import Failure from "@/scolar/domain/failure";
import { BehaviorScaleService } from "@/scolar/domain/services/BehaviorScaleService";
import { BEHAVIOR_SCALE_SERVICE } from "@/scolar/domain/symbols/BehaviorScaleSymbol";
import { injectable, inject } from "inversify";
import { Either, Right, Left } from "purify-ts/Either";
import { LOGGER } from "@/scolar/domain/symbols/SharedSymbol";
import { Logger } from "@/scolar/infrastructure/services/Logger";

export class DeleteBehaviorScaleCommand extends UseCaseCommand<number> {}

export type DeleteBehaviorScaleUseCase = UseCase<void, DeleteBehaviorScaleCommand>;

@injectable()
export class DeleteBehaviorScaleUseCaseImpl implements DeleteBehaviorScaleUseCase {
    constructor(
        @inject(BEHAVIOR_SCALE_SERVICE) private service: BehaviorScaleService,
        @inject(LOGGER) private logger: Logger,
    ) {}
    async execute(command: DeleteBehaviorScaleCommand): Promise<Either<Failure[], void>> {
        try {
            await this.service.delete(command.data);
            return Right(undefined);
        } catch (error) {
            this.logger.error("Error deleting behavior scale: " + JSON.stringify(error));
            return Left([]);
        }
    }
}
