import { PaginateUseCaseCommand, UseCase } from "@/scolar/application/useCases/useCase";
import Failure from "@/scolar/domain/failure";
import { PaginatedResult } from "@/scolar/infrastructure/dto/paginateDto";
import { GradingTerm } from "@/scolar/domain/entities/grading_term";
import { GRADING_TERM_SERVICE } from "@/scolar/domain/symbols/GradingTermSymbol";
import { GradingTermService } from "@/scolar/domain/services/GradingTermService";
import { extractErrorMessage } from "@/lib/utils";
import { inject, injectable } from "inversify";
import { Either, Left, Right } from "purify-ts/Either";

export class ListGradingTermCommand extends PaginateUseCaseCommand {}

export type ListGradingTermUseCase = UseCase<PaginatedResult<GradingTerm>, ListGradingTermCommand>;

@injectable()
export class ListGradingTermUseCaseImpl implements ListGradingTermUseCase {
    constructor(
        @inject(GRADING_TERM_SERVICE) private gradingTermService: GradingTermService
    ) {}

    async execute(command: ListGradingTermCommand): Promise<Either<Failure[], PaginatedResult<GradingTerm> | undefined>> {
        try {
            const result = await this.gradingTermService.all(
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
