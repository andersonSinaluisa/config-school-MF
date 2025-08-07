import { UseCase, UseCaseCommand } from "@/scolar/application/useCases/useCase";
import { GradingTerm } from "@/scolar/domain/entities/grading_term";
import { GRADING_TERM_SERVICE } from "@/scolar/domain/symbols/GradingTermSymbol";
import { GradingTermService } from "@/scolar/domain/services/GradingTermService";
import { GradingTermError } from "@/scolar/domain/entities/GradingTermError";
import { LOGGER } from "@/scolar/domain/symbols/SharedSymbol";
import { Logger } from "@/scolar/infrastructure/services/Logger";
import { inject, injectable } from "inversify";
import { Either, Left, Right } from "purify-ts/Either";

export class GetGradingTermCommand implements UseCaseCommand {
    constructor(private id: number) {}

    get data() {
        return this.id;
    }
}

export type GetGradingTermUseCase = UseCase<GradingTerm, GetGradingTermCommand>;

@injectable()
export class GetGradingTermUseCaseImpl implements GetGradingTermUseCase {
    constructor(
        @inject(GRADING_TERM_SERVICE) private gradingTermService: GradingTermService,
        @inject(LOGGER) private logger: Logger
    ) {}

    async execute(command: GetGradingTermCommand): Promise<Either<GradingTermError[], GradingTerm | undefined>> {
        try {
            const result = await this.gradingTermService.get(command.data);
            return Right(result);
        } catch (e) {
            this.logger.error(JSON.stringify(e));
            return Left([GradingTermError.GRADING_TERM_SERVICE_ERROR]);
        }
    }
}
