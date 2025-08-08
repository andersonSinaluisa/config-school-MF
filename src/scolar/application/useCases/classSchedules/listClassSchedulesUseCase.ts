import { PaginateUseCaseCommand, UseCase } from "@/scolar/application/useCases/useCase";
import Failure from "@/scolar/domain/failure";
import { PaginatedResult } from "@/scolar/infrastructure/dto/paginateDto";
import { ClassSchedule } from "@/scolar/domain/entities/classSchedule";
import { ClassScheduleService } from "@/scolar/domain/services/ClassScheduleService";
import { CLASS_SCHEDULE_SERVICE } from "@/scolar/domain/symbols/ClassScheduleSymbol";
import { injectable, inject } from "inversify";
import { Either, Right, Left } from "purify-ts/Either";
import { LOGGER } from "@/scolar/domain/symbols/SharedSymbol";
import { Logger } from "@/scolar/infrastructure/services/Logger";

export class ListClassSchedulesCommand extends PaginateUseCaseCommand {}

export type ListClassSchedulesUseCase = UseCase<PaginatedResult<ClassSchedule>, ListClassSchedulesCommand>;

@injectable()
export class ListClassSchedulesUseCaseImpl implements ListClassSchedulesUseCase {
    constructor(
        @inject(CLASS_SCHEDULE_SERVICE) private service: ClassScheduleService,
        @inject(LOGGER) private logger: Logger,
    ) {}
    async execute(command: ListClassSchedulesCommand): Promise<Either<Failure[], PaginatedResult<ClassSchedule> | undefined>> {
        try {
            const result = await this.service.all(command.data.page, command.data.perPage, command.data.search, command.data.orderBy);
            return Right(result);
        } catch (error) {
            this.logger.error("Error listing class schedules: " + JSON.stringify(error));
            return Left([]);
        }
    }
}
