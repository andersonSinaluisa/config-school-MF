import { PaginateUseCaseCommand, UseCase } from "@/scolar/application/useCases/useCase";
import Failure from "@/scolar/domain/failure";
import { PaginatedResult } from "@/scolar/infrastructure/dto/paginateDto";
import { Subject } from "@/scolar/domain/entities/subject";
import { SubjectService } from "@/scolar/domain/services/SubjectService";
import { SUBJECT_SERVICE } from "@/scolar/domain/symbols/SubjectSymbol";
import { injectable, inject } from "inversify";
import { Either, Right, Left } from "purify-ts/Either";
import { LOGGER } from "@/scolar/domain/symbols/SharedSymbol";
import { Logger } from "@/scolar/infrastructure/services/Logger";

export class ListSubjectCommand extends PaginateUseCaseCommand{}


export type ListSubjectUseCase = UseCase<PaginatedResult<Subject>, ListSubjectCommand>


@injectable()
export class ListSubjectUseCaseImpl implements ListSubjectUseCase {
  constructor(
    @inject(SUBJECT_SERVICE)
    private subjectService: SubjectService,
    @inject(LOGGER)
    private logger: Logger
    ) {}
    async execute(command: ListSubjectCommand): Promise<Either<Failure[], PaginatedResult<Subject> | undefined>> {
        try{
            const result = await this.subjectService.all(command.data.page,
                command.data.perPage,
                command.data.search,
                command.data.orderBy,
            )
            return Right(result)
        }catch (error) {
            this.logger.error("Error listing subjects: " + JSON.stringify(error));
            return Left([])
        }
    }
        
}