import { AbstractFailure } from "../failure";

export class EvaluationTypeError extends AbstractFailure {
    static EVALUATION_TYPE_SERVICE_ERROR = new EvaluationTypeError(
        'EvaluationTypeServiceError',
        'Evaluation type service error',
        'root'
    );
}
