import { UseCase, UseCaseCommand } from "@/scolar/application/useCases/useCase";
import Failure from "@/scolar/domain/failure";
import { MeetingType } from "@/scolar/domain/entities/meetingType";
import { MeetingTypeService } from "@/scolar/domain/services/MeetingTypeService";
import { MEETING_TYPE_SERVICE } from "@/scolar/domain/symbols/MeetingTypeSymbol";
import { injectable, inject } from "inversify";
import { Either, Right, Left } from "purify-ts/Either";
import { LOGGER } from "@/scolar/domain/symbols/SharedSymbol";
import { Logger } from "@/scolar/infrastructure/services/Logger";

export class UpdateMeetingTypeCommand extends UseCaseCommand<MeetingType> {}

export type UpdateMeetingTypeUseCase = UseCase<MeetingType, UpdateMeetingTypeCommand>;

@injectable()
export class UpdateMeetingTypeUseCaseImpl implements UpdateMeetingTypeUseCase {
    constructor(
        @inject(MEETING_TYPE_SERVICE) private service: MeetingTypeService,
        @inject(LOGGER) private logger: Logger,
    ) {}
    async execute(command: UpdateMeetingTypeCommand): Promise<Either<Failure[], MeetingType | undefined>> {
        try {
            const result = await this.service.update(command.data);
            return Right(result);
        } catch (error) {
            this.logger.error("Error updating meeting type: " + JSON.stringify(error));
            return Left([]);
        }
    }
}
