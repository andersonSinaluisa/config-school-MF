import { AbstractFailure } from "../failure";

export class GradingTermError extends AbstractFailure {
    static GRADING_TERM_SERVICE_ERROR = new GradingTermError(
        'GradingTermServiceError',
        'Grading term service error',
        'root'
    );
}
