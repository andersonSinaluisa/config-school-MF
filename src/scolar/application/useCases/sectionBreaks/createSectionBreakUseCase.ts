import { UseCase, UseCaseCommand } from "@/scolar/application/useCases/useCase";
import Failure from "@/scolar/domain/failure";
import { SectionBreak } from "@/scolar/domain/entities/sectionBreak";
import { SectionBreakService } from "@/scolar/domain/services/SectionBreakService";
import { SECTION_BREAK_SERVICE } from "@/scolar/domain/symbols/SectionBreakSymbol";
import { injectable, inject } from "inversify";
import { Either, Right, Left } from "purify-ts/Either";
import { LOGGER } from "@/scolar/domain/symbols/SharedSymbol";
import { Logger } from "@/scolar/infrastructure/services/Logger";

export class CreateSectionBreakCommand implements UseCaseCommand {
    constructor(
        public sectionId: number,
        public day: string,
        public startTime: string,
        public endTime: string,
    ) {}
}

export type CreateSectionBreakUseCase = UseCase<SectionBreak, CreateSectionBreakCommand>

@injectable()
export class CreateSectionBreakUseCaseImpl implements CreateSectionBreakUseCase {
    constructor(
        @inject(SECTION_BREAK_SERVICE) private service: SectionBreakService,
        @inject(LOGGER) private logger: Logger,
    ) {}
    async execute(command: CreateSectionBreakCommand): Promise<Either<Failure[], SectionBreak | undefined>> {
        try {
            const entity = new SectionBreak(0, command.sectionId, command.day, command.startTime, command.endTime);
            const result = await this.service.create(entity);
            return Right(result);
        } catch (error) {
            this.logger.error("Error creating section break: " + JSON.stringify(error));
            return Left([]);
        }
    }
}

