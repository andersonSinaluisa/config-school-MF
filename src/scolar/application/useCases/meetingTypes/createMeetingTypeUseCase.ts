import { UseCase, UseCaseCommand } from "@/scolar/application/useCases/useCase";
import Failure from "@/scolar/domain/failure";
import { MeetingType } from "@/scolar/domain/entities/meetingType";
import { MeetingTypeService } from "@/scolar/domain/services/MeetingTypeService";
import { MEETING_TYPE_SERVICE } from "@/scolar/domain/symbols/MeetingTypeSymbol";
import { injectable, inject } from "inversify";
import { Either, Right, Left } from "purify-ts/Either";
import { LOGGER } from "@/scolar/domain/symbols/SharedSymbol";
import { Logger } from "@/scolar/infrastructure/services/Logger";

export class CreateMeetingTypeCommand extends UseCaseCommand<MeetingType> {}

export type CreateMeetingTypeUseCase = UseCase<MeetingType, CreateMeetingTypeCommand>;

@injectable()
export class CreateMeetingTypeUseCaseImpl implements CreateMeetingTypeUseCase {
    constructor(
        @inject(MEETING_TYPE_SERVICE) private service: MeetingTypeService,
        @inject(LOGGER) private logger: Logger,
    ) {}
    async execute(command: CreateMeetingTypeCommand): Promise<Either<Failure[], MeetingType | undefined>> {
        try {
            const result = await this.service.create(command.data);
            return Right(result);
        } catch (error) {
            this.logger.error("Error creating meeting type: " + JSON.stringify(error));
            return Left([]);
        }
    }
}
