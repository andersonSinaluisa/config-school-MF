import { UseCase, UseCaseCommand } from "@/scolar/application/useCases/useCase";
import Failure from "@/scolar/domain/failure";
import { MeetingTypeService } from "@/scolar/domain/services/MeetingTypeService";
import { MEETING_TYPE_SERVICE } from "@/scolar/domain/symbols/MeetingTypeSymbol";
import { injectable, inject } from "inversify";
import { Either, Right, Left } from "purify-ts/Either";
import { LOGGER } from "@/scolar/domain/symbols/SharedSymbol";
import { Logger } from "@/scolar/infrastructure/services/Logger";

export class DeleteMeetingTypeCommand implements UseCaseCommand{
    constructor(
        private id: number
    ) { }

    get data() {
        return this.id;
    }
}

export type DeleteMeetingTypeUseCase = UseCase<void, DeleteMeetingTypeCommand>;

@injectable()
export class DeleteMeetingTypeUseCaseImpl implements DeleteMeetingTypeUseCase {
    constructor(
        @inject(MEETING_TYPE_SERVICE) private service: MeetingTypeService,
        @inject(LOGGER) private logger: Logger,
    ) {}
    async execute(command: DeleteMeetingTypeCommand): Promise<Either<Failure[], void>> {
        try {
            await this.service.delete(command.data);
            return Right(undefined);
        } catch (error) {
            this.logger.error("Error deleting meeting type: " + JSON.stringify(error));
            return Left([]);
        }
    }
}
