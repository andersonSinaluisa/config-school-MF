import { EmptyUseCaseCommand, UseCase } from "@/scolar/application/useCases/useCase";
import Failure from "@/scolar/domain/failure";
import { SectionBreakService } from "@/scolar/domain/services/SectionBreakService";
import { SECTION_BREAK_SERVICE } from "@/scolar/domain/symbols/SectionBreakSymbol";
import { injectable, inject } from "inversify";
import { Either, Right, Left } from "purify-ts/Either";
import { LOGGER } from "@/scolar/domain/symbols/SharedSymbol";
import { Logger } from "@/scolar/infrastructure/services/Logger";

export class DeleteSectionBreakCommand extends EmptyUseCaseCommand {
    constructor(public id: number) { super(); }
}

export type DeleteSectionBreakUseCase = UseCase<void, DeleteSectionBreakCommand>

@injectable()
export class DeleteSectionBreakUseCaseImpl implements DeleteSectionBreakUseCase {
    constructor(
        @inject(SECTION_BREAK_SERVICE) private service: SectionBreakService,
        @inject(LOGGER) private logger: Logger,
    ) {}
    async execute(command: DeleteSectionBreakCommand): Promise<Either<Failure[], void | undefined>> {
        try {
            const result = await this.service.delete(command.id);
            return Right(result);
        } catch (error) {
            this.logger.error("Error deleting section break: " + JSON.stringify(error));
            return Left([]);
        }
    }
}

