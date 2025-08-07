import { UseCase, UseCaseCommand } from "@/scolar/application/useCases/useCase";
import { Course } from "@/scolar/domain/entities/course";
import { inject, injectable } from "inversify";
import { COURSE_SERVICE } from "@/scolar/domain/symbols/CourseSymbol";
import { CourseService } from "@/scolar/domain/services/CourseService";
import { Logger } from "@/scolar/infrastructure/services/Logger";
import { LOGGER } from "@/scolar/domain/symbols/SharedSymbol";
import {  Left, Right } from "purify-ts/Either";
import { isAxiosError } from "axios";
import { CourseError } from "@/scolar/domain/entities/CourseError";



export class UpdateCourseCommand implements UseCaseCommand {

    constructor(
        private id: number,
        private name: string,
        private level_id: number,
        private description: string,
    ) {}

    get data() {
        return new Course(
            this.id, 
            this.name,
            this.level_id,
            this.description
        );   
    }
}

export type UpdateCourseUseCase = UseCase<Course, UpdateCourseCommand>


@injectable()
export class UpdateCourseUseCaseImpl implements UpdateCourseUseCase {
    constructor(
        @inject(COURSE_SERVICE) private courseService: CourseService,
        @inject(LOGGER) private logger: Logger
    ) { }
    async execute(command: UpdateCourseCommand){
        try {
            const res = await this.courseService.update(command.data);
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


