import { UseCase, UseCaseCommand } from "@/scolar/application/useCases/useCase";
import { LOGGER } from "@/scolar/domain/symbols/SharedSymbol";
import { Logger } from "@/scolar/infrastructure/services/Logger";
import { Subject } from "@/scolar/domain/entities/subject";
import { SubjectError } from "@/scolar/domain/entities/subjectError";
import { SubjectService } from "@/scolar/domain/services/SubjectService";
import { SUBJECT_SERVICE } from "@/scolar/domain/symbols/SubjectSymbol";
import { inject, injectable } from "inversify";
import {  Left, Right } from "purify-ts/Either";

export class UpdateSubjectCommand implements UseCaseCommand{
    constructor(
        private readonly _data: Subject,
    ) { }

 
    get data() {
        return this._data;
    }
}

export type UpdateSubjectUseCase = UseCase<Subject, UpdateSubjectCommand>


@injectable()
export class UpdateSubjectUseCaseImpl implements UpdateSubjectUseCase {
    constructor(
        @inject(SUBJECT_SERVICE) private subjectRepository: SubjectService,
        @inject(LOGGER) private logger: Logger
    ) { }
    async execute(command: UpdateSubjectCommand) {
        try {
            const result = await this.subjectRepository.update(command.data);
            return Right(result);
        } catch (error) {
            this.logger.error("Error updating subject"+JSON.stringify(error));
            return Left([SubjectError.SUBJECT_NOT_UPDATED]);
        }
    }
}