import { UseCase, UseCaseCommand } from "@/scolar/application/useCases/useCase";
import Failure from "@/scolar/domain/failure";
import { SchoolYear } from "@/scolar/domain/entities/school_year";
import {  SCHOOL_YEAR_SERVICE } from "@/scolar/domain/symbols/SchoolYearSymbol";
import { Either, Left, Right } from "purify-ts/Either";
import { inject, injectable } from "inversify";
import { SchoolYearService } from "@/scolar/domain/services/SchoolYearService";
import { SchoolYearError } from "@/scolar/domain/entities/schoolYearError";


export class CreateSchoolYearUseCaseCommand implements UseCaseCommand{
 
    constructor(
        private name: string,
        private startDate: Date,
        private endDate: Date,
        public status: string = 'ACTIVE'
    ) {}

    get data() {
        return new SchoolYear(0, this.name, this.startDate, this.endDate, this.status);
    }
}

export type CreateSchoolYearUseCase = UseCase<SchoolYear, CreateSchoolYearUseCaseCommand>

@injectable()
export class CreateSchoolYearUseCaseImpl implements CreateSchoolYearUseCase {

    constructor(
        @inject(SCHOOL_YEAR_SERVICE)
        private schoolYearService: SchoolYearService
    ){

    }
    async execute(command: CreateSchoolYearUseCaseCommand): Promise<Either<Failure[], SchoolYear | undefined>> {
        try{
            console.log("Creating school year with data:", command.data);
            const res = await this.schoolYearService.create(command.data);
            return Right(res);
        }catch (error) {
            console.error("Error creating school year:", error);
            return Left([SchoolYearError.SCHOOL_YEAR_ERROR]);
        }
    }
    
}