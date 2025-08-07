import { PaginateUseCaseCommand, UseCase } from "@/scolar/application/useCases/useCase";
import { PaginatedResult } from "@/scolar/infrastructure/dto/paginateDto";
import { Course } from "@/scolar/domain/entities/course";
import { CourseError } from "@/scolar/domain/entities/CourseError";
import { isAxiosError } from "axios";
import { CourseService } from "@/scolar/domain/services/CourseService";
import { COURSE_SERVICE } from "@/scolar/domain/symbols/CourseSymbol";
import { injectable, inject } from "inversify";
import { Logger } from "@/scolar/infrastructure/services/Logger";
import { LOGGER } from "@/scolar/domain/symbols/SharedSymbol";
import { Left, Right } from "purify-ts/Either";


export class ListCoursesCommand extends PaginateUseCaseCommand { }


export type ListCoursesUseCase = UseCase<PaginatedResult<Course>, ListCoursesCommand>


@injectable()
export class ListCoursesUseCaseImpl implements ListCoursesUseCase {
    constructor(
        @inject(COURSE_SERVICE) private courseService: CourseService,
        @inject(LOGGER) private logger: Logger
    ) { }
    async execute(command: ListCoursesCommand){
        try {
            const res = await this.courseService.all(command.data.page, command.data.perPage, command.data.search, command.data.orderBy);
            return Right(res);
        } catch (e) {
            if (e instanceof Error) {
                this.logger.error(e.message);
            }
            if (isAxiosError(e)) {
                this.logger.error(e.response?.data);
            }
            return Promise.resolve(Left([CourseError.COURSE_SERVICE_ERROR]));
        }
    }
}