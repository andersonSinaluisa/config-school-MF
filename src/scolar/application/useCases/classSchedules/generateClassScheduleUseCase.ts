import { ClassSchedule } from "@/scolar/domain/entities/classSchedule";
import { UseCase } from "../useCase";
import Failure from "@/scolar/domain/failure";
import { Either } from "purify-ts/Either";
import { CLASS_SCHEDULE_SERVICE } from "@/scolar/domain/symbols/ClassScheduleSymbol";
import { ClassScheduleService } from "@/scolar/domain/services/ClassScheduleService";
import {inject,injectable} from 'inversify'
import { extractErrorMessage } from "@/lib/utils";
import { Left, Right } from "purify-ts/Either";
 
export class GenerateClassScheduleUseCaseCommand {
    constructor(
        public readonly parallelId: number,
    ) {}
}

export type GenerateClassScheduleUseCase = UseCase<ClassSchedule[], GenerateClassScheduleUseCaseCommand>;

@injectable()
export class GenerateClassScheduleUseCaseImpl implements GenerateClassScheduleUseCase {
    constructor(
        @inject(CLASS_SCHEDULE_SERVICE) private readonly service: ClassScheduleService
    ) { }

    async execute(command: GenerateClassScheduleUseCaseCommand): Promise<Either<Failure[], ClassSchedule[] | undefined>> {
        try{
            const res = await this.service.generateByParallel(command.parallelId)
            return Right(res);
        }catch (error) {
            const _error = extractErrorMessage(error);
            return Left([_error as Failure]);
        }
    }
    
}