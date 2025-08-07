import {  PaginateUseCaseCommand, UseCase } from "@/scolar/application/useCases/useCase";
import Failure from "@/scolar/domain/failure";
import { Level } from "@/scolar/domain/entities/level";
import { LevelError } from "@/scolar/domain/entities/LevelError";
import { LevelService } from "@/scolar/domain/services/LevelService";
import { LEVEL_SERVICE } from "@/scolar/domain/symbols/LevelSymbol";
import { isAxiosError } from "axios";
import { inject, injectable } from "inversify";
import { Either, Left, Right } from "purify-ts/Either";
import { PaginatedResult } from "@/scolar/infrastructure/dto/paginateDto";


export class PaginateLevelsCommand extends PaginateUseCaseCommand {
    
}


export type ListLevelsUsecase = UseCase<PaginatedResult<Level>, PaginateLevelsCommand>




@injectable()
export class ListLevelsUsecaseImpl implements ListLevelsUsecase {

    constructor(
        @inject(LEVEL_SERVICE) private levelService: LevelService,
        
    ) { }
    async execute(command: PaginateLevelsCommand): Promise<Either<Failure[], PaginatedResult<Level> | undefined>> {
       try{
            const res = await this.levelService.all(command.data.page, command.data.perPage, 
                                                command.data.search, command.data.orderBy); 
            return Right(res);
        
       }catch(e){
           if (e instanceof Error) {
                console.log(e.message);
           }
           if (isAxiosError(e)) {
               console.log(e.response?.data);
           }

           return Promise.resolve(Left([LevelError.LEVEL_SERVICE_ERROR]));
       }
    }
    
}

