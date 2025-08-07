import { injectable } from 'inversify';
@injectable()
export class Logger {
    info(message: string): void {
        console.log(`INFO: ${message}`);
    }

    warn(message: string): void {
        console.warn(`WARN: ${message}`);
    }

    error(message: string): void {
        console.log(`ERROR: ${message}`);
    }
}

