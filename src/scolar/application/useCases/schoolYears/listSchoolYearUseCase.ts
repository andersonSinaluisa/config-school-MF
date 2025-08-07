import { PaginateUseCaseCommand, UseCase } from "@/scolar/application/useCases/useCase";
import Failure, { AbstractFailure } from "@/scolar/domain/failure";
import { PaginatedResult } from "@/scolar/infrastructure/dto/paginateDto";
import { SchoolYear } from "@/scolar/domain/entities/school_year";
import { SchoolYearService } from "@/scolar/domain/services/SchoolYearService";
import { SCHOOL_YEAR_SERVICE } from "@/scolar/domain/symbols/SchoolYearSymbol";
import { isAxiosError } from "axios";
import { inject, injectable } from "inversify";
import { Either, Left, Right } from "purify-ts/Either";



export class ListSchoolYearUseCaseCommand extends PaginateUseCaseCommand{

}


export type ListSchoolYearUseCase = UseCase<PaginatedResult<SchoolYear>, ListSchoolYearUseCaseCommand>

@injectable()
export class ListSchoolYearUseCaseImpl implements ListSchoolYearUseCase {
    constructor(
        @inject(SCHOOL_YEAR_SERVICE) 
        private schoolYearService: SchoolYearService 
    ){}
    async execute(command: ListSchoolYearUseCaseCommand): Promise<Either<Failure[], PaginatedResult<SchoolYear> | undefined>> {
      try {
        const result = await this.schoolYearService.all(command.data.page, command.data.perPage, command.data.search, command.data.orderBy);

        return Right(result);
      }catch (error) {
        if(isAxiosError(error)) {
            return Left([AbstractFailure.fromError(error)]);
        }
          return Left([AbstractFailure.fromError(error)]);

      }
    }

   
}
