
import { useCallback, useEffect, useRef, useState, useTransition } from "react"
import { ListSchoolYearPresenter } from "./ListSchoolYearPresenter"
import { useInjection } from "inversify-react"
import { ListSchoolYearUseCase, ListSchoolYearUseCaseCommand } from "@/scolar/application/useCases/schoolYears/listSchoolYearUseCase"
import { SCHOOL_YEAR_LIST_USE_CASE } from "@/scolar/domain/symbols/SchoolYearSymbol"
import { SchoolYear } from "@/scolar/domain/entities/school_year"
import { PaginatedResult } from "@/scolar/infrastructure/dto/paginateDto"
import { toast } from "@/hooks/use-toast"
import { useNavigate } from "react-router-dom"


export const ListSchoolYearContainer = () => {

    const [isPending,startTransition] = useTransition()
    const listSchoolYearUseCase = useInjection<ListSchoolYearUseCase>(SCHOOL_YEAR_LIST_USE_CASE)
    const [filter, ] = useState<string[]>([])
    const [page, setPage] = useState<number>(1)
    const [perPage, ] = useState<number>(10)
      const debounceRef = useRef<NodeJS.Timeout | null>(null);
  
    const [searchTerm, setSearchTerm] = useState<string | undefined>(undefined)
        const [schoolYear, setSchoolYear] = useState<PaginatedResult<SchoolYear>>({
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
    const fetchSchoolYears = useCallback(() => {
        startTransition(()=>{
            listSchoolYearUseCase.execute(
                new ListSchoolYearUseCaseCommand(
                    page,
                    perPage,
                    filter,
                    searchTerm
                )
            ).then(result=>{
                if(result.isLeft()){
                    toast({
                        title: "Error al cargar los años escolares",
                        description: result.extract().join(", "),
                        variant: "destructive"
                    })
                    return
                }
                setSchoolYear(result.extract() as PaginatedResult<SchoolYear>)
                // Update state with fetched school years
            }).catch(error => {
                // Handle error
                toast({
                    title: "Error al cargar los años escolares",
                    description: error.message,
                    variant: "destructive"
                })
            })
        })
    }, [listSchoolYearUseCase, page, perPage, filter, searchTerm, startTransition])


    useEffect(() => {
        fetchSchoolYears()
    }, [fetchSchoolYears])


    const navigate = useNavigate();
    const onAdd = ()=>{
        navigate('/periodos-lectivos/nuevo')
    }
    const onEdit = (schoolYear: SchoolYear) => {
        navigate(`/periodos-lectivos/${schoolYear.id}`)
    }
    const onDelete = () => {
        fetchSchoolYears() // Refresh the list after deletion
    }

    const onSearch = (searchTerm: string) => {
        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }
        debounceRef.current = setTimeout(() => {
            startTransition(() => {
                setSearchTerm(searchTerm)
                setPage(1) // Reset to first page on new search
            })
        }, 300); // Adjust the delay as needed
    }
    return (
        <ListSchoolYearPresenter
            isPending={isPending}
            onAdd={onAdd}
            onDelete={onDelete}
            onEdit={onEdit}
            onPaginate={(page: number) => {
                setPage(page)
            }}
            schoolYears={schoolYear}
            onSearch= {onSearch}
        />
    )
}
