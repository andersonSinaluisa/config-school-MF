
import { UseCase, UseCaseCommand } from "@/scolar/application/useCases/useCase";
import Failure from "@/scolar/domain/failure";
import { SchoolYear } from "@/scolar/domain/entities/school_year";
import { Either, Left, Right } from "purify-ts/Either";

import { inject } from "inversify";
import { SCHOOL_YEAR_SERVICE } from "@/scolar/domain/symbols/SchoolYearSymbol";
import { SchoolYearService } from "@/scolar/domain/services/SchoolYearService";
import { isAxiosError } from "axios";
import { SchoolYearError } from "@/scolar/domain/entities/schoolYearError";

export class UpdateSchoolYearUseCaseCommand  implements UseCaseCommand {

    constructor(
        private id: number,
        private name: string,
        private startDate: Date,
        private endDate: Date,
        public status: string = 'ACTIVE'
    ) {}

    get data() {
        return new SchoolYear(this.id, this.name, this.startDate, this.endDate, this.status);
    }

}


export type UpdateSchoolYearUseCase = UseCase<SchoolYear, UpdateSchoolYearUseCaseCommand>


export class UpdateSchoolYearUseCaseImpl implements UpdateSchoolYearUseCase {

    constructor(
         @inject(SCHOOL_YEAR_SERVICE)
         private schoolYearService: SchoolYearService
    ) {
         
    }

    async execute(command: UpdateSchoolYearUseCaseCommand): Promise<Either<Failure[], SchoolYear | undefined>> {
      try{
        const res = await this.schoolYearService.update(command.data);
        return Right(res);
      }catch (error) {
        if (isAxiosError(error)){
            return Left([SchoolYearError.SCHOOL_YEAR_ERROR])
        }
        return Left([SchoolYearError.SCHOOL_YEAR_ERROR]);

      }
    }

    
}