import { PaginateUseCaseCommand, UseCase } from "@/scolar/application/useCases/useCase";
import Failure from "@/scolar/domain/failure";
import { PaginatedResult } from "@/scolar/infrastructure/dto/paginateDto";
import { SectionBreak } from "@/scolar/domain/entities/sectionBreak";
import { SectionBreakService } from "@/scolar/domain/services/SectionBreakService";
import { SECTION_BREAK_SERVICE } from "@/scolar/domain/symbols/SectionBreakSymbol";
import { injectable, inject } from "inversify";
import { Either, Right, Left } from "purify-ts/Either";
import { LOGGER } from "@/scolar/domain/symbols/SharedSymbol";
import { Logger } from "@/scolar/infrastructure/services/Logger";

export class ListSectionBreaksCommand extends PaginateUseCaseCommand {
    constructor(
        page: number,
        perPage: number,
        orderBy: string[],
        public sectionId?: number,
        where?: string,
    ) {
        super(page, perPage, orderBy, where);
    }
}

export type ListSectionBreaksUseCase = UseCase<PaginatedResult<SectionBreak>, ListSectionBreaksCommand>

@injectable()
export class ListSectionBreaksUseCaseImpl implements ListSectionBreaksUseCase {
    constructor(
        @inject(SECTION_BREAK_SERVICE) private service: SectionBreakService,
        @inject(LOGGER) private logger: Logger,
    ) {}
    async execute(command: ListSectionBreaksCommand): Promise<Either<Failure[], PaginatedResult<SectionBreak> | undefined>> {
        try {
            const result = await this.service.all(command.data.page, command.data.perPage, { sectionId: command.sectionId });
            return Right(result);
        } catch (error) {
            this.logger.error("Error listing section breaks: " + JSON.stringify(error));
            return Left([]);
        }
    }
}

