import { Either } from "purify-ts/Either";
import Failure from "@/scolar/domain/failure";

export interface UseCase<T, C extends UseCaseCommand> {
    execute(command: C): Promise<Either<Failure[], T | undefined>>;
}

export interface UseCaseCommand { }

export class EmptyUseCaseCommand implements UseCaseCommand { }

export class PaginateUseCaseCommand implements UseCaseCommand {
    constructor(
        private page: number,
        private perPage: number,
        private orderBy: string[],
        private where?: string,

    ) { }
    get data() {
        return {
            page: this.page,
            perPage: this.perPage,
            search: this.where,
            orderBy: this.orderBy
        };
    }
}