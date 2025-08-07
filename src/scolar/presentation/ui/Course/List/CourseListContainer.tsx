
import { useInjection } from "inversify-react"
import { CourseListPresenter } from "./CourseListPresenter"
import { ListCoursesUseCase } from "@/scolar/application/useCases/courses/listCoursesUseCase"
import { COURSE_LIST_USECASE } from "@/scolar/domain/symbols/CourseSymbol"
import { useCallback, useEffect, useRef, useState, useTransition } from "react"
import { PaginatedResult } from "@/scolar/infrastructure/dto/paginateDto"
import { Course } from "@/scolar/domain/entities/course"
import { PaginateUseCaseCommand } from "@/scolar/application/useCases/useCase"
import { toast } from "@/hooks/use-toast"
import { useNavigate } from "react-router-dom"


export const CourseListContainer = () => {

    const courseList = useInjection<ListCoursesUseCase>(COURSE_LIST_USECASE);
    const [isPending, startTransition] = useTransition();
    const [courses, setCourses] = useState<PaginatedResult<Course>>({
        data: [],
        meta: {
            total: 0,
            lastPage: 0,
            currentPage: 0,
            perPage: 0,
            prev: null,
            next: null
        }
    });
    const [page, ] = useState(1);
    const [perPage, ] = useState(10);
    const [search, setSearch] = useState("");

    const searchTimeout = useRef<NodeJS.Timeout | null>(null);


    const fetchCourses = useCallback(async () => {
        const paginatedCommand = new PaginateUseCaseCommand(
            page,
            perPage,
            ["id"],
            search
        );

        startTransition(() => {
            courseList.execute(paginatedCommand).then(result => {
                if (result.isLeft()) {
                    toast({
                        title: "Error",
                        description: result.extract().join(", "),
                        variant: "destructive",
                    })
                    return;
                }
                setCourses(result.extract() as PaginatedResult<Course>);
            });
        });
    }, [courseList, page, perPage, search]);


    useEffect(() => {
        fetchCourses();
    }, [fetchCourses])



    const handleSearch = (searchTerm: string) => {
        if (searchTimeout.current) {
            clearTimeout(searchTimeout.current);
        }

        searchTimeout.current = setTimeout(() => {
            setSearch(searchTerm);
        }, 500);
    };

    const navigate = useNavigate();

    const OnAdd = () => {
        navigate('/cursos/nuevo');
    }

    return (
        <CourseListPresenter
            course={courses}
            isPending={isPending}
            onSearch={handleSearch}
            onAddCourse={OnAdd}
            onFilter={() => { }}
            onDelete={() => { }}

        />
    )
}