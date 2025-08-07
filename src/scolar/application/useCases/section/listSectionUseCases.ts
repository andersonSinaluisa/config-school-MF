import { PaginateUseCaseCommand, UseCase } from "@/scolar/application/useCases/useCase";
import { PaginatedResult } from "@/scolar/infrastructure/dto/paginateDto";
import { Section } from "@/scolar/domain/entities/section";
import { isAxiosError } from "axios";
import { SectionService } from "@/scolar/domain/services/SectionService";
import { SECTION_SERVICE } from "@/scolar/domain/symbols/SectionSymbol";
import { injectable, inject } from "inversify";
import { Logger } from "@/scolar/infrastructure/services/Logger";
import { Left, Right } from "purify-ts/Either";
import { LOGGER } from "@/scolar/domain/symbols/SharedSymbol";
import { SectionError } from "@/scolar/domain/entities/sectionError";


export class ListSectionCommand extends PaginateUseCaseCommand{}


export type ListSectionUseCase = UseCase<PaginatedResult<Section>, ListSectionCommand>


@injectable()
export class ListSectionUseCaseImpl implements ListSectionUseCase {
    constructor(
        @inject(SECTION_SERVICE) private sectionService: SectionService,
        @inject(LOGGER) private logger: Logger
    ) { }
    async execute(command: ListSectionCommand){
        try {
            const res = await this.sectionService.all(command.data.page, command.data.perPage, command.data.search, command.data.orderBy);
            return Right(res);
        } catch (e) {
            if (e instanceof Error) {
                this.logger.error(e.message);
            }
            if (isAxiosError(e)) {
                this.logger.error(e.response?.data);
            }
            return Promise.resolve(Left([SectionError.SECTION_SERVICE_ERROR]));
        }
    }
}