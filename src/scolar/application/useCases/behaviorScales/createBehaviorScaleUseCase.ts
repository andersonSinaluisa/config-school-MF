import { UseCase, UseCaseCommand } from "@/scolar/application/useCases/useCase";
import Failure from "@/scolar/domain/failure";
import { BehaviorScale } from "@/scolar/domain/entities/behaviorScale";
import { BehaviorScaleService } from "@/scolar/domain/services/BehaviorScaleService";
import { BEHAVIOR_SCALE_SERVICE } from "@/scolar/domain/symbols/BehaviorScaleSymbol";
import { injectable, inject } from "inversify";
import { Either, Right, Left } from "purify-ts/Either";
import { LOGGER } from "@/scolar/domain/symbols/SharedSymbol";
import { Logger } from "@/scolar/infrastructure/services/Logger";

export class CreateBehaviorScaleCommand extends UseCaseCommand<BehaviorScale> {}

export type CreateBehaviorScaleUseCase = UseCase<BehaviorScale, CreateBehaviorScaleCommand>;

@injectable()
export class CreateBehaviorScaleUseCaseImpl implements CreateBehaviorScaleUseCase {
    constructor(
        @inject(BEHAVIOR_SCALE_SERVICE) private service: BehaviorScaleService,
        @inject(LOGGER) private logger: Logger,
    ) {}
    async execute(command: CreateBehaviorScaleCommand): Promise<Either<Failure[], BehaviorScale | undefined>> {
        try {
            const result = await this.service.create(command.data);
            return Right(result);
        } catch (error) {
            this.logger.error("Error creating behavior scale: " + JSON.stringify(error));
            return Left([]);
        }
    }
}
