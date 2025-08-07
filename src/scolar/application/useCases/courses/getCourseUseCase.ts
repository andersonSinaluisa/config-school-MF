import { UseCase, UseCaseCommand } from "@/scolar/application/useCases/useCase";
import { Course } from "@/scolar/domain/entities/course";
import { inject } from "inversify";
import { COURSE_SERVICE } from "@/scolar/domain/symbols/CourseSymbol";
import { CourseService } from "@/scolar/domain/services/CourseService";
import { Logger } from "@/scolar/infrastructure/services/Logger";
import { LOGGER } from "@/scolar/domain/symbols/SharedSymbol";
import {  Either, Left, Right } from "purify-ts/Either";
import { CourseError } from "@/scolar/domain/entities/CourseError";
import Failure from "@/scolar/domain/failure";

export class GetCourseCommand implements UseCaseCommand{
    constructor(
        public id: number,
    ) {
    }

   
}

export type GetCourseUseCase = UseCase<Course, GetCourseCommand>


export class GetCourseUseCaseImpl implements GetCourseUseCase {
    constructor(
        @inject(COURSE_SERVICE) private courseService: CourseService,
        @inject(LOGGER) private logger: Logger
    ) { }
    async execute(command: GetCourseCommand): Promise<Either<Failure[], Course | undefined>> {
        try {
            console.log(command)
            const res = await this.courseService.get(command.id);

            return Right(res);
        } catch (e) {
            this.logger.error(JSON.stringify(e));
            return Left([CourseError.COURSE_SERVICE_ERROR]);
        }
    }
    
}
