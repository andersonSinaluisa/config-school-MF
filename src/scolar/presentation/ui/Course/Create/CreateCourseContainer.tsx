
import { useInjection } from "inversify-react"
import { CreateCoursePresenter } from "./CreateCoursePresenter"
import { CreateCourseCommand, CreateCourseUseCase } from "@/scolar/application/useCases/courses/createCourseUseCase"
import { COURSE_CREATE_USECASE } from "@/scolar/domain/symbols/CourseSymbol"
import { useForm } from "react-hook-form"
import { useCallback, useEffect, useState, useTransition } from "react"
import { ListLevelsUsecase, PaginateLevelsCommand } from "@/scolar/application/useCases/levels/listLevelsUseCase"
import { LEVEL_LIST_USECASE } from "@/scolar/domain/symbols/LevelSymbol"
import { Level } from "@/scolar/domain/entities/level"
import { PaginatedResult } from "@/scolar/infrastructure/dto/paginateDto"
import { toast } from "@/hooks/use-toast"
import { useNavigate } from "react-router-dom"


export const CreateCourseContainer = () => {
    const navigate = useNavigate()
    const createCourse = useInjection<CreateCourseUseCase>(COURSE_CREATE_USECASE)
    const levelList = useInjection<ListLevelsUsecase>(LEVEL_LIST_USECASE)
    const [isSubmitting, startTransition] = useTransition()
    const [, startTransitionLoad] = useTransition()
    const [levels, setLevels] = useState<PaginatedResult<Level>>({
        data: [],
        meta: {
            total: 0,
            lastPage: 0,
            currentPage: 0,
            perPage: 0,
            prev: null,
            next: null
        }
    })

    const {  control, handleSubmit, setError, register, watch } = useForm<CreateCourseCommand>({
        defaultValues:{
            data:{
                 description: "",
                 id:0,
                 level_id:0,
                 name:""
            }
        }
    })

    const formData = watch()



    const fetchLevels = useCallback(async () => {
        startTransitionLoad(async () => {
            levelList.execute(new PaginateLevelsCommand(1,10000, ["id"]))
            .then(result => {
                if (result.isLeft()) {
                    setError("data", { message: "Error fetching levels" })
                    return;
                }
                setLevels(result.extract() as PaginatedResult<Level>)
            })
        })
    }, [])

    useEffect(() => {
        fetchLevels()
    }, [fetchLevels])



    const onSubmit = async (data: CreateCourseCommand) => {

        startTransition(async () => {
            const result = await createCourse.execute(data)
            if (result.isLeft()) {
                const error = result.extract()
                toast({
                    title: "Error",
                    description: error.join(", "),
                    variant: "destructive"
                })
                return
            }
            toast({
                title: "Curso creado",
                description: "El curso se ha creado correctamente.",
                variant: "success"
                })
                onBack()
           
        })
    }

    const onBack = ()=>{
        
       navigate('/cursos')
    }



    return (
        <CreateCoursePresenter
            control={control}
            formData={formData}
            handleSubmit={handleSubmit(onSubmit)}
            isSubmitting={isSubmitting}
            levels={levels.data}
            onBack={onBack}
            register={register}
        />
    )

}