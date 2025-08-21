
import { extractErrorMessage } from "@/lib/utils";
import { PaginateUseCaseCommand, UseCase } from "@/scolar/application/useCases/useCase";
import { PaginatedResult } from "@/scolar/infrastructure/dto/paginateDto";
import { Parallel } from "@/scolar/domain/entities/parallel";
import { ParallelService } from "@/scolar/domain/services/ParallelService";
import { PARALLEL_SERVICE } from "@/scolar/domain/symbols/ParallelSymbol";
import { inject, injectable } from "inversify";
import { Left, Right } from "purify-ts/Either";



export class ListParallelByFiltersUseCaseCommand extends PaginateUseCaseCommand {
    constructor(
        public params: { courseId?: number; schoolYearId?: number; name?: string; capacity?: number; sectionId?: number; },
        page: number = 1,
        limit: number = 10,
        orderby: string[],
        search?: string,

    ) {
        super(page, limit, orderby, search);
    }

    get data() {
        return {
            ...super.data,
           params: this.params
        };
    }
}



export type ListParallelByFiltersUseCase = UseCase<PaginatedResult<Parallel>, ListParallelByFiltersUseCaseCommand>


@injectable()
export class ListParallelByFiltersUseCaseImpl implements ListParallelByFiltersUseCase {
    constructor(
        @inject(PARALLEL_SERVICE) private readonly parallelRepository: ParallelService
    ) { }

    async execute(command: ListParallelByFiltersUseCaseCommand) {
        try {
            const res = await this.parallelRepository.findByFilters(
                command.data.params,
                command.data.page,
                command.data.perPage,
                command.data.search,
                command.data.orderBy
            )
            console.log(res);
            return Right(res);
        } catch (error) {
            const _error = extractErrorMessage(error);
            return Left([_error])
        }
    }
}
