import { UseCase, UseCaseCommand } from "@/scolar/application/useCases/useCase";
import { Either, Left, Right } from "purify-ts/Either";
import { inject, injectable } from "inversify";
import Failure from "@/scolar/domain/failure";
import { PARALLEL_SERVICE } from "@/scolar/domain/symbols/ParallelSymbol";
import { ParallelService } from "@/scolar/domain/services/ParallelService";
import { extractErrorMessage } from "@/lib/utils";

export class DeleteParallelUseCaseCommmand implements UseCaseCommand{
    constructor(
        public readonly id: number
    ) {}

    get data() {
        return this.id;
    }
}


export type DeleteParallelUseCase = UseCase<boolean, DeleteParallelUseCaseCommmand>


@injectable()
export class DeleteParallelUseCaseImpl implements DeleteParallelUseCase {
    constructor(
        @inject(PARALLEL_SERVICE) private readonly parallelService: ParallelService
    ){}
    async execute(command: DeleteParallelUseCaseCommmand): Promise<Either<Failure[], boolean | undefined>> {
        try{
            const id = command.data;
            const result = await this.parallelService.delete(id);
            return Right(result!=null);
        }catch (error) {
            const _error = extractErrorMessage(error);
            return Left([_error]);
        }
    }
}