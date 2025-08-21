import { useInjection } from "inversify-react"
import { ListParallelByFiltersUseCase, ListParallelByFiltersUseCaseCommand } from "../../useCases/parallels/listParalleByFilters"
import { PARALLEL_LIST_USECASE } from "@/scolar/domain/symbols/ParallelSymbol"
import { useCallback, useEffect, useState } from "react";
import { PaginatedResult } from "@/scolar/infrastructure/dto/paginateDto";
import { Parallel } from "@/scolar/domain/entities/parallel";
import { toast } from "@/hooks/use-toast";

export const useFilterParallels = (page:number, size:number, 
    search?: string,
    courseId?:number, schoolYearId?:number, name?:string, capacity?:number, sectionId?:number
) => {

    const listUseCase = useInjection<ListParallelByFiltersUseCase>(PARALLEL_LIST_USECASE);
    const [parallels, setParallels] = useState<PaginatedResult<Parallel>>({
        data:[],
        meta:{
            currentPage:0,
            lastPage:0,
            next:null,
            perPage:0,
            prev:null,
            total:0
        }
    });

    const fetchParallel = useCallback(async()=>{
        const res = await listUseCase.execute(new ListParallelByFiltersUseCaseCommand(
            { courseId, schoolYearId, name, capacity, sectionId },page,size,["-id"],search))

        if(res.isLeft()){
            toast({
                title: "Error al cargar paralelos",
                description: res.extract().join(", "),
                variant: "destructive"
            })
            return;
        }

        setParallels(res.extract() as PaginatedResult<Parallel>);
    },[listUseCase, page, size, search, courseId, schoolYearId, name, capacity, sectionId]);


    useEffect(() => {
        fetchParallel();
    }, [fetchParallel]);

    return parallels;

}