import { extractErrorMessage } from "@/lib/utils";
import { PaginateUseCaseCommand, UseCase } from "@/scolar/application/useCases/useCase";
import { PaginatedResult } from "@/scolar/infrastructure/dto/paginateDto";
import { Parallel } from "@/scolar/domain/entities/parallel";
import { ParallelService } from "@/scolar/domain/services/ParallelService";
import { PARALLEL_SERVICE } from "@/scolar/domain/symbols/ParallelSymbol";
import {inject, injectable} from "inversify";
import { Left, Right } from "purify-ts/Either";

export class ListParallelByCourseUseCaseCommand extends PaginateUseCaseCommand{
    constructor(
        private readonly courseId: number,
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
            courseId: this.courseId
        };
    }
}



export type ListParallelByCourseUseCase = UseCase<PaginatedResult<Parallel>, ListParallelByCourseUseCaseCommand>


@injectable()
export class ListParallelByCourseUseCaseImpl implements ListParallelByCourseUseCase {
    constructor(
        @inject(PARALLEL_SERVICE) private readonly parallelRepository: ParallelService
    ) {}

    async execute(command: ListParallelByCourseUseCaseCommand) {
        try{
            const res = await this.parallelRepository.getByCourseId(
                command.data.page,
                command.data.perPage,
                command.data.courseId,
                command.data.search,
                command.data.orderBy
            )
            console.log(res);
            return Right(res);
        }catch(error){
            const _error = extractErrorMessage(error);
            return Left([_error])
        }
    }
}
