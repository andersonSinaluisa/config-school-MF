;
import { useInjection } from "inversify-react"
import { SheetCreateParallelPresenter } from "./SheetCreateParallelPresenter"
import { CreateParallelUseCase, CreateParallelUseCaseCommand } from "@/scolar/application/useCases/parallels/createParallelUseCase"
import { PARALLEL_CREATE_USECASE } from "@/scolar/domain/symbols/ParallelSymbol"
import { Course } from "@/scolar/domain/entities/course"
import { ListSchoolYearUseCase, ListSchoolYearUseCaseCommand } from "@/scolar/application/useCases/schoolYears/listSchoolYearUseCase"
import { SCHOOL_YEAR_LIST_USE_CASE } from "@/scolar/domain/symbols/SchoolYearSymbol"
import { useCallback, useEffect, useState,  } from "react"
import { useForm } from "react-hook-form"
import { toast } from "@/hooks/use-toast"
import { ListSectionCommand, ListSectionUseCase } from "@/scolar/application/useCases/section/listSectionUseCases"
import { SECTION_LIST_USE_CASE } from "@/scolar/domain/symbols/SectionSymbol"
import { Section } from "@/scolar/domain/entities/section"

export interface CreateParallelContainerProps {
    course: Course;
}
export const SheetCreateParallelContainer = (props: CreateParallelContainerProps) => {


    const createParallelUseCase = useInjection<CreateParallelUseCase>(PARALLEL_CREATE_USECASE)
    const listSchoolYear = useInjection<ListSchoolYearUseCase>(SCHOOL_YEAR_LIST_USE_CASE);

    const [searchCommand, ] = useState<ListSchoolYearUseCaseCommand>(
        ()=> new ListSchoolYearUseCaseCommand(1, 10,["id"])
    )

    const lisSectionUseCase = useInjection<ListSectionUseCase>(SECTION_LIST_USE_CASE);
    const [sections, setSections] = useState<Section[]>([]);

    const fetchSections = useCallback(async () => {
        const result = await lisSectionUseCase.execute(
            new ListSectionCommand(
                1,10000,["id"]
            )
        );
        if (result.isRight()) {
            setSections(result.extract()?.data || []);
        }
    }, [lisSectionUseCase]);

    useEffect(() => {
        fetchSections()
    },[fetchSections])

    const searchSchoolYear = useCallback(async(input:string)=>{
        
        const result = await listSchoolYear.execute(
            new ListSchoolYearUseCaseCommand(
                searchCommand.data.page,
                searchCommand.data.perPage,
                searchCommand.data.orderBy,
                input
            )
        )
        return result.isRight() ? result.extract()?.data .map(schoolYear => ({
            label: schoolYear.name,
            value: schoolYear.id.toString()
        })) || [] : [];
    },[listSchoolYear, searchCommand]);

    const {
        register,
        handleSubmit,
        control,
        setValue
    } = useForm<CreateParallelUseCaseCommand>({
        defaultValues: {
            data:{
                name: "",
                courseId: props.course.id,
                capacity: 0,
                sectionId: 0,
                schoolYearId: 0
            }
        }
    })
    
    useEffect(()=>{
        setValue("courseId", props.course.id);
    },[props.course.id])

    const handleFormSubmit = async(data: CreateParallelUseCaseCommand) => {
        const result = await createParallelUseCase.execute(data);
        if (result.isLeft()) {
            // Handle success, e.g., show a success message or close the sheet
            const messages = result.extract().map((error) => error.getMessage()).join(", ");
            toast({
                title: "Error al crear el paralelo",
                description: messages || "Ocurrió un error al crear el paralelo.",
                variant: "destructive"
            })
            return;
            
        }
        toast({
            title: "Paralelo creado exitosamente",
            description: `El paralelo ${data.name} ha sido creado para el curso ${props.course.name}.`,
            variant: "success"
        })
    }

    return (
        <SheetCreateParallelPresenter 
         course={props.course}
         onSearchSchoolYear={searchSchoolYear}
         register={ register }
         onSubmit={ handleSubmit(handleFormSubmit) }
         control={control}
         sections={sections}
        />
    )
}