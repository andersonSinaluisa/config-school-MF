
import { useInjection } from "inversify-react"
import { CourseListPresenter } from "./CourseListPresenter"
import { COURSE_LIST_BY_FILTERS_USECASE } from "@/scolar/domain/symbols/CourseSymbol"
import { LEVEL_LIST_USECASE } from "@/scolar/domain/symbols/LevelSymbol"
import { useCallback, useEffect, useRef, useState, useTransition } from "react"
import { PaginatedResult } from "@/scolar/infrastructure/dto/paginateDto"
import { Course } from "@/scolar/domain/entities/course"
import { Level } from "@/scolar/domain/entities/level"
import { ListCoursesByFiltersUseCase, ListCoursesByFiltersUseCaseCommand } from "@/scolar/application/useCases/courses/listCoursesByFiltersUseCase"
import { ListLevelsUsecase, PaginateLevelsCommand } from "@/scolar/application/useCases/levels/listLevelsUseCase"
import { toast } from "@/hooks/use-toast"
import { useNavigate } from "react-router-dom"
export const CourseListContainer = () => {

    const courseList = useInjection<ListCoursesByFiltersUseCase>(COURSE_LIST_BY_FILTERS_USECASE);
    const levelList = useInjection<ListLevelsUsecase>(LEVEL_LIST_USECASE);
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
    const [levels, setLevels] = useState<Level[]>([]);
    const [page,] = useState(1);
    const [perPage,] = useState(10);
    const [search, setSearch] = useState("");
    const [levelId, setLevelId] = useState<number | undefined>(undefined);

    const searchTimeout = useRef<NodeJS.Timeout | null>(null);

    const fetchCourses = useCallback(async () => {
        const command = new ListCoursesByFiltersUseCaseCommand(
            undefined,
            levelId,
            page,
            perPage,
            ["id"],
            search
        );

        startTransition(() => {
            courseList.execute(command).then(result => {
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
    }, [courseList, page, perPage, search, levelId]);

    const fetchLevels = useCallback(() => {
        levelList.execute(new PaginateLevelsCommand(1, 100, ["id"]))
            .then(result => {
                if (result.isRight()) {
                    setLevels((result.extract() as PaginatedResult<Level>).data);
                }
            });
    }, [levelList]);

    useEffect(() => {
        fetchLevels();
    }, [fetchLevels]);

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

    const handleLevelChange = (value: number | string) => {
        setLevelId(Number(value) || undefined);
    };

    const clearFilters = () => {
        setSearch("");
        setLevelId(undefined);
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
            levels={levels}
            selectedLevel={levelId}
            onLevelChange={handleLevelChange}
            onClearFilters={clearFilters}

        />
    )
}