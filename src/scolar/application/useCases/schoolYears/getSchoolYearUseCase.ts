import { UseCase, UseCaseCommand } from "@/scolar/application/useCases/useCase";
import Failure from "@/scolar/domain/failure";
import { SchoolYear } from "@/scolar/domain/entities/school_year";
import { SchoolYearError } from "@/scolar/domain/entities/schoolYearError";
import { SchoolYearService } from "@/scolar/domain/services/SchoolYearService";
import { SCHOOL_YEAR_SERVICE } from "@/scolar/domain/symbols/SchoolYearSymbol";
import { isAxiosError } from "axios";
import { inject, injectable } from "inversify";
import { Either, Left, Right } from "purify-ts/Either";

export class GetSchoolYearUseCaseCommand  implements UseCaseCommand{
    constructor(
        public id: number
    ){}

    get data() {
        return this.id;
    }
}


export type GetSchoolYearUseCase = UseCase<SchoolYear, GetSchoolYearUseCaseCommand>
@injectable()
export class GetSchoolYearUseCaseImpl implements GetSchoolYearUseCase {

    constructor(
        @inject(SCHOOL_YEAR_SERVICE)
        private schoolYearService: SchoolYearService
    ) {}
    async execute(command: GetSchoolYearUseCaseCommand): Promise<Either<Failure[], SchoolYear | undefined>> {
        try{
            const res = await this.schoolYearService.get(command.data);
            return Right(res);
        }catch (error) {
            if (isAxiosError(error)){
                return Left([SchoolYearError.SCHOOL_YEAR_NOT_FOUND])
            }
            return Left([SchoolYearError.SCHOOL_YEAR_NOT_FOUND])

        }
    }

  
}