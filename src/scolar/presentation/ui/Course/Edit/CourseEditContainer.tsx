
import { useInjection } from "inversify-react"
import { CourseEditPresenter } from "./CourseEditPresenter"
import { GetCourseCommand, GetCourseUseCase } from "@/scolar/application/useCases/courses/getCourseUseCase"
import { COURSE_GET_USECASE, COURSE_UPDATE_USECASE } from "@/scolar/domain/symbols/CourseSymbol"
import { useCallback, useEffect, useState, useTransition } from "react"
import { toast } from "@/hooks/use-toast"
import { Course } from "@/scolar/domain/entities/course"
import { useForm } from "react-hook-form"
import { UpdateCourseCommand, UpdateCourseUseCase } from "@/scolar/application/useCases/courses/updateCourseUseCase"
import { ListLevelsUsecase } from "@/scolar/application/useCases/levels/listLevelsUseCase"
import { LEVEL_LIST_USECASE } from "@/scolar/domain/symbols/LevelSymbol"
import { PaginatedResult } from "@/scolar/infrastructure/dto/paginateDto"
import { Level } from "@/scolar/domain/entities/level"
import { PaginateUseCaseCommand } from "@/scolar/application/useCases/useCase"
import { useNavigate, useParams } from "react-router-dom"


export const EditCourseContainer = ()=>{
    const navigate = useNavigate()
    const {id} = useParams<{id: string}>();
    const [,startTransition] = useTransition();

    const getCourseUseCase = useInjection<GetCourseUseCase>(COURSE_GET_USECASE);
    const getLevels = useInjection<ListLevelsUsecase>(LEVEL_LIST_USECASE);
    const updateCourse = useInjection<UpdateCourseUseCase>(COURSE_UPDATE_USECASE);
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


    const [paginatedCommand, ] = useState<PaginateUseCaseCommand>(
        ()=> new PaginateUseCaseCommand(
            1,
            1000,
            ["id"]
           
        )
    )



    
    const fetchLevels = useCallback(async () => {
        const levels = await getLevels.execute(paginatedCommand);
        if (levels.isLeft()) {
            const error = levels.extract();
            toast({
                title: "Error",
                description: error.map(e => e.getMessage()).join(", "),
                variant: "destructive"
            })
            return;
        }
        const levelsData = levels.extract() as PaginatedResult<Level>;
        setLevels(levelsData);
    }
    , [getLevels, paginatedCommand]);




    const {
        setValue,
        register,
         control,
            handleSubmit,
            watch,
        formState: {  isSubmitting }
        
    } = useForm<UpdateCourseCommand>({
        defaultValues:{
            data:{
                description: "",
                id: 0,
                level_id: 0,
                name: ""
            }
        }
    })
 
    const data = watch();
    const fetchCourse = useCallback(async () => {
   
            const course = await getCourseUseCase.execute(new GetCourseCommand(parseInt(id|| "0")));
            if (course.isLeft()){
                const error = course.extract();
                
                toast({
                    title: "Error",
                    description: error.join(", "),
                    variant: "destructive"
                })
                return;
            }
            const courseData = course.extract() as Course;
            setValue("data.description", courseData.description);
            setValue("data.id", courseData.id);
            setValue("data.name", courseData.name);
            setValue("data.level_id", courseData.level_id);
        
    } , [getCourseUseCase, id]);



    useEffect(() => {
        fetchCourse();
    }, [fetchCourse]);


    useEffect(() => {
        fetchLevels();
    }, [fetchLevels]);
    
    const onSubmit = ()=>{
        startTransition(async () => {
            const command = new UpdateCourseCommand(
                data.data.id,
                data.data.name,
                data.data.level_id,
                data.data.description
            );
            const result = await updateCourse.execute(command);
            if (result.isLeft()) {
                const error = result.extract();
                toast({
                    title: "Error",
                    description: error.join(", "),
                    variant: "destructive"
                });
                return;
            }
            const course = result.extract() as Course;
            toast({
                title: "Curso actualizado",
                description: `El curso ${course.name} ha sido actualizado correctamente.`,
                variant: "success"
            });
            onBack()
        });
    }

    const onBack = () => {
        navigate('/cursos')
    }
    
    return (
        <CourseEditPresenter
            register={register}
            control={control}
            handleSubmit={handleSubmit(onSubmit)}
            formData={data}
            isSubmitting={isSubmitting}
            levels={levels.data}
            onBack={onBack}
            key={`course-edit-${id}`}
           
        />
    )
}