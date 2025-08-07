import { extractErrorMessage } from "@/lib/utils";
import { UseCase, UseCaseCommand } from "@/scolar/application/useCases/useCase";
import Failure from "@/scolar/domain/failure";
import { Parallel } from "@/scolar/domain/entities/parallel";
import { ParallelService } from "@/scolar/domain/services/ParallelService";
import { PARALLEL_SERVICE } from "@/scolar/domain/symbols/ParallelSymbol";
import {injectable, inject} from "inversify";
import { Either, Left, Right } from "purify-ts/Either";

export class UpdateParallelUseCaseCommand implements UseCaseCommand{

     constructor(
            public readonly id: number,
            public readonly name: string,
            public readonly courseId: number,
            public readonly capacity: number,
            public readonly sectionId: number,
            public readonly schoolYearId: number,
        ) {}
    
    
        get data() {
            return new Parallel(
                this.id,
                this.name,
                this.courseId,
                this.capacity,
                this.sectionId,
                this.schoolYearId
            )
        }

}

export type UpdateParallelUseCase = UseCase<Parallel, UpdateParallelUseCaseCommand>


@injectable()
export class UpdateParallelUseCaseImpl implements UpdateParallelUseCase {
    constructor(
        @inject(PARALLEL_SERVICE) private readonly parallelService: ParallelService
    ){}
    async execute(command: UpdateParallelUseCaseCommand): Promise<Either<Failure[], Parallel | undefined>> {
        try{
            const parallel = command.data;
            const result = await this.parallelService.update(parallel);
            return Right(result);
        }catch (error) {
            const _error = extractErrorMessage(error);
            return Left([_error]);

        }
    }
}