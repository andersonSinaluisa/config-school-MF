
import { toast } from "@/hooks/use-toast"
import { PaginatedResult } from "@/scolar/infrastructure/dto/paginateDto"
import { ListSubjectCommand, ListSubjectUseCase } from "@/scolar/application/useCases/subjects/listSubjectsUseCase"
import { Subject } from "@/scolar/domain/entities/subject"
import { SUBJECT_LIST_USE_CASE } from "@/scolar/domain/symbols/SubjectSymbol"
import { useInjection } from "inversify-react"
import { useCallback, useEffect, useState, useTransition } from "react"
import { SubjectListPresenter } from "./SubjectListPresenter"
import { useNavigate } from "react-router-dom"


export const SubjectListContainer = () => {
    const subjectList = useInjection<ListSubjectUseCase>(SUBJECT_LIST_USE_CASE)
    const [isPending, startTransition] = useTransition()
    const [searchTerm, setSearchTerm] = useState<string | undefined>(undefined)
    const [page, ] = useState<number>(1)
    const [perPage, ] = useState<number>(10)
    const [subjects, setSubjects] = useState<PaginatedResult<Subject>>({
        data: [],
        meta: {
            currentPage: 1,
            lastPage: 1,
            next: null,
            perPage: 10,
            prev: null,
            total: 0
        }
    })


    const fetchSubjects = useCallback(() => {
        startTransition(() => {
            subjectList.execute(new ListSubjectCommand(
                page,
                perPage,
                ['id'],
                searchTerm
            )).then(result => {
                if (result.isLeft()) {
                    toast({
                        title: "Error al cargar las materias",
                        description: result.extract().join(", "),
                        variant: "destructive"
                    })
                    return
                }
                setSubjects(result.extract() as PaginatedResult<Subject>)
            }).catch(error => {
                toast({
                    title: "Error al cargar las materias",
                    description: error.message,
                    variant: "destructive"
                })
            })
        })
    }, [subjectList, page, perPage, searchTerm, startTransition])




    useEffect(() => {
        fetchSubjects()
    }, [fetchSubjects])
    const navigate = useNavigate();
    const onAddSubject = () => {
        navigate('/materias/crear')
    }
    return (
        <SubjectListPresenter
            subjects={subjects}
            isPending={isPending}
            onSearch={(searchTerm) => setSearchTerm(searchTerm)}
            onFilter={() => { }}
            onAddSubject={onAddSubject}
            isPendingDelete={false} // Placeholder, implement delete logic if needed
            onDelete={() => {
                // Logic to delete a subject
            }}
        />
    )

}