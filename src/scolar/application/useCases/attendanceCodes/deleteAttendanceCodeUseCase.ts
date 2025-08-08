import { UseCase, UseCaseCommand } from "@/scolar/application/useCases/useCase";
import Failure from "@/scolar/domain/failure";
import { AttendanceCodeService } from "@/scolar/domain/services/AttendanceCodeService";
import { ATTENDANCE_CODE_SERVICE } from "@/scolar/domain/symbols/AttendanceCodeSymbol";
import { injectable, inject } from "inversify";
import { Either, Right, Left } from "purify-ts/Either";
import { LOGGER } from "@/scolar/domain/symbols/SharedSymbol";
import { Logger } from "@/scolar/infrastructure/services/Logger";

export class DeleteAttendanceCodeCommand implements UseCaseCommand {
    constructor(
        private id: number
    ) { }

    get data() {
        return this.id;
    }
}

export type DeleteAttendanceCodeUseCase = UseCase<void, DeleteAttendanceCodeCommand>;

@injectable()
export class DeleteAttendanceCodeUseCaseImpl implements DeleteAttendanceCodeUseCase {
    constructor(
        @inject(ATTENDANCE_CODE_SERVICE) private service: AttendanceCodeService,
        @inject(LOGGER) private logger: Logger,
    ) {}
    async execute(command: DeleteAttendanceCodeCommand): Promise<Either<Failure[], void>> {
        try {
            await this.service.delete(command.data);
            return Right(undefined);
        } catch (error) {
            this.logger.error("Error deleting attendance code: " + JSON.stringify(error));
            return Left([]);
        }
    }
}
