import { UseCase, UseCaseCommand } from "@/scolar/application/useCases/useCase";
import { LOGGER } from "@/scolar/domain/symbols/SharedSymbol";
import { Logger } from "@/scolar/infrastructure/services/Logger";
import { Subject } from "@/scolar/domain/entities/subject";
import { SubjectError } from "@/scolar/domain/entities/subjectError";
import { SubjectService } from "@/scolar/domain/services/SubjectService";
import { SUBJECT_SERVICE } from "@/scolar/domain/symbols/SubjectSymbol";
import { inject, injectable } from "inversify";
import { Left, Right } from "purify-ts/Either";
export class GetSubjectCommand implements UseCaseCommand {
    constructor(
        private readonly _id: number,
    ) { }
    get id(): number {
        return this._id;
    }
}

export type GetSubjectUseCase = UseCase<Subject, GetSubjectCommand>

@injectable()
export class GetSubjectUseCaseImpl implements GetSubjectUseCase {
    constructor(
        @inject(SUBJECT_SERVICE) private subjectRepository: SubjectService,
        @inject(LOGGER) private logger: Logger
    ) { }
    async execute(command: GetSubjectCommand) {
        try {
            const result = await this.subjectRepository.get(command.id);
            return Right(result);
        } catch (error) {
            this.logger.error("Error getting subject" + JSON.stringify(error));
            return Left([SubjectError.SUBJECT_NOT_FOUND]);
        }
    }
}