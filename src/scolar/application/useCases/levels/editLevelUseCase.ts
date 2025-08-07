import { UseCase, UseCaseCommand } from "@/scolar/application/useCases/useCase";
import { Level } from "@/scolar/domain/entities/level";
import { Either, Left, Right } from "purify-ts/Either";
import { LEVEL_SERVICE } from "@/scolar/domain/symbols/LevelSymbol";
import { LevelService } from "@/scolar/domain/services/LevelService";
import { Logger } from "@/scolar/infrastructure/services/Logger";
import { LOGGER } from "@/scolar/domain/symbols/SharedSymbol";
import { LevelError } from "@/scolar/domain/entities/LevelError";
import { inject, injectable } from "inversify";
import { isAxiosError } from "axios";


export class EditLevelCommand implements UseCaseCommand{

    constructor(
        private id: number,
        private name: string,
        private description: string,
        private order: number
    ) {}


    get data() {
        return new Level(this.id,
            this.name, this.description, this.order);
    }
}


export interface EditLevelUseCase extends UseCase<Level, EditLevelCommand> { }
@injectable()
export class EditLevelUseCaseImpl implements EditLevelUseCase {
    constructor(
        @inject(LEVEL_SERVICE) private levelService: LevelService,
        @inject(LOGGER) private logger: Logger
    ){}
    async execute(command: EditLevelCommand): Promise<Either<LevelError[], Level | undefined>> {
        try {
            const res = await this.levelService.update(command.data);
            return Right(res);
        } catch (e) {
            if (isAxiosError(e)) {
                this.logger.error(JSON.stringify(e.response?.data));
                let message = e.response?.data?.message;
                let error = e.response?.data?.error;
                if (message && error) {
                    return Left([new LevelError(error, message, 'root')]);
                }
            }
            return Left([LevelError.LEVEL_SERVICE_ERROR]);
        }
    }
}