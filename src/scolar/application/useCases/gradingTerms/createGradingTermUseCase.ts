import { UseCase, UseCaseCommand } from "@/scolar/application/useCases/useCase";
import { GradingTerm } from "@/scolar/domain/entities/grading_term";
import { Either, Left, Right } from "purify-ts/Either";
import { GRADING_TERM_SERVICE } from "@/scolar/domain/symbols/GradingTermSymbol";
import { GradingTermService } from "@/scolar/domain/services/GradingTermService";
import { Logger } from "@/scolar/infrastructure/services/Logger";
import { LOGGER } from "@/scolar/domain/symbols/SharedSymbol";
import { GradingTermError } from "@/scolar/domain/entities/GradingTermError";
import { inject, injectable } from "inversify";
import Failure from "@/scolar/domain/failure";
import { isAxiosError } from "axios";

export class CreateGradingTermCommand implements UseCaseCommand {
    constructor(
        private gradingSystem_id: number,
        private academicYear_id: number,
        private name: string,
        private order: number,
        private weight: string
    ) {}

    get data() {
        return new GradingTerm(
            0,
            this.gradingSystem_id,
            this.academicYear_id,
            this.name,
            this.order,
            this.weight
        );
    }
}

export type CreateGradingTermUseCase = UseCase<GradingTerm, CreateGradingTermCommand>;

@injectable()
export class CreateGradingTermUseCaseImpl implements CreateGradingTermUseCase {
    constructor(
        @inject(GRADING_TERM_SERVICE) private gradingTermService: GradingTermService,
        @inject(LOGGER) private logger: Logger
    ) {}

    async execute(command: CreateGradingTermCommand): Promise<Either<Failure[], GradingTerm | undefined>> {
        try {
            const res = await this.gradingTermService.create(command.data);
            return Right(res);
        } catch (e) {
            if (isAxiosError(e)) {
                this.logger.error(JSON.stringify(e.response?.data));
                const message = e.response?.data?.message;
                const error = e.response?.data?.error;
                if (message && error) {
                    return Left([new GradingTermError(error, message, error)]);
                }
            }
            return Left([GradingTermError.GRADING_TERM_SERVICE_ERROR]);
        }
    }
}
