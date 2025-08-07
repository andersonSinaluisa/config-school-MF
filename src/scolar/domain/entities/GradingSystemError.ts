import { AbstractFailure } from "../failure";

export class GradingSystemError extends AbstractFailure {
    static GRADING_SYSTEM_SERVICE_ERROR = new GradingSystemError('GradingSystemServiceError', 'Grading system service error', 'root');
}
