import { extractErrorMessage } from "@/lib/utils";
import { PaginateUseCaseCommand, UseCase } from "@/scolar/application/useCases/useCase";
import Failure from "@/scolar/domain/failure";
import { PaginatedResult } from "@/scolar/infrastructure/dto/paginateDto";
import { ClassSchedule } from "@/scolar/domain/entities/classSchedule";
import { ClassScheduleService } from "@/scolar/domain/services/ClassScheduleService";
import { CLASS_SCHEDULE_SERVICE } from "@/scolar/domain/symbols/ClassScheduleSymbol";
import { Left, Right } from "purify-ts/Either";
import { inject, injectable } from "inversify";

export class ListClassSchedulesByFiltersUseCaseCommand extends PaginateUseCaseCommand {
    constructor(
        private readonly courseId?: number,
        private readonly parallelId?: number,
        private readonly schoolYearId?: number,
        private readonly subjectId?: number,
        private readonly dayOfWeek?: number,
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
            course_id: this.courseId,
            parallel_id: this.parallelId,
            school_year_id: this.schoolYearId,
            subject_id: this.subjectId,
            day_of_week: this.dayOfWeek,
        };
    }
}

export type ListClassSchedulesByFiltersUseCase = UseCase<PaginatedResult<ClassSchedule>, ListClassSchedulesByFiltersUseCaseCommand>;

@injectable()
export class ListClassSchedulesByFiltersUseCaseImpl implements ListClassSchedulesByFiltersUseCase {
    constructor(
        @inject(CLASS_SCHEDULE_SERVICE) private readonly service: ClassScheduleService
    ) {}

    async execute(command: ListClassSchedulesByFiltersUseCaseCommand) {
        try {
            const result = await this.service.all(
                command.data.page,
                command.data.perPage,
                command.data.search,
                command.data.orderBy,
                {
                    course_id: command.data.course_id,
                    parallel_id: command.data.parallel_id,
                    school_year_id: command.data.school_year_id,
                    subject_id: command.data.subject_id,
                    day_of_week: command.data.day_of_week,
                }
            );
            return Right(result);
        } catch (error) {
            const _error = extractErrorMessage(error);
            return Left([_error as Failure]);
        }
    }
}

