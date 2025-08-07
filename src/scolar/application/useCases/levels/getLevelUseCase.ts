import { UseCase, UseCaseCommand } from "@/scolar/application/useCases/useCase";
import { Level } from "@/scolar/domain/entities/level";
import {  Left, Right } from "purify-ts/Either";
import { LEVEL_SERVICE } from "@/scolar/domain/symbols/LevelSymbol";
import { LevelService } from "@/scolar/domain/services/LevelService";
import { Logger } from "@/scolar/infrastructure/services/Logger"; 
import { inject, injectable } from "inversify";
import { LevelError } from "@/scolar/domain/entities/LevelError";
    


export class GetLevelCommand implements UseCaseCommand{

    constructor(
        private id: number
    ) {}

    get data() {
        return this.id;
    }
}

export type GetLevelUseCase = UseCase<Level, GetLevelCommand>

@injectable()
export class GetLevelUseCaseImpl implements GetLevelUseCase {
    constructor(
        @inject(LEVEL_SERVICE) private levelService: LevelService,
        private logger: Logger
    ) {}

    async execute(command: GetLevelCommand) {
        try {
            const level = await this.levelService.get(command.data);
            return Right(level);
        } catch (error) {
            this.logger.error("Error in GetLevelUseCase"+JSON.stringify(error));
            return Left([LevelError.LEVEL_SERVICE_ERROR]);
        }
    }
}