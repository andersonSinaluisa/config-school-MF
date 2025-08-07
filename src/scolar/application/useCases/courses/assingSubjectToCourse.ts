import { UseCase, UseCaseCommand } from "@/scolar/application/useCases/useCase";
import Failure from "@/scolar/domain/failure";
import { CourseSubject } from "@/scolar/domain/entities/course_subject";
import { SubjectError } from "@/scolar/domain/entities/subjectError";
import { CourseSubjetService } from "@/scolar/domain/services/CourseSubjectService";
import { COURSE_SUBJECT_SERVICE } from "@/scolar/domain/symbols/CourseSubjectSymbol";
import {injectable, inject} from "inversify";
import { Either, Left, Right } from "purify-ts/Either";


export class AssignSubjectToCourseUseCaseCommand implements UseCaseCommand {
    constructor(
        private _courseId: number,
        public _list: CourseSubject[],
    ) {}
    get data(){
        return {
            courseId: this._courseId,
            subjects: this._list.map((subject) => ({
                subjectId: subject.subjectId,
                hoursPerWeek: subject.hoursPerWeek,
                isRequired: subject.isRequired
            }))
        }
    }
}


export type AssignSubjectToCourseUseCase = UseCase<CourseSubject[], AssignSubjectToCourseUseCaseCommand>


@injectable()
export class AssignSubjectToCourseUseCaseImpl implements AssignSubjectToCourseUseCase{

    constructor(
        @inject(COURSE_SUBJECT_SERVICE) private _courseSubjectService: CourseSubjetService,
    ){}
    async execute(command: AssignSubjectToCourseUseCaseCommand): Promise<Either<Failure[], CourseSubject[] | undefined>> {
        
        try{
            const res = await this._courseSubjectService.bulkCreate(
                command.data.courseId, 
                command.data.subjects as Omit<CourseSubject, "id" | "courseId">[])
            return Right(res);
        }catch (error) {
            if (error instanceof SubjectError) {
                return Left([error]);
            }
            return Left([SubjectError.SUBJECT_NOT_CREATED]);
        }

    }

    
}