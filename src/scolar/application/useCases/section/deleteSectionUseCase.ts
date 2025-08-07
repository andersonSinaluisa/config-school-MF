import { UseCase, UseCaseCommand } from "@/scolar/application/useCases/useCase";
import { LOGGER } from "@/scolar/domain/symbols/SharedSymbol";
import { SECTION_SERVICE } from "@/scolar/domain/symbols/SectionSymbol";
import { SectionService } from "@/scolar/domain/services/SectionService";
import { Logger } from "@/scolar/infrastructure/services/Logger";
import { inject, injectable } from "inversify";
import { Left, Right } from "purify-ts/Either";
import { SectionError } from "@/scolar/domain/entities/sectionError";
export class DeleteSectionUseCaseCommand implements UseCaseCommand{
    constructor(
        private _id: number
    ) {}
    get id(): number {
        return this._id;
    }
}


export type DeleteSectionUseCase = UseCase<void, DeleteSectionUseCaseCommand>


@injectable()
export class DeleteSectionUseCaseImpl implements DeleteSectionUseCase {
    constructor(
        @inject(SECTION_SERVICE) private sectionService: SectionService,
        @inject(LOGGER) private logger: Logger
    ) { }
    
    async execute(command: DeleteSectionUseCaseCommand) {
        try {
           const res = await this.sectionService.delete(command.id);
           return Right(res);
        } catch (e) {
            if (e instanceof Error) {
                this.logger.error(e.message);
            }
            return Left([SectionError.SECTION_NOT_FOUND])
        }
    }
}