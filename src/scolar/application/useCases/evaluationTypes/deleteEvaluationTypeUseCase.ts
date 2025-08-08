import { UseCase, UseCaseCommand } from "@/scolar/application/useCases/useCase";
import { Either, Left, Right } from "purify-ts/Either";
import { EVALUATION_TYPE_SERVICE } from "@/scolar/domain/symbols/EvaluationTypeSymbol";
import { EvaluationTypeService } from "@/scolar/domain/services/EvaluationTypeService";
import { LOGGER } from "@/scolar/domain/symbols/SharedSymbol";
import { Logger } from "@/scolar/infrastructure/services/Logger";
import { EvaluationTypeError } from "@/scolar/domain/entities/EvaluationTypeError";
import { inject, injectable } from "inversify";

export class DeleteEvaluationTypeCommand implements UseCaseCommand {
    constructor(private id: number) {}

    get data() {
        return this.id;
    }
}

export type DeleteEvaluationTypeUseCase = UseCase<void, DeleteEvaluationTypeCommand>;

@injectable()
export class DeleteEvaluationTypeUseCaseImpl implements DeleteEvaluationTypeUseCase {
    constructor(
        @inject(EVALUATION_TYPE_SERVICE) private evaluationTypeService: EvaluationTypeService,
        @inject(LOGGER) private logger: Logger
    ) {}

    async execute(command: DeleteEvaluationTypeCommand): Promise<Either<EvaluationTypeError[], void>> {
        try {
            const res = await this.evaluationTypeService.delete(command.data);
            return Right(res);
        } catch (e) {
            this.logger.error(JSON.stringify(e));
            return Left([EvaluationTypeError.EVALUATION_TYPE_SERVICE_ERROR]);
        }
    }
}
