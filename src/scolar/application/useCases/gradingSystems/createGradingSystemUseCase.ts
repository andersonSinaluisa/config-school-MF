import { UseCase, UseCaseCommand } from "@/scolar/application/useCases/useCase";
import { GradingSystem } from "@/scolar/domain/entities/grading_system";
import { Either, Left, Right } from "purify-ts/Either";
import { GRADING_SYSTEM_SERVICE } from "@/scolar/domain/symbols/GradingSystemSymbol";
import { GradingSystemService } from "@/scolar/domain/services/GradingSystemService";
import { Logger } from "@/scolar/infrastructure/services/Logger";
import { LOGGER } from "@/scolar/domain/symbols/SharedSymbol";
import { GradingSystemError } from "@/scolar/domain/entities/GradingSystemError";
import { inject, injectable } from "inversify";
import Failure from "@/scolar/domain/failure";
import { isAxiosError } from "axios";

export class CreateGradingSystemCommand implements UseCaseCommand {
    constructor(
        private name: string,
        private description: string,
        private numberOfTerms: number,
        private passingScore: string
    ) {}

    get data() {
        return new GradingSystem(
            0,
            this.name,
            this.description,
            this.numberOfTerms,
            this.passingScore
        );
    }
}

export type CreateGradingSystemUseCase = UseCase<GradingSystem, CreateGradingSystemCommand>;

@injectable()
export class CreateGradingSystemUseCaseImpl implements CreateGradingSystemUseCase {
    constructor(
        @inject(GRADING_SYSTEM_SERVICE) private gradingSystemService: GradingSystemService,
        @inject(LOGGER) private logger: Logger
    ) {}

    async execute(command: CreateGradingSystemCommand): Promise<Either<Failure[], GradingSystem | undefined>> {
        try {
            const res = await this.gradingSystemService.create(command.data);
            return Right(res);
        } catch (e) {
            if (isAxiosError(e)) {
                this.logger.error(JSON.stringify(e.response?.data));
                const message = e.response?.data?.message;
                const error = e.response?.data?.error;
                if (message && error) {
                    return Left([new GradingSystemError(error, message, error)]);
                }
            }
            return Left([GradingSystemError.GRADING_SYSTEM_SERVICE_ERROR]);
        }
    }
}
