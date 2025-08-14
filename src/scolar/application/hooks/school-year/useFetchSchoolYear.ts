import { useInjection } from "inversify-react"
import { ListSchoolYearUseCase, ListSchoolYearUseCaseCommand } from "../../useCases/schoolYears/listSchoolYearUseCase";
import { SCHOOL_YEAR_LIST_USE_CASE } from "@/scolar/domain/symbols/SchoolYearSymbol";
import { useCallback, useEffect, useState } from "react";
import { SchoolYear } from "@/scolar/domain/entities/school_year";


export const useFetchSchoolYears = (
    page: number,
    perPage: number,
    search: string
) => {
   
    const schoolYearUseCase = useInjection<ListSchoolYearUseCase>(SCHOOL_YEAR_LIST_USE_CASE);
    const [parallels, setParallels] = useState<SchoolYear[]>([]);

    const fetchParallel = useCallback(() => {
        schoolYearUseCase.execute(new ListSchoolYearUseCaseCommand(page, perPage,
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
