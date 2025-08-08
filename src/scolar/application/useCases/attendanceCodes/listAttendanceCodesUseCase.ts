import { PaginateUseCaseCommand, UseCase } from "@/scolar/application/useCases/useCase";
import Failure from "@/scolar/domain/failure";
import { PaginatedResult } from "@/scolar/infrastructure/dto/paginateDto";
import { AttendanceCode } from "@/scolar/domain/entities/attendanceCode";
import { AttendanceCodeService } from "@/scolar/domain/services/AttendanceCodeService";
import { ATTENDANCE_CODE_SERVICE } from "@/scolar/domain/symbols/AttendanceCodeSymbol";
import { injectable, inject } from "inversify";
import { Either, Right, Left } from "purify-ts/Either";
import { LOGGER } from "@/scolar/domain/symbols/SharedSymbol";
import { Logger } from "@/scolar/infrastructure/services/Logger";

export class ListAttendanceCodesCommand extends PaginateUseCaseCommand {}

export type ListAttendanceCodesUseCase = UseCase<PaginatedResult<AttendanceCode>, ListAttendanceCodesCommand>

@injectable()
export class ListAttendanceCodesUseCaseImpl implements ListAttendanceCodesUseCase {
    constructor(
        @inject(ATTENDANCE_CODE_SERVICE) private service: AttendanceCodeService,
        @inject(LOGGER) private logger: Logger,
    ) {}
    async execute(command: ListAttendanceCodesCommand): Promise<Either<Failure[], PaginatedResult<AttendanceCode> | undefined>> {
        try {
            const result = await this.service.all(command.data.page, command.data.perPage, command.data.search, command.data.orderBy);
            return Right(result);
        } catch (error) {
            this.logger.error("Error listing attendance codes: " + JSON.stringify(error));
            return Left([]);
        }
    }
}
