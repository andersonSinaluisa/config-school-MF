import { UseCase, UseCaseCommand } from "@/scolar/application/useCases/useCase";
import Failure from "@/scolar/domain/failure";
import { AttendanceCode } from "@/scolar/domain/entities/attendanceCode";
import { AttendanceCodeService } from "@/scolar/domain/services/AttendanceCodeService";
import { ATTENDANCE_CODE_SERVICE } from "@/scolar/domain/symbols/AttendanceCodeSymbol";
import { injectable, inject } from "inversify";
import { Either, Right, Left } from "purify-ts/Either";
import { LOGGER } from "@/scolar/domain/symbols/SharedSymbol";
import { Logger } from "@/scolar/infrastructure/services/Logger";

export class GetAttendanceCodeCommand extends UseCaseCommand<number> {}

export type GetAttendanceCodeUseCase = UseCase<AttendanceCode, GetAttendanceCodeCommand>;

@injectable()
export class GetAttendanceCodeUseCaseImpl implements GetAttendanceCodeUseCase {
    constructor(
        @inject(ATTENDANCE_CODE_SERVICE) private service: AttendanceCodeService,
        @inject(LOGGER) private logger: Logger,
    ) {}
    async execute(command: GetAttendanceCodeCommand): Promise<Either<Failure[], AttendanceCode | undefined>> {
        try {
            const result = await this.service.get(command.data);
            return Right(result);
        } catch (error) {
            this.logger.error("Error getting attendance code: " + JSON.stringify(error));
            return Left([]);
        }
    }
}
