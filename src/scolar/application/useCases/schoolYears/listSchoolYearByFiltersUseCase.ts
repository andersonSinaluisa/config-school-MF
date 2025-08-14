import { extractErrorMessage } from "@/lib/utils";
import { PaginateUseCaseCommand, UseCase } from "@/scolar/application/useCases/useCase";
import Failure from "@/scolar/domain/failure";
import { PaginatedResult } from "@/scolar/infrastructure/dto/paginateDto";
import { SchoolYear } from "@/scolar/domain/entities/school_year";
import { SchoolYearService } from "@/scolar/domain/services/SchoolYearService";
import { SCHOOL_YEAR_SERVICE } from "@/scolar/domain/symbols/SchoolYearSymbol";
import { Left, Right } from "purify-ts/Either";
import { inject, injectable } from "inversify";

export class ListSchoolYearByFiltersUseCaseCommand extends PaginateUseCaseCommand {
    constructor(
        private readonly name?: string,
        private readonly status?: string,
        page: number = 1,
        limit: number = 10,
        orderBy: string[] = [],
        search?: string,
    ) {
        super(page, limit, orderBy, search);
    }

    get data() {
        return {
            ...super.data,
            name: this.name,
            status: this.status,
        };
    }
}

export type ListSchoolYearByFiltersUseCase = UseCase<PaginatedResult<SchoolYear>, ListSchoolYearByFiltersUseCaseCommand>;

@injectable()
export class ListSchoolYearByFiltersUseCaseImpl implements ListSchoolYearByFiltersUseCase {
    constructor(
        @inject(SCHOOL_YEAR_SERVICE) private readonly service: SchoolYearService
    ) {}

    async execute(command: ListSchoolYearByFiltersUseCaseCommand) {
        try {
            const result = await this.service.all(
                command.data.page,
                command.data.perPage,
                command.data.search,
                command.data.orderBy,
                {
                    name: command.data.name,
                    status: command.data.status,
                }
            );
            return Right(result);
        } catch (error) {
            const _error = extractErrorMessage(error);
            return Left([_error as Failure]);
        }
    }
}

