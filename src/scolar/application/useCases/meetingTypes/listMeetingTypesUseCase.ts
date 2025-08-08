import { PaginateUseCaseCommand, UseCase } from "@/scolar/application/useCases/useCase";
import Failure from "@/scolar/domain/failure";
import { PaginatedResult } from "@/scolar/infrastructure/dto/paginateDto";
import { MeetingType } from "@/scolar/domain/entities/meetingType";
import { MeetingTypeService } from "@/scolar/domain/services/MeetingTypeService";
import { MEETING_TYPE_SERVICE } from "@/scolar/domain/symbols/MeetingTypeSymbol";
import { injectable, inject } from "inversify";
import { Either, Right, Left } from "purify-ts/Either";
import { LOGGER } from "@/scolar/domain/symbols/SharedSymbol";
import { Logger } from "@/scolar/infrastructure/services/Logger";

export class ListMeetingTypesCommand extends PaginateUseCaseCommand {}

export type ListMeetingTypesUseCase = UseCase<PaginatedResult<MeetingType>, ListMeetingTypesCommand>

@injectable()
export class ListMeetingTypesUseCaseImpl implements ListMeetingTypesUseCase {
    constructor(
        @inject(MEETING_TYPE_SERVICE) private service: MeetingTypeService,
        @inject(LOGGER) private logger: Logger,
    ) {}
    async execute(command: ListMeetingTypesCommand): Promise<Either<Failure[], PaginatedResult<MeetingType> | undefined>> {
        try {
            const result = await this.service.all(command.data.page, command.data.perPage, command.data.search, command.data.orderBy);
            return Right(result);
        } catch (error) {
            this.logger.error("Error listing meeting types: " + JSON.stringify(error));
            return Left([]);
        }
    }
}
