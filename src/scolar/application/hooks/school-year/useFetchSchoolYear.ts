import { useInjection } from "inversify-react"
import { SCHOOL_YEAR_LIST_BY_FILTERS_USE_CASE } from "@/scolar/domain/symbols/SchoolYearSymbol";
import { useCallback, useEffect, useState } from "react";
import { SchoolYear } from "@/scolar/domain/entities/school_year";
import { ListSchoolYearByFiltersUseCase, ListSchoolYearByFiltersUseCaseCommand } from "../../useCases/schoolYears/listSchoolYearByFiltersUseCase";


export const useFetchSchoolYears = (
    page: number,
    perPage: number,
    search: string,
    status?: string
) => {
   
    const schoolYearUseCase = useInjection<ListSchoolYearByFiltersUseCase>(SCHOOL_YEAR_LIST_BY_FILTERS_USE_CASE);
    const [parallels, setParallels] = useState<SchoolYear[]>([]);

    const fetchParallel = useCallback(() => {
        schoolYearUseCase.execute(new ListSchoolYearByFiltersUseCaseCommand(
            search, status,
            page, perPage,
            [], 
            search)).then(res => {
            if (res.isRight()) {
                setParallels(res.extract()!.data);
            }
        });
    }, [page, perPage, search, schoolYearUseCase]);

    useEffect(() => {
        fetchParallel();
    }, [fetchParallel]);

    return parallels
}
