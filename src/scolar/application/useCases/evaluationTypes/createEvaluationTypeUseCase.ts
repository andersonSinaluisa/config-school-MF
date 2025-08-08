import { UseCase, UseCaseCommand } from "@/scolar/application/useCases/useCase";
import { EvaluationType } from "@/scolar/domain/entities/evaluation_type";
import { Either, Left, Right } from "purify-ts/Either";
import { EVALUATION_TYPE_SERVICE } from "@/scolar/domain/symbols/EvaluationTypeSymbol";
import { EvaluationTypeService } from "@/scolar/domain/services/EvaluationTypeService";
import { Logger } from "@/scolar/infrastructure/services/Logger";
import { LOGGER } from "@/scolar/domain/symbols/SharedSymbol";
import { EvaluationTypeError } from "@/scolar/domain/entities/EvaluationTypeError";
import { inject, injectable } from "inversify";
import Failure from "@/scolar/domain/failure";
import { isAxiosError } from "axios";

export class CreateEvaluationTypeCommand implements UseCaseCommand {
    constructor(
        private name: string,
        private description: string,
        private weight: string
    ) {}

    get data() {
        return new EvaluationType(
            0,
            this.name,
            this.description,
            this.weight
        );
    }
}

export type CreateEvaluationTypeUseCase = UseCase<EvaluationType, CreateEvaluationTypeCommand>;

@injectable()
export class CreateEvaluationTypeUseCaseImpl implements CreateEvaluationTypeUseCase {
    constructor(
        @inject(EVALUATION_TYPE_SERVICE) private evaluationTypeService: EvaluationTypeService,
        @inject(LOGGER) private logger: Logger
    ) {}

    async execute(command: CreateEvaluationTypeCommand): Promise<Either<Failure[], EvaluationType | undefined>> {
        try {
            const res = await this.evaluationTypeService.create(command.data);
            return Right(res);
        } catch (e) {
            if (isAxiosError(e)) {
                this.logger.error(JSON.stringify(e.response?.data));
                const message = e.response?.data?.message;
                const error = e.response?.data?.error;
                if (message && error) {
                    return Left([new EvaluationTypeError(error, message, error)]);
                }
            }
            return Left([EvaluationTypeError.EVALUATION_TYPE_SERVICE_ERROR]);
        }
    }
}
