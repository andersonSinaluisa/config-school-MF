import { useInjection } from "inversify-react";
import { useCallback, useEffect, useState } from "react";
import { ListParallelUseCase, ListParallelUseCaseCommand } from "../../useCases/parallels/listParallelUseCase";
import { PARALLEL_LIST_USECASE } from "@/scolar/domain/symbols/ParallelSymbol";
import { Parallel } from "@/scolar/domain/entities/parallel";
import { PaginatedResult } from "@/scolar/infrastructure/dto/paginateDto";
import { toast } from "@/hooks/use-toast";
import Failure from "@/scolar/domain/failure";



export const useFetchParallels = (page: number, perPage: number, search: string) => {
    const [parallels, setParallels] = useState<Parallel[]>([]);
    const listParallels = useInjection<ListParallelUseCase>(PARALLEL_LIST_USECASE);
    const fetchCourses = useCallback(() => {

        listParallels.execute(new ListParallelUseCaseCommand(page, perPage, ["id"], search))
            .then(res => {
                if (res.isRight()) {
                    setParallels((res.extract() as PaginatedResult<Parallel>).data);
                } else {
                    const _errors = res.extract() as Failure[]
                    toast({
                        title: "Error",
                        description: _errors.map(e => e.getMessage()).join(", "),
                        variant: "destructive",
                    });
                }
            })
    }, [page, perPage, search, listParallels]);

    useEffect(() => {
        fetchCourses();
    }, [fetchCourses]);

    return parallels;
};
