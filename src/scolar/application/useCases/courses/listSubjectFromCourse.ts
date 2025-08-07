import { UseCase, UseCaseCommand } from "@/scolar/application/useCases/useCase";
import { CourseSubject } from "@/scolar/domain/entities/course_subject";
import { SubjectError } from "@/scolar/domain/entities/subjectError";
import { CourseSubjetService } from "@/scolar/domain/services/CourseSubjectService";
import { COURSE_SUBJECT_SERVICE } from "@/scolar/domain/symbols/CourseSubjectSymbol";
import { isAxiosError } from "axios";
import { injectable, inject } from "inversify";
import { Left, Right } from "purify-ts/Either";

export class ListSubjectFromCourseCommand implements UseCaseCommand {

    constructor(
        public courseId: number,
    ) { }

    get data() {
        return {
            courseId: this.courseId,
        };
    }
}


export type ListSubjectFromCourseUseCase = UseCase<CourseSubject[], ListSubjectFromCourseCommand>

@injectable()
export class ListSubjectFromCourseUseCaseImpl implements ListSubjectFromCourseUseCase {
    constructor(
        @inject(COURSE_SUBJECT_SERVICE) private _courseSubjectService: CourseSubjetService,
    ) { }

    async execute(command: ListSubjectFromCourseCommand) {
        try {
            const res = await this._courseSubjectService.listByCourse(command.data.courseId);
            return Right(res);
        } catch (error) {
            console.error("Error listing subjects from course:", error);
            if (isAxiosError(error)) {
                
                return Left([SubjectError.SUBJECT_SERVICE_ERROR]);
            }
            return Left([SubjectError.SUBJECT_SERVICE_ERROR]);
        }
    }
}