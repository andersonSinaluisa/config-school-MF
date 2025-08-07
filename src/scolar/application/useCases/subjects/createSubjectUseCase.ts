import { UseCase, UseCaseCommand } from "@/scolar/application/useCases/useCase";
import { LOGGER } from "@/scolar/domain/symbols/SharedSymbol";
import { Logger } from "@/scolar/infrastructure/services/Logger";
import { Subject } from "@/scolar/domain/entities/subject";
import { SubjectError } from "@/scolar/domain/entities/subjectError";
import { SubjectService } from "@/scolar/domain/services/SubjectService";
import { SUBJECT_SERVICE } from "@/scolar/domain/symbols/SubjectSymbol";
import { inject, injectable } from "inversify";
import {  Left, Right } from "purify-ts/Either";


export class CreateSubjectCommand implements UseCaseCommand {
    constructor(
        private readonly _data: Subject,
    ) { }

    get data(): Subject {
        return this._data;
    }
}


export type CreateSubjectUseCase = UseCase<Subject, CreateSubjectCommand>


@injectable()
export class CreateSubjectUseCaseImpl implements CreateSubjectUseCase {
    constructor(
        @inject(SUBJECT_SERVICE) private subjectRepository: SubjectService,
        @inject(LOGGER) private logger: Logger
    ) { }
    async execute(command: CreateSubjectCommand) {
        try {

            const result = await this.subjectRepository.create(command.data);
            return Right(result);
        } catch (error) {
            this.logger.error("Error creating subject"+JSON.stringify(error));
            return Left([SubjectError.SUBJECT_NOT_CREATED]);
        }
    }


}