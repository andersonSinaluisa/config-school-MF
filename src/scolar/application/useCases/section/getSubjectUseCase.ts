import { UseCase, UseCaseCommand } from "@/scolar/application/useCases/useCase";
import { Subject } from "@/scolar/domain/entities/subject";
import {inject, injectable} from "inversify";
import { SUBJECT_SERVICE } from "@/scolar/domain/symbols/SubjectSymbol";
import { SubjectService } from "@/scolar/domain/services/SubjectService";
import { LOGGER } from "@/scolar/domain/symbols/SharedSymbol";
import { Logger } from "@/scolar/infrastructure/services/Logger";
import { Left, Right } from "purify-ts/Either";
import { SubjectError } from "@/scolar/domain/entities/subjectError";

export class GetSubjectUseCaseCommand implements UseCaseCommand {
    constructor(
        private _id: number
    ) {}
    get id(): number {
        return this._id;
    }
        
}

export type GetSubjectUseCase = UseCase<Subject,GetSubjectUseCaseCommand>


@injectable()
export class GetSubjectUseCaseImpl implements GetSubjectUseCase {
    constructor(
        @inject(SUBJECT_SERVICE) private subjectService: SubjectService,
        @inject(LOGGER) private logger: Logger
    ) { }
    
    async execute(command: GetSubjectUseCaseCommand) {
        try {
            const res = await this.subjectService.get(command.id);
            return Right(res);
        } catch (e) {
            if (e instanceof Error) {
                this.logger.error(e.message);
            }
            return Left([SubjectError.SUBJECT_NOT_FOUND])
        }
    }
}