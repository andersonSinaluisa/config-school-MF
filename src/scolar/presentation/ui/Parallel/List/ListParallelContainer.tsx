
import { useInjection } from "inversify-react"
import { ListParallelPresenter } from "./ListParallelPresenter"
import { PARALLEL_LIST_USECASE } from "@/scolar/domain/symbols/ParallelSymbol"
import {  useCallback, useEffect, useState, useTransition } from "react"
import { toast } from "@/hooks/use-toast"
import { PaginatedResult } from "@/scolar/infrastructure/dto/paginateDto"
import { Parallel } from "@/scolar/domain/entities/parallel"
import { useNavigate } from "react-router-dom"
import { ListParallelByFiltersUseCase, ListParallelByFiltersUseCaseCommand } from "@/scolar/application/useCases/parallels/listParalleByFilters"
import { useFetchCourse } from "@/scolar/application/hooks/courses/useFetchCourse"
import { useFetchLevel } from "@/scolar/application/hooks/levels/useFetchLevel"
import { useFetchSchoolYears } from "@/scolar/application/hooks/school-year/useFetchSchoolYear"




export const ListParallelContainer = () => {
    const parallelListUseCase = useInjection<ListParallelByFiltersUseCase>(PARALLEL_LIST_USECASE)
    const [command, setCommand] = useState<ListParallelByFiltersUseCaseCommand>(
        () => new ListParallelByFiltersUseCaseCommand({}, 1, 10, [], "")
    )

    const [searchCourse, setSearchCourse] = useState<string>("")
    const courses = useFetchCourse(1, 100, searchCourse);

    const [searchLevel, setSearchLevel] = useState<string>("")
    const listLevels = useFetchLevel(1, 100, searchLevel);

    const [searchSchoolYear, setSearchSchoolYear] = useState<string>("")
    const schoolYears = useFetchSchoolYears(1, 100, searchSchoolYear);

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

    // State for selected filters
    const [selectedCourse, setSelectedCourse] = useState<number | undefined>(undefined);
    const [selectedSchoolYear, setSelectedSchoolYear] = useState<number | undefined>(undefined);

    const [isPending, startTransition] = useTransition()
    const fetchParallels = useCallback(() => {
        startTransition(() => {
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
        setCommand(new ListParallelByFiltersUseCaseCommand(
            {
                ...command.data.params,
                courseId: selectedCourse,
                schoolYearId: selectedSchoolYear
            },
            command.data.page,
            command.data.perPage,
            command.data.orderBy,
            searchTerm
        ))
    }

    const handlePaginate = (page: number) => {
        setCommand(new ListParallelByFiltersUseCaseCommand(
            {
                ...command.data.params,
                courseId: selectedCourse,
                schoolYearId: selectedSchoolYear
            },
            page,
            command.data.perPage,
            command.data.orderBy,
            command.data.search
        ))
    }

    const handleCourseChange = (courseId: string) => {
        const id = courseId ? Number(courseId) : undefined;
        setSelectedCourse(id);
        setCommand(new ListParallelByFiltersUseCaseCommand(
            {
                ...command.data.params,
                courseId: id,
                schoolYearId: selectedSchoolYear
            },
            1,
            command.data.perPage,
            command.data.orderBy,
            command.data.search
        ))
    }

    const handleSchoolYearChange = (schoolYearId: string) => {
        const id = schoolYearId ? Number(schoolYearId) : undefined;
        setSelectedSchoolYear(id);
        setCommand(new ListParallelByFiltersUseCaseCommand(
            {
                ...command.data.params,
                courseId: selectedCourse,
                schoolYearId: id
            },
            1,
            command.data.perPage,
            command.data.orderBy,
            command.data.search
        ))
    }

    const navigate = useNavigate();

    const handleAdd = () => {
        navigate('/paralelos/nuevo')
    }

    const handleEdit = (_data: Parallel) => {
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
            courses={courses}
            levels={listLevels}
            schoolYears={schoolYears}
            onCourseChange={handleCourseChange}
            onSchoolYearChange={handleSchoolYearChange}
            selectedCourse={courses.find(c => c.id === selectedCourse)}
            selectedSchoolYear={schoolYears.find(sy => sy.id === selectedSchoolYear)}
            onSearchLevel={setSearchLevel}
            onSearchSchoolYear={setSearchSchoolYear}
            onSearchCourse={setSearchCourse}
        />
    )
}