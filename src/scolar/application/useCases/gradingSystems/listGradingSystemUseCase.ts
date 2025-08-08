import { PaginateUseCaseCommand, UseCase } from "@/scolar/application/useCases/useCase";
import Failure from "@/scolar/domain/failure";
import { PaginatedResult } from "@/scolar/infrastructure/dto/paginateDto";
import { GradingSystem } from "@/scolar/domain/entities/grading_system";
import { GRADING_SYSTEM_SERVICE } from "@/scolar/domain/symbols/GradingSystemSymbol";
import { GradingSystemService } from "@/scolar/domain/services/GradingSystemService";
import { extractErrorMessage } from "@/lib/utils";
import { inject, injectable } from "inversify";
import { Either, Left, Right } from "purify-ts/Either";

export class ListGradingSystemCommand extends PaginateUseCaseCommand {}

export type ListGradingSystemUseCase = UseCase<PaginatedResult<GradingSystem>, ListGradingSystemCommand>;

@injectable()
export class ListGradingSystemUseCaseImpl implements ListGradingSystemUseCase {
    constructor(
        @inject(GRADING_SYSTEM_SERVICE) private gradingSystemService: GradingSystemService
    ) {}

    async execute(command: ListGradingSystemCommand): Promise<Either<Failure[], PaginatedResult<GradingSystem> | undefined>> {
        try {
            const result = await this.gradingSystemService.all(
                command.data.page,
                command.data.perPage,
                command.data.search,
                command.data.orderBy
            );
            return Right(result);
        } catch (error) {
            const _error = extractErrorMessage(error);
            return Left([_error]);
        }
    }
}

