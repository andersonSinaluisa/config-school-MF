import { UseCase, UseCaseCommand } from "@/scolar/application/useCases/useCase";
import { inject, injectable } from "inversify";
import { COURSE_SERVICE } from "@/scolar/domain/symbols/CourseSymbol";
import { CourseService } from "@/scolar/domain/services/CourseService";
import { Logger } from "@/scolar/infrastructure/services/Logger";
import { LOGGER } from "@/scolar/domain/symbols/SharedSymbol";
import { Either, Left, Right } from "purify-ts/Either";
import { CourseError } from "@/scolar/domain/entities/CourseError";
    

export class DeleteCourseCommand implements UseCaseCommand {
    constructor(
        private id: number
    ) {}

    get data() {
        return this.id;
    }
}

export type DeleteCourseUseCase = UseCase<void, DeleteCourseCommand>

@injectable()
export class DeleteCourseUseCaseImpl implements DeleteCourseUseCase {
    constructor(
        @inject(COURSE_SERVICE) private courseService: CourseService,
        @inject(LOGGER) private logger: Logger
    ) { }

    async execute(command: DeleteCourseCommand): Promise<Either<CourseError[], void>> {
        try {
            const res = await this.courseService.delete(command.data);
            
            return Right(res);
        } catch (e) {
            this.logger.error(JSON.stringify(e));
            return Left([CourseError.COURSE_SERVICE_ERROR]);
        }
    }
}