;
import { ListByCoursePresenter } from "./ListByCoursePresenter"
import { useInjection } from "inversify-react";
import { GetCourseCommand, GetCourseUseCase } from "@/scolar/application/useCases/courses/getCourseUseCase";
import { COURSE_GET_USECASE } from "@/scolar/domain/symbols/CourseSymbol";
import { useCallback, useEffect, useState, useTransition } from "react";
import { Course } from "@/scolar/domain/entities/course";
import { toast } from "@/hooks/use-toast";
import { PaginatedResult } from "@/scolar/infrastructure/dto/paginateDto";
import { Parallel } from "@/scolar/domain/entities/parallel";
import { ListParallelByCourseUseCase, ListParallelByCourseUseCaseCommand } from "@/scolar/application/useCases/parallels/listParallelByCourseUseCase";
import { PARALLEL_GET_LIST_BY_COURSE_USECASE } from "@/scolar/domain/symbols/ParallelSymbol";
import { useNavigate, useParams } from "react-router-dom";


export const ListByCourseContainer = ()=>{

    const { courseId } = useParams<{ courseId: string }>();
    const getCourseUseCase = useInjection<GetCourseUseCase>(COURSE_GET_USECASE);
    const getParallelsByCourseUseCase = useInjection<ListParallelByCourseUseCase>(PARALLEL_GET_LIST_BY_COURSE_USECASE); // Assuming you have a use case for fetching parallels by course
    const [, startTransition] = useTransition()
    const [course,setCourse] = useState<Course|null>(null)

    const [result, setResult] = useState<PaginatedResult<Parallel>>({
        data: [],
        meta: {
            total: 0,
            lastPage: 0,
            currentPage: 1,
            perPage: 10,
            prev: null,
            next: null
        }
    })
    const [paginate,] = useState<ListParallelByCourseUseCaseCommand>(
        ()=>new ListParallelByCourseUseCaseCommand(courseId ? parseInt(courseId, 10) : 0, 1, 10, [], undefined)
    )


    const fetchCourse = useCallback((id:number)=>{
        
        startTransition(()=>{
            getCourseUseCase.execute(new GetCourseCommand(id)).then(res =>{
                if (res.isLeft()){
                    const messages = res.extract().map((error) => error.getMessage()).join(", ");

                    toast({
                        title: "Error al crear el paralelo",
                        description: messages || "Ocurrió un error al crear el paralelo.",
                        variant: "destructive"
                    })
                }
                setCourse(res.extract() as Course)
            })
        })
        
    }, [])



    const fetchParallels = useCallback(()=>{
        startTransition(()=>{
            getParallelsByCourseUseCase.execute(
                paginate
            ).then(res => {
                if (res.isLeft()) {
                    const messages = res.extract().map((error) => error.getMessage()).join(", ");
                    toast({
                        title: "Error al cargar las materias",
                        description: messages || "Ocurrió un error al cargar las materias.",
                        variant: "destructive"
                    })
                    return;
                } 
                console.log(res.extract())
                    setResult(res.extract() as PaginatedResult<Parallel>);
                
            })
        })
    }, [courseId,paginate])

    useEffect(() => {
        console.log("Fetching course...", courseId);
        fetchCourse(parseInt(courseId || "0", 10));
    }, [fetchCourse, courseId])
    useEffect(()=>{
        fetchParallels()
    },[fetchParallels])

    const navigate = useNavigate();

    const handleBack = ()=>{
        navigate(-1);
    }

    return (
        <ListByCoursePresenter
            course={course}
            onBack={handleBack}
            list={result}
        />
    )
}