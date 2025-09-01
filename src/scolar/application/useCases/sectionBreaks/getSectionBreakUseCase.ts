import { EmptyUseCaseCommand, UseCase } from "@/scolar/application/useCases/useCase";
import Failure from "@/scolar/domain/failure";
import { SectionBreak } from "@/scolar/domain/entities/sectionBreak";
import { SectionBreakService } from "@/scolar/domain/services/SectionBreakService";
import { SECTION_BREAK_SERVICE } from "@/scolar/domain/symbols/SectionBreakSymbol";
import { injectable, inject } from "inversify";
import { Either, Right, Left } from "purify-ts/Either";
import { LOGGER } from "@/scolar/domain/symbols/SharedSymbol";
import { Logger } from "@/scolar/infrastructure/services/Logger";

export class GetSectionBreakCommand extends EmptyUseCaseCommand {
    constructor(public id: number) { super(); }
}

export type GetSectionBreakUseCase = UseCase<SectionBreak, GetSectionBreakCommand>

@injectable()
export class GetSectionBreakUseCaseImpl implements GetSectionBreakUseCase {
    constructor(
        @inject(SECTION_BREAK_SERVICE) private service: SectionBreakService,
        @inject(LOGGER) private logger: Logger,
    ) {}
    async execute(command: GetSectionBreakCommand): Promise<Either<Failure[], SectionBreak | undefined>> {
        try {
            const result = await this.service.get(command.id);
            return Right(result);
        } catch (error) {
            this.logger.error("Error getting section break: " + JSON.stringify(error));
            return Left([]);
        }
    }
}

