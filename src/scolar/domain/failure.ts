export default interface Failure {
    getMessage(): string;
    getCode(): string;
    getField(): string;
}

export class AbstractFailure implements Failure {
    getMessage(): string {
        return this.message;
    }
    getCode(): string {
        return this.code;
    }
    getField(): string {
        return this.field;
    }
    public constructor(
        public readonly code: string,
        public readonly message: string,
        public readonly field: string,
    ) { }


    static fromError(error: any): AbstractFailure {
        if (error instanceof AbstractFailure) {
            return error;
        }
        if (error instanceof Error) {
            return new AbstractFailure('UNKNOWN_ERROR', error.message, '');
        }
        return new AbstractFailure('UNKNOWN_ERROR', 'An unknown error occurred', '');

    }
}