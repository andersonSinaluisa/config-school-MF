
import { useInjection } from "inversify-react"
import { ListParallelPresenter } from "./ListParallelPresenter"
import { ListParallelUseCase, ListParallelUseCaseCommand } from "@/scolar/application/useCases/parallels/listParallelUseCase"
import { PARALLEL_LIST_USECASE } from "@/scolar/domain/symbols/ParallelSymbol"
import {  useCallback, useEffect, useState, useTransition } from "react"
import { toast } from "@/hooks/use-toast"
import { PaginatedResult } from "@/scolar/infrastructure/dto/paginateDto"
import { Parallel } from "@/scolar/domain/entities/parallel"
import { useNavigate } from "react-router-dom"




export const ListParallelContainer = () => {
    const parallelListUseCase = useInjection<ListParallelUseCase>(PARALLEL_LIST_USECASE)
    const [command,setCommand] = useState<ListParallelUseCaseCommand>(
        ()=> new ListParallelUseCaseCommand(1, 10, [], "")
    )
    const [levels, setLevels] = useState<PaginatedResult<Parallel>>({
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
    const [isPending, startTransition] =useTransition()
    const fetchParallels = useCallback( () => {
        startTransition(()=>{
            parallelListUseCase.execute(
                command
            ).then((parallels) => {
                if (parallels.isLeft()) {
                    toast({
                        title: "Error fetching parallels",
                        description: parallels.extract().map(error => error.getMessage()).join(", "),
                        variant: "destructive"
                    })
                    return
                }
                // Handle the fetched parallels
                const result = parallels.extract() as PaginatedResult<Parallel>
                setLevels(result)
            }).catch((error) => {
                // Handle error
                toast({
                    title: "Error fetching parallels",
                    description: error.message,
                    variant: "destructive"
                })
            })
        })

    }, [parallelListUseCase, command])

    useEffect(() => {
        fetchParallels()
    }, [fetchParallels])

    const handleSearch = (searchTerm: string) => {
        setCommand(new ListParallelUseCaseCommand(command.data.page,
            command.data.perPage,
            command.data.orderBy,
            searchTerm
        ))
    }
    const handlePaginate = (page: number) => {
        setCommand(new ListParallelUseCaseCommand(page, 
            command.data.perPage,
            command.data.orderBy,
            command.data.search
        ))
    }

    const navigate = useNavigate();

    const handleAdd = () => {
        navigate('/paralelos/nuevo')
    }

    const handleEdit = (_data:Parallel) => {
        navigate(`/paralelos/${_data.id}`)
    }

    return (
        <ListParallelPresenter
            onAdd={handleAdd}
            onEdit={handleEdit}
            onPaginate={handlePaginate}
            onSearch={handleSearch}
            parallels={levels}
            isPending={isPending}
            key={"list-parallel-container"}
        />
    )
}