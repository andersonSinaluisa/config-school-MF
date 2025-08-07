import { UseCase, UseCaseCommand } from "@/scolar/application/useCases/useCase";
import {  Left, Right } from "purify-ts/Either";
import { LEVEL_SERVICE } from "@/scolar/domain/symbols/LevelSymbol";
import { LevelService } from "@/scolar/domain/services/LevelService";
import { Logger } from "@/scolar/infrastructure/services/Logger";
import { inject, injectable } from "inversify";
import { LevelError } from "@/scolar/domain/entities/LevelError";

export class DeleteLevelCommand implements UseCaseCommand {
    constructor(
        private id: number
    ) {}

    get data() {
        return this.id;
    }
}


export type DeleteLevelUseCase = UseCase<void, DeleteLevelCommand>

@injectable()
export class DeleteLevelUseCaseImpl implements DeleteLevelUseCase {
    constructor(
        @inject(LEVEL_SERVICE) private levelService: LevelService,
        private logger: Logger
    ) {}

    async execute(command: DeleteLevelCommand) {
        try {
            await this.levelService.delete(command.data);
            return Right(undefined);
        } catch (error) {
            this.logger.error("Error in DeleteLevelUseCase"+JSON.stringify(error));
            return Left([LevelError.LEVEL_SERVICE_ERROR]);
        }
    }
}