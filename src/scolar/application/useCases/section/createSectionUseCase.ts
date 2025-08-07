import { UseCase, UseCaseCommand } from "@/scolar/application/useCases/useCase";
import { Section } from "@/scolar/domain/entities/section";
import { isAxiosError } from "axios";
import { injectable, inject } from "inversify";
import { Logger } from "@/scolar/infrastructure/services/Logger";
import { Left , Right} from "purify-ts/Either";
import { SECTION_SERVICE } from "@/scolar/domain/symbols/SectionSymbol";
import { SectionService } from "@/scolar/domain/services/SectionService";
import { LOGGER } from "@/scolar/domain/symbols/SharedSymbol";
import { SectionError } from "@/scolar/domain/entities/sectionError";
export class CreateSectionCommand implements UseCaseCommand {
    constructor(
        public data: Section
    ) { }
}

export type CreateSectionUseCase = UseCase<Section, CreateSectionCommand>


@injectable()
export class CreateSectionUseCaseImpl implements CreateSectionUseCase {
    constructor(
        @inject(SECTION_SERVICE) private sectionService: SectionService,
        @inject(LOGGER) private logger: Logger
    ) { }
    

    async execute(command: CreateSectionCommand) {
        try {
            const res = await this.sectionService.create(command.data);
            return Right(res);
        } catch (e) {
            if (e instanceof Error) {
                this.logger.error(e.message);
            }
            if (isAxiosError(e)) {
                this.logger.error(e.response?.data);
            }
            return Left([SectionError.SECTION_NOT_CREATED])
        }
    }
}