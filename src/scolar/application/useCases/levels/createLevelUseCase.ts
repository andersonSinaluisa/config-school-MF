import { UseCase, UseCaseCommand } from "@/scolar/application/useCases/useCase";
import { Level } from "@/scolar/domain/entities/level";
import { Either, Left, Right } from "purify-ts/Either";
import { LEVEL_SERVICE } from "@/scolar/domain/symbols/LevelSymbol";
import { LevelService } from "@/scolar/domain/services/LevelService";
import { Logger } from "@/scolar/infrastructure/services/Logger";
import { LOGGER } from "@/scolar/domain/symbols/SharedSymbol";
import { LevelError } from "@/scolar/domain/entities/LevelError";
import { inject, injectable } from "inversify";
import Failure from "@/scolar/domain/failure";
import { isAxiosError } from "axios";

export class CreateLevelCommand implements UseCaseCommand{

    constructor(
        private name: string,
        private description: string,
        private order: number
    ) {}

    get data() {
        return new Level(0, 
            this.name, this.description, this.order);
    }

}

export type CreateLevelUseCase = UseCase<Level, CreateLevelCommand>

@injectable()
export class CreateLevelUseCaseImpl implements CreateLevelUseCase {
    constructor(
        @inject(LEVEL_SERVICE) private levelService: LevelService,
        @inject(LOGGER) private logger: Logger
    ){}
    async execute(command: CreateLevelCommand): Promise<Either<Failure[], Level | undefined>> {
        try {
            const res = await this.levelService.create(command.data);
            return Right(res);
        } catch (e) {
            if (isAxiosError(e)) {
                this.logger.error(JSON.stringify(e.response?.data));
                const message = e.response?.data?.message;
                const error = e.response?.data?.error;
                if (message && error) {
                    return Left([new LevelError(error, message, error)]);
                }
            }
            return Left([LevelError.LEVEL_SERVICE_ERROR]);
        }
    }
    
    
}
