
import { UseCase, UseCaseCommand } from "@/scolar/application/useCases/useCase";
import { Course } from "@/scolar/domain/entities/course";
import { Either, Left, Right } from "purify-ts/Either";
import { COURSE_SERVICE } from "@/scolar/domain/symbols/CourseSymbol";
import { CourseService } from "@/scolar/domain/services/CourseService";
import { Logger } from "@/scolar/infrastructure/services/Logger";
import { LOGGER } from "@/scolar/domain/symbols/SharedSymbol";
import { inject, injectable } from "inversify";
import { CourseError } from "@/scolar/domain/entities/CourseError";
import Failure from "@/scolar/domain/failure";
import { isAxiosError } from "axios";
export class CreateCourseCommand implements UseCaseCommand {

    constructor(
        private name: string,
        private level_id: number,
        private description: string,
    ) {

    }

    get data() {
        return new  Course(0,
            this.name,
            this.level_id,
            this.description);
    }

}


export type CreateCourseUseCase = UseCase<Course, CreateCourseCommand>


@injectable()
export class CreateCourseUseCaseImpl implements CreateCourseUseCase {
    constructor(
        @inject(COURSE_SERVICE) private courseService: CourseService,
        @inject(LOGGER) private logger: Logger
    ) { }
    async execute(command: CreateCourseCommand): Promise<Either<Failure[], Course | undefined>> {
        try {
            const res = await this.courseService.create(command.data);
            return Right(res);
        } catch (e) {
            if (isAxiosError(e)) {
                this.logger.error(JSON.stringify(e.response?.data));
                const message = e.response?.data?.message;
                const error = e.response?.data?.error;
                if (message && error) {
                    return Left([new CourseError(error, message, error)]);
                }
            }
            return Left([CourseError.COURSE_SERVICE_ERROR]);
        }
    }
}