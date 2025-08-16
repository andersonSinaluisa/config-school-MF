;
import { ListByCoursePresenter } from "./ListByCoursePresenter"
import { useInjection } from "inversify-react";
import { GetCourseCommand, GetCourseUseCase } from "@/scolar/application/useCases/courses/getCourseUseCase";
import { COURSE_GET_USECASE } from "@/scolar/domain/symbols/CourseSymbol";
import { startTransition, useCallback, useEffect, useState } from "react";
import { Course } from "@/scolar/domain/entities/course";
import { toast } from "@/hooks/use-toast";
import { PaginatedResult } from "@/scolar/infrastructure/dto/paginateDto";
import { Parallel } from "@/scolar/domain/entities/parallel";
import { PARALLEL_LIST_USECASE } from "@/scolar/domain/symbols/ParallelSymbol";
import { useNavigate, useParams } from "react-router-dom";
import { useFetchSchoolYears } from "@/scolar/application/hooks/school-year/useFetchSchoolYear";
import { ListParallelByFiltersUseCase, ListParallelByFiltersUseCaseCommand } from "@/scolar/application/useCases/parallels/listParalleByFilters";


export const ListByCourseContainer = ()=>{

    const { courseId } = useParams<{ courseId: string }>();
    const getCourseUseCase = useInjection<GetCourseUseCase>(COURSE_GET_USECASE);
    const getParallelsByCourseUseCase = useInjection<ListParallelByFiltersUseCase>(PARALLEL_LIST_USECASE); 
    const [course,setCourse] = useState<Course|null>(null)

    const [searchSchoolYear,setSearchSchoolYear] = useState<string>("")
    const schoolYear = useFetchSchoolYears(1,1000,searchSchoolYear);
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
    const [paginate,setPaginate] = useState<ListParallelByFiltersUseCaseCommand>(
        () => new ListParallelByFiltersUseCaseCommand(
            { courseId: courseId? parseInt(courseId, 10): 0 }, 
        1, 10, [], undefined)
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

    const onSchoolYearChange = (schoolYear:string) => {
        setPaginate(
            new ListParallelByFiltersUseCaseCommand(
                {
                    courseId: courseId ? parseInt(courseId, 10) : 0,
                    schoolYearId: schoolYear ? parseInt(schoolYear, 10) : undefined
                },
                1,
                100,
                [],
                undefined
            )
        )
    }

    return (
        <ListByCoursePresenter
            course={course}
            onBack={handleBack}
            list={result}
            onSchoolYearChange={onSchoolYearChange}
            onSearchSchoolYear={setSearchSchoolYear}
            schoolYears={schoolYear}
            selectedSchoolYearId={paginate.params.schoolYearId?.toString()}
        />
    )
}