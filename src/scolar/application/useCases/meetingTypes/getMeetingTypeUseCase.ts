import { UseCase, UseCaseCommand } from "@/scolar/application/useCases/useCase";
import Failure from "@/scolar/domain/failure";
import { MeetingType } from "@/scolar/domain/entities/meetingType";
import { MeetingTypeService } from "@/scolar/domain/services/MeetingTypeService";
import { MEETING_TYPE_SERVICE } from "@/scolar/domain/symbols/MeetingTypeSymbol";
import { injectable, inject } from "inversify";
import { Either, Right, Left } from "purify-ts/Either";
import { LOGGER } from "@/scolar/domain/symbols/SharedSymbol";
import { Logger } from "@/scolar/infrastructure/services/Logger";

export class GetMeetingTypeCommand implements UseCaseCommand {
    constructor(
        private id: number
    ) { }

    get data() {
        return this.id;
    }
}

export type GetMeetingTypeUseCase = UseCase<MeetingType, GetMeetingTypeCommand>;

@injectable()
export class GetMeetingTypeUseCaseImpl implements GetMeetingTypeUseCase {
    constructor(
        @inject(MEETING_TYPE_SERVICE) private service: MeetingTypeService,
        @inject(LOGGER) private logger: Logger,
    ) {}
    async execute(command: GetMeetingTypeCommand): Promise<Either<Failure[], MeetingType | undefined>> {
        try {
            const result = await this.service.get(command.data);
            return Right(result);
        } catch (error) {
            this.logger.error("Error getting meeting type: " + JSON.stringify(error));
            return Left([]);
        }
    }
}
