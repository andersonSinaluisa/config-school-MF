import { UseCaseCommand } from "@/scolar/application/useCases/useCase";


export class RemoveSubjectToCourseUseCaseCommand implements UseCaseCommand {
    constructor(
        private _courseId: number,
        private _subjectId: number
    ) {}
    

    get data(){
        return {
            courseId: this._courseId,
            subjectId: this._subjectId
        };
    }
}