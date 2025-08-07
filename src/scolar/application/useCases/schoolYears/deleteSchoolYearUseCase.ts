import { UseCase, UseCaseCommand } from "@/scolar/application/useCases/useCase";
import Failure from "@/scolar/domain/failure";
import { Either, Left, Right } from "purify-ts/Either";
import { inject, injectable } from "inversify";
import { SCHOOL_YEAR_SERVICE } from "@/scolar/domain/symbols/SchoolYearSymbol";
import { SchoolYearService } from "@/scolar/domain/services/SchoolYearService";
import { isAxiosError } from "axios";
import { SchoolYearError } from "@/scolar/domain/entities/schoolYearError";


export class DeleteSchoolYearUseCaseCommand implements UseCaseCommand {
    constructor(
        public id: number
    ) {}


    get data() {
        return this.id;
    }

}

export type DeleteSchoolYearUseCase = UseCase<void, DeleteSchoolYearUseCaseCommand>


@injectable()
export class DeleteSchoolYearUseCaseImpl implements DeleteSchoolYearUseCase {
    constructor(
        @inject(SCHOOL_YEAR_SERVICE)
        private schoolYearService: SchoolYearService
    ) {}
    async execute(command: DeleteSchoolYearUseCaseCommand): Promise<Either<Failure[], void | undefined>> {
        try{
            const res = await this.schoolYearService.delete(command.data);
            return Right(res);
        }catch (error) {
            if (isAxiosError(error)){
                return Left([SchoolYearError.SCHOOL_YEAR_NOT_FOUND]);
            }
            return Left([SchoolYearError.SCHOOL_YEAR_NOT_FOUND]);
        }
    }

}