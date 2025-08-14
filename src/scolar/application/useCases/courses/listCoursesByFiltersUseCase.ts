import { extractErrorMessage } from "@/lib/utils";
import { PaginateUseCaseCommand, UseCase } from "@/scolar/application/useCases/useCase";
import Failure from "@/scolar/domain/failure";
import { PaginatedResult } from "@/scolar/infrastructure/dto/paginateDto";
import { Course } from "@/scolar/domain/entities/course";
import { CourseService } from "@/scolar/domain/services/CourseService";
import { COURSE_SERVICE } from "@/scolar/domain/symbols/CourseSymbol";
import { Left, Right } from "purify-ts/Either";
import { inject, injectable } from "inversify";

export class ListCoursesByFiltersUseCaseCommand extends PaginateUseCaseCommand {
    constructor(
        private readonly name?: string,
        private readonly levelId?: number,
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
            level_id: this.levelId,
        };
    }
}

export type ListCoursesByFiltersUseCase = UseCase<PaginatedResult<Course>, ListCoursesByFiltersUseCaseCommand>;

@injectable()
export class ListCoursesByFiltersUseCaseImpl implements ListCoursesByFiltersUseCase {
    constructor(
        @inject(COURSE_SERVICE) private readonly service: CourseService
    ) {}

    async execute(command: ListCoursesByFiltersUseCaseCommand) {
        try {
            const result = await this.service.all(
                command.data.page,
                command.data.perPage,
                command.data.search,
                command.data.orderBy,
                {
                    name: command.data.name,
                    level_id: command.data.level_id,
                }
            );
            return Right(result);
        } catch (error) {
            const _error = extractErrorMessage(error);
            return Left([_error as Failure]);
        }
    }
}

