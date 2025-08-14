import { extractErrorMessage } from "@/lib/utils";
import { PaginateUseCaseCommand, UseCase } from "@/scolar/application/useCases/useCase";
import Failure from "@/scolar/domain/failure";
import { PaginatedResult } from "@/scolar/infrastructure/dto/paginateDto";
import { Subject } from "@/scolar/domain/entities/subject";
import { SubjectService } from "@/scolar/domain/services/SubjectService";
import { SUBJECT_SERVICE } from "@/scolar/domain/symbols/SubjectSymbol";
import { Left, Right } from "purify-ts/Either";
import { inject, injectable } from "inversify";

export class ListSubjectsByFiltersUseCaseCommand extends PaginateUseCaseCommand {
    constructor(
        private readonly name?: string,
        private readonly code?: string,
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
            code: this.code,
        };
    }
}

export type ListSubjectsByFiltersUseCase = UseCase<PaginatedResult<Subject>, ListSubjectsByFiltersUseCaseCommand>;

@injectable()
export class ListSubjectsByFiltersUseCaseImpl implements ListSubjectsByFiltersUseCase {
    constructor(
        @inject(SUBJECT_SERVICE) private readonly service: SubjectService
    ) {}

    async execute(command: ListSubjectsByFiltersUseCaseCommand) {
        try {
            const result = await this.service.all(
                command.data.page,
                command.data.perPage,
                command.data.search,
                command.data.orderBy,
                {
                    name: command.data.name,
                    code: command.data.code,
                }
            );
            return Right(result);
        } catch (error) {
            const _error = extractErrorMessage(error);
            return Left([_error as Failure]);
        }
    }
}

