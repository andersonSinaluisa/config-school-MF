
import { LEVEL_LIST_USECASE } from "@/scolar/domain/symbols/LevelSymbol"
import { LevelListPresenter } from "./LevelListPresenter"
import { useEffect, useRef, useState, useTransition } from "react"
import { PaginatedResult } from "@/scolar/infrastructure/dto/paginateDto"
import { Level } from "@/scolar/domain/entities/level"
import { toast } from "@/hooks/use-toast"
import { ListLevelsUsecase, PaginateLevelsCommand } from "@/scolar/application/useCases/levels/listLevelsUseCase"
import { useInjection } from "inversify-react"
import { useNavigate } from "react-router-dom"



export const LevelListContainer = ()=>{
    const listLevelsUsecase = useInjection<ListLevelsUsecase>(LEVEL_LIST_USECASE)
    const [isPending, startTransition] = useTransition()
    const [paginaleCommand, setPaginateCommand] = useState({ page: 1, perPage: 10, where: '', orderBy: [] })
    const [levelsResult, setLevelsResult] = useState<PaginatedResult<Level>>({
        data: [],
        meta:{
            currentPage: 1,
            lastPage: 1,
            next: null,
            perPage: 10,
            prev: null,
            total: 0
        }
    })
    const debounceRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        handleLoadLevels()
    }, [paginaleCommand])

    const handleLoadLevels = async () => {
        startTransition(async () => {
            const result = await listLevelsUsecase.execute(
                new PaginateLevelsCommand(
                    paginaleCommand.page,
                    paginaleCommand.perPage,
                    paginaleCommand.orderBy,
                    paginaleCommand.where,

                )
            )
            if (result.isRight()) {
                const res = result.extract()
                setLevelsResult(res as PaginatedResult<Level>)
            } else {
               toast({
                'title': 'Error',
                'description': 'Error while loading levels',
                'variant': 'destructive',
                'duration': 5000,
               })
            }
        })
    }
    const navigate = useNavigate();
    const handleAdd =  () => {
        navigate('/niveles-escolares/nuevo')
    }
    const handleEdit =  (_level: Level) => {
        navigate(`/niveles-escolares/${_level.id}`)
    }

    const handlePaginate = (page: number) => {
        startTransition(() => {
            setPaginateCommand({
                ...paginaleCommand,
                page: page
            })
        })
    }
    const handleSearch = (searchTerm: string) => {

        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }
        debounceRef.current = setTimeout(() => {
            startTransition(() => {
                setPaginateCommand({
                    ...paginaleCommand,
                    where: searchTerm
                })
            })
        }, 300);
    }
    return (
        <LevelListPresenter
            levels={levelsResult}
            onAdd={handleAdd}
            onDelete={()=>{}}
            onEdit={handleEdit}
            isPending={isPending}
            onPaginate={handlePaginate}
            onSearch={handleSearch}

        />
    )
}