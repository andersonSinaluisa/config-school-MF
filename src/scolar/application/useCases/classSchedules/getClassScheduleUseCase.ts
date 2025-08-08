import { UseCase, UseCaseCommand } from "@/scolar/application/useCases/useCase";
import Failure from "@/scolar/domain/failure";
import { ClassSchedule } from "@/scolar/domain/entities/classSchedule";
import { ClassScheduleService } from "@/scolar/domain/services/ClassScheduleService";
import { CLASS_SCHEDULE_SERVICE } from "@/scolar/domain/symbols/ClassScheduleSymbol";
import { injectable, inject } from "inversify";
import { Either, Right, Left } from "purify-ts/Either";
import { LOGGER } from "@/scolar/domain/symbols/SharedSymbol";
import { Logger } from "@/scolar/infrastructure/services/Logger";

export class GetClassScheduleCommand extends UseCaseCommand<number> {}

export type GetClassScheduleUseCase = UseCase<ClassSchedule, GetClassScheduleCommand>;

@injectable()
export class GetClassScheduleUseCaseImpl implements GetClassScheduleUseCase {
    constructor(
        @inject(CLASS_SCHEDULE_SERVICE) private service: ClassScheduleService,
        @inject(LOGGER) private logger: Logger,
    ) {}
    async execute(command: GetClassScheduleCommand): Promise<Either<Failure[], ClassSchedule | undefined>> {
        try {
            const result = await this.service.get(command.data);
            return Right(result);
        } catch (error) {
            this.logger.error("Error getting class schedule: " + JSON.stringify(error));
            return Left([]);
        }
    }
}
