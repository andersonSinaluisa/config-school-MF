import { UseCase, UseCaseCommand } from "@/scolar/application/useCases/useCase";
import Failure from "@/scolar/domain/failure";
import { ClassScheduleService } from "@/scolar/domain/services/ClassScheduleService";
import { CLASS_SCHEDULE_SERVICE } from "@/scolar/domain/symbols/ClassScheduleSymbol";
import { injectable, inject } from "inversify";
import { Either, Right, Left } from "purify-ts/Either";
import { LOGGER } from "@/scolar/domain/symbols/SharedSymbol";
import { Logger } from "@/scolar/infrastructure/services/Logger";

export class DeleteClassScheduleCommand extends UseCaseCommand<number> {}

export type DeleteClassScheduleUseCase = UseCase<void, DeleteClassScheduleCommand>;

@injectable()
export class DeleteClassScheduleUseCaseImpl implements DeleteClassScheduleUseCase {
    constructor(
        @inject(CLASS_SCHEDULE_SERVICE) private service: ClassScheduleService,
        @inject(LOGGER) private logger: Logger,
    ) {}
    async execute(command: DeleteClassScheduleCommand): Promise<Either<Failure[], void>> {
        try {
            await this.service.delete(command.data);
            return Right(undefined);
        } catch (error) {
            this.logger.error("Error deleting class schedule: " + JSON.stringify(error));
            return Left([]);
        }
    }
}
