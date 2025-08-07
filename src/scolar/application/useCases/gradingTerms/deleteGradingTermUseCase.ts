import { UseCase, UseCaseCommand } from "@/scolar/application/useCases/useCase";
import { Either, Left, Right } from "purify-ts/Either";
import { GRADING_TERM_SERVICE } from "@/scolar/domain/symbols/GradingTermSymbol";
import { GradingTermService } from "@/scolar/domain/services/GradingTermService";
import { LOGGER } from "@/scolar/domain/symbols/SharedSymbol";
import { Logger } from "@/scolar/infrastructure/services/Logger";
import { GradingTermError } from "@/scolar/domain/entities/GradingTermError";
import { inject, injectable } from "inversify";

export class DeleteGradingTermCommand implements UseCaseCommand {
    constructor(private id: number) {}

    get data() {
        return this.id;
    }
}

export type DeleteGradingTermUseCase = UseCase<void, DeleteGradingTermCommand>;

@injectable()
export class DeleteGradingTermUseCaseImpl implements DeleteGradingTermUseCase {
    constructor(
        @inject(GRADING_TERM_SERVICE) private gradingTermService: GradingTermService,
        @inject(LOGGER) private logger: Logger
    ) {}

    async execute(command: DeleteGradingTermCommand): Promise<Either<GradingTermError[], void>> {
        try {
            const res = await this.gradingTermService.delete(command.data);
            return Right(res);
        } catch (e) {
            this.logger.error(JSON.stringify(e));
            return Left([GradingTermError.GRADING_TERM_SERVICE_ERROR]);
        }
    }
}
