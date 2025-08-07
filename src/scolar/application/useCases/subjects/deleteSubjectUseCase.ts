import { UseCase, UseCaseCommand } from "@/scolar/application/useCases/useCase";
import { LOGGER } from "@/scolar/domain/symbols/SharedSymbol";
import { Logger } from "@/scolar/infrastructure/services/Logger";
import { SubjectError } from "@/scolar/domain/entities/subjectError";
import { SubjectService } from "@/scolar/domain/services/SubjectService";
import { SUBJECT_SERVICE } from "@/scolar/domain/symbols/SubjectSymbol";
import { Left, Right } from "purify-ts/Either";
import { inject, injectable } from "inversify";

export class DeleteSubjectCommand implements UseCaseCommand{
    constructor(
        private readonly _id: number,
    ) { }
    get id(): number {
        return this._id;
    }
}

export type DeleteSubjectUseCase = UseCase<void, DeleteSubjectCommand>


@injectable()
export class DeleteSubjectUseCaseImpl implements DeleteSubjectUseCase {
    constructor(
        @inject(SUBJECT_SERVICE) private subjectRepository: SubjectService,
        @inject(LOGGER) private logger: Logger
    ) { }
    async execute(command: DeleteSubjectCommand) {
        try {
            const result = await this.subjectRepository.delete(command.id);
            return Right(result);
        } catch (error) {
            this.logger.error("Error deleting subject"+JSON.stringify(error));
            return Left([SubjectError.SUBJECT_NOT_DELETED]);
        }
    }
}