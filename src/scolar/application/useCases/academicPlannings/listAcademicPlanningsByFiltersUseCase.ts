import { extractErrorMessage } from "@/lib/utils";
import { PaginateUseCaseCommand, UseCase } from "@/scolar/application/useCases/useCase";
import Failure from "@/scolar/domain/failure";
import { PaginatedResult } from "@/scolar/infrastructure/dto/paginateDto";
import { AcademicPlanning } from "@/scolar/domain/entities/academicPlanning";
import { AcademicPlanningService } from "@/scolar/domain/services/AcademicPlanningService";
import { ACADEMIC_PLANNING_SERVICE } from "@/scolar/domain/symbols/AcademicPlanningSymbol";
import { Left, Right } from "purify-ts/Either";
import { inject, injectable } from "inversify";

export class ListAcademicPlanningsByFiltersUseCaseCommand extends PaginateUseCaseCommand {
    constructor(
        private readonly courseId?: number,
        private readonly parallelId?: number,
        private readonly schoolYearId?: number,
        private readonly subjectId?: number,
        private readonly topic?: string,
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
            topic: this.topic,
        };
    }
}

export type ListAcademicPlanningsByFiltersUseCase = UseCase<PaginatedResult<AcademicPlanning>, ListAcademicPlanningsByFiltersUseCaseCommand>;

@injectable()
export class ListAcademicPlanningsByFiltersUseCaseImpl implements ListAcademicPlanningsByFiltersUseCase {
    constructor(
        @inject(ACADEMIC_PLANNING_SERVICE) private readonly service: AcademicPlanningService
    ) {}

    async execute(command: ListAcademicPlanningsByFiltersUseCaseCommand) {
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
                    topic: command.data.topic,
                }
            );
            return Right(result);
        } catch (error) {
            const _error = extractErrorMessage(error);
            return Left([_error as Failure]);
        }
    }
}

