import { useInjection } from "inversify-react";
import { ListSubjectCommand, ListSubjectUseCase } from "../../useCases/subjects/listSubjectsUseCase";
import { SUBJECT_LIST_USE_CASE } from "@/scolar/domain/symbols/SubjectSymbol";
import { useCallback, useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";
import { Subject } from "@/scolar/domain/entities/subject";
import { PaginatedResult } from "@/scolar/infrastructure/dto/paginateDto";


export const useFetchSubjects = (
    page: number,
    perPage: number,
    search: string
) => {
    const subjectUseCase = useInjection<ListSubjectUseCase>(SUBJECT_LIST_USE_CASE);
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const fetchSubjects = useCallback(async () => {
        const res = await subjectUseCase.execute(
            new ListSubjectCommand(page, perPage, [], search)
        );
        if (res.isLeft()){
            toast({
                title: "Error",
                description: "No se pudieron cargar las materias",
                variant: "destructive",
            })
            return;
        } 
        const subjects = res.extract() as PaginatedResult<Subject>;
        setSubjects(subjects.data);
    }, [page, perPage, search]);

    useEffect(() => {
        fetchSubjects();
    }, [fetchSubjects]);

    return subjects;
};
