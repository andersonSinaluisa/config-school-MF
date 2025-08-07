import { PaginateUseCaseCommand, UseCase } from "@/scolar/application/useCases/useCase";
import Failure from "@/scolar/domain/failure";
import { PaginatedResult } from "@/scolar/infrastructure/dto/paginateDto";
import { Parallel } from "@/scolar/domain/entities/parallel";
import { Either, Left, Right } from "purify-ts/Either";
import { inject, injectable } from "inversify";
import { PARALLEL_SERVICE } from "@/scolar/domain/symbols/ParallelSymbol";
import { ParallelService } from "@/scolar/domain/services/ParallelService";
import { extractErrorMessage } from "@/lib/utils";
export class ListParallelUseCaseCommand extends PaginateUseCaseCommand {

}


export type ListParallelUseCase = UseCase<PaginatedResult<Parallel>, ListParallelUseCaseCommand>

@injectable()
export class ListParallelUseCaseImpl implements ListParallelUseCase {
    constructor(
        @inject(PARALLEL_SERVICE) private parallelService: ParallelService
    ) { }
    async execute(command: ListParallelUseCaseCommand): Promise<Either<Failure[], PaginatedResult<Parallel> | undefined>> {
        try {
            const result = await this.parallelService.all(command.data.page, command.data.perPage, command.data.search);
            return Right(result);
        } catch (error) {
            const _error = extractErrorMessage(error);
            return Left([_error]);
        }
    }

}