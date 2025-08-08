import { PaginateUseCaseCommand, UseCase } from "@/scolar/application/useCases/useCase";
import Failure from "@/scolar/domain/failure";
import { PaginatedResult } from "@/scolar/infrastructure/dto/paginateDto";
import { EvaluationType } from "@/scolar/domain/entities/evaluation_type";
import { EVALUATION_TYPE_SERVICE } from "@/scolar/domain/symbols/EvaluationTypeSymbol";
import { EvaluationTypeService } from "@/scolar/domain/services/EvaluationTypeService";
import { extractErrorMessage } from "@/lib/utils";
import { inject, injectable } from "inversify";
import { Either, Left, Right } from "purify-ts/Either";

export class ListEvaluationTypeCommand extends PaginateUseCaseCommand {}

export type ListEvaluationTypeUseCase = UseCase<PaginatedResult<EvaluationType>, ListEvaluationTypeCommand>;

@injectable()
export class ListEvaluationTypeUseCaseImpl implements ListEvaluationTypeUseCase {
    constructor(
        @inject(EVALUATION_TYPE_SERVICE) private evaluationTypeService: EvaluationTypeService
    ) {}

    async execute(command: ListEvaluationTypeCommand): Promise<Either<Failure[], PaginatedResult<EvaluationType> | undefined>> {
        try {
            const result = await this.evaluationTypeService.all(
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
