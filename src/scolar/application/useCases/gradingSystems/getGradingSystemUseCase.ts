import { UseCase, UseCaseCommand } from "@/scolar/application/useCases/useCase";
import { GradingSystem } from "@/scolar/domain/entities/grading_system";
import { GRADING_SYSTEM_SERVICE } from "@/scolar/domain/symbols/GradingSystemSymbol";
import { GradingSystemService } from "@/scolar/domain/services/GradingSystemService";
import { GradingSystemError } from "@/scolar/domain/entities/GradingSystemError";
import { LOGGER } from "@/scolar/domain/symbols/SharedSymbol";
import { Logger } from "@/scolar/infrastructure/services/Logger";
import { inject, injectable } from "inversify";
import { Either, Left, Right } from "purify-ts/Either";

export class GetGradingSystemCommand implements UseCaseCommand {
    constructor(private id: number) {}

    get data() {
        return this.id;
    }
}

export type GetGradingSystemUseCase = UseCase<GradingSystem, GetGradingSystemCommand>;

@injectable()
export class GetGradingSystemUseCaseImpl implements GetGradingSystemUseCase {
    constructor(
        @inject(GRADING_SYSTEM_SERVICE) private gradingSystemService: GradingSystemService,
        @inject(LOGGER) private logger: Logger
    ) {}

    async execute(command: GetGradingSystemCommand): Promise<Either<GradingSystemError[], GradingSystem | undefined>> {
        try {
            const result = await this.gradingSystemService.get(command.data);
            return Right(result);
        } catch (e) {
            this.logger.error(JSON.stringify(e));
            return Left([GradingSystemError.GRADING_SYSTEM_SERVICE_ERROR]);
        }
    }
}

