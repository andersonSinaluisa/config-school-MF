import { UseCase, UseCaseCommand } from "@/scolar/application/useCases/useCase";
import Failure from "@/scolar/domain/failure";
import { Parallel } from "@/scolar/domain/entities/parallel";
import { inject, injectable } from "inversify";
import { PARALLEL_SERVICE } from "@/scolar/domain/symbols/ParallelSymbol";
import { ParallelService } from "@/scolar/domain/services/ParallelService";
import { Either, Left, Right } from "purify-ts/Either";
import { extractErrorMessage } from "@/lib/utils";


export class CreateParallelUseCaseCommand implements UseCaseCommand{
    
    constructor(
        public  name: string,
        public  courseId: number,
        public  capacity: number,
        public  sectionId: number,
        public  schoolYearId: number,
    ) {}


    get data() {
        return new Parallel(
             0,
            this.name,
            this.courseId,
            this.capacity,
            this.sectionId,
            this.schoolYearId
        )
    }
}

export type CreateParallelUseCase = UseCase< Parallel, CreateParallelUseCaseCommand>


@injectable()
export class CreateParallelUseCaseImpl implements CreateParallelUseCase {

    constructor(
        @inject(PARALLEL_SERVICE) private readonly parallelService: ParallelService
    ){}
    async execute(command: CreateParallelUseCaseCommand): Promise<Either<Failure[], Parallel | undefined>> {
        try {
            const parallel = await this.parallelService.create(command.data);
            return Right(parallel);
        } catch (e) {
            console.error("Error creating parallel:", e);
            const error = extractErrorMessage(e);
            return Left([error]);
        }
    }
    
}