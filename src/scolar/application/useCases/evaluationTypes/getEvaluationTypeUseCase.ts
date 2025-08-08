import { UseCase, UseCaseCommand } from "@/scolar/application/useCases/useCase";
import { EvaluationType } from "@/scolar/domain/entities/evaluation_type";
import { EVALUATION_TYPE_SERVICE } from "@/scolar/domain/symbols/EvaluationTypeSymbol";
import { EvaluationTypeService } from "@/scolar/domain/services/EvaluationTypeService";
import { EvaluationTypeError } from "@/scolar/domain/entities/EvaluationTypeError";
import { LOGGER } from "@/scolar/domain/symbols/SharedSymbol";
import { Logger } from "@/scolar/infrastructure/services/Logger";
import { inject, injectable } from "inversify";
import { Either, Left, Right } from "purify-ts/Either";

export class GetEvaluationTypeCommand implements UseCaseCommand {
    constructor(private id: number) {}

    get data() {
        return this.id;
    }
}

export type GetEvaluationTypeUseCase = UseCase<EvaluationType, GetEvaluationTypeCommand>;

@injectable()
export class GetEvaluationTypeUseCaseImpl implements GetEvaluationTypeUseCase {
    constructor(
        @inject(EVALUATION_TYPE_SERVICE) private evaluationTypeService: EvaluationTypeService,
        @inject(LOGGER) private logger: Logger
    ) {}

    async execute(command: GetEvaluationTypeCommand): Promise<Either<EvaluationTypeError[], EvaluationType | undefined>> {
        try {
            const result = await this.evaluationTypeService.get(command.data);
            return Right(result);
        } catch (e) {
            this.logger.error(JSON.stringify(e));
            return Left([EvaluationTypeError.EVALUATION_TYPE_SERVICE_ERROR]);
        }
    }
}
