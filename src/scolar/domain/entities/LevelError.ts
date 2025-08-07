import { AbstractFailure } from "../failure";


export class LevelError extends AbstractFailure{
    static LEVEL_SERVICE_ERROR = new LevelError('LevelServiceError', 'Level service error','root')
}