import { UseCase, UseCaseCommand } from "@/scolar/application/useCases/useCase";
import { Section } from "@/scolar/domain/entities/section";
import {inject, injectable} from "inversify";
import { SECTION_SERVICE } from "@/scolar/domain/symbols/SectionSymbol";
import { SectionService } from "@/scolar/domain/services/SectionService";
import { LOGGER } from "@/scolar/domain/symbols/SharedSymbol";
import { Logger } from "@/scolar/infrastructure/services/Logger";
import { Left, Right } from "purify-ts/Either";
import { SectionError } from "@/scolar/domain/entities/sectionError";


export class UpdateSubjectUseCaseCommand implements UseCaseCommand{
    constructor(
        public _data: Section
    ) { }

    get data(): Section {
        return this._data;
    }
}

export type UpdateSectionUseCase = UseCase<Section, UpdateSubjectUseCaseCommand>


@injectable()
export class UpdateSectionUseCaseImpl implements UpdateSectionUseCase {
    constructor(
        @inject(SECTION_SERVICE) private sectionService: SectionService,
        @inject(LOGGER) private logger: Logger
    ) { }

    async execute(command: UpdateSubjectUseCaseCommand) {
        try {
            const res = await this.sectionService.update(command.data);
            return Right(res);
        } catch (e) {
            if (e instanceof Error) {
                this.logger.error(e.message);
            }
            return Left([SectionError.SECTION_NOT_UPDATED])
        }
    }
}


