import { UseCase, UseCaseCommand } from "@/scolar/application/useCases/useCase";
import { Either, Left, Right } from "purify-ts/Either";
import { GRADING_SYSTEM_SERVICE } from "@/scolar/domain/symbols/GradingSystemSymbol";
import { GradingSystemService } from "@/scolar/domain/services/GradingSystemService";
import { LOGGER } from "@/scolar/domain/symbols/SharedSymbol";
import { Logger } from "@/scolar/infrastructure/services/Logger";
import { GradingSystemError } from "@/scolar/domain/entities/GradingSystemError";
import { inject, injectable } from "inversify";

export class DeleteGradingSystemCommand implements UseCaseCommand {
    constructor(private id: number) {}

    get data() {
        return this.id;
    }
}

export type DeleteGradingSystemUseCase = UseCase<void, DeleteGradingSystemCommand>;

@injectable()
export class DeleteGradingSystemUseCaseImpl implements DeleteGradingSystemUseCase {
    constructor(
        @inject(GRADING_SYSTEM_SERVICE) private gradingSystemService: GradingSystemService,
        @inject(LOGGER) private logger: Logger
    ) {}

    async execute(command: DeleteGradingSystemCommand): Promise<Either<GradingSystemError[], void>> {
        try {
            const res = await this.gradingSystemService.delete(command.data);
            return Right(res);
        } catch (e) {
            this.logger.error(JSON.stringify(e));
            return Left([GradingSystemError.GRADING_SYSTEM_SERVICE_ERROR]);
        }
    }
}

