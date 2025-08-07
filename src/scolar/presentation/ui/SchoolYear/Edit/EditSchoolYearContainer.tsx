;
import { useInjection } from "inversify-react"
import { EditSchoolYearPresenter } from "./EditSchoolYearPresenter"
import { SCHOOL_YEAR_GET_USE_CASE, SCHOOL_YEAR_UPDATE_USE_CASE } from "@/scolar/domain/symbols/SchoolYearSymbol"
import { useCallback, useEffect, useTransition } from "react"
import { GetSchoolYearUseCase, GetSchoolYearUseCaseCommand } from "@/scolar/application/useCases/schoolYears/getSchoolYearUseCase"
import { useForm } from "react-hook-form"
import { UpdateSchoolYearUseCase, UpdateSchoolYearUseCaseCommand } from "@/scolar/application/useCases/schoolYears/updateSchoolYearUseCase"
import { Status } from "@/scolar/domain/entities/Status"
import { toast } from "@/hooks/use-toast"
import { SchoolYear } from "@/scolar/domain/entities/school_year"
import { useNavigate, useParams } from "react-router-dom"


export const EditSchoolYearContainer = ()=>{
    const { id } = useParams<{ id: string }>();
    const getSchoolYearUseCase = useInjection<GetSchoolYearUseCase>(SCHOOL_YEAR_GET_USE_CASE);
    const [isPending,startTransition] = useTransition();
    const [,startTransitionSave] = useTransition();
    const updateSchoolYearUseCase = useInjection<UpdateSchoolYearUseCase>(SCHOOL_YEAR_UPDATE_USE_CASE);
    const {
        control,
        formState: { errors },
        handleSubmit,
        register,
        setValue,
        watch,
    } = useForm<UpdateSchoolYearUseCaseCommand>({
        defaultValues:{
            data: {
                endDate: new Date(),
                id: 0,
                name: "",
                startDate: new Date(),
                status: Status.ACTIVE.label
            }
        }
    })
    const data = watch();
    
  
    const fetchSchoolYear =  useCallback(() => {
        startTransition(()=>{
            if(!id) {
                toast({
                    title: "Error",
                    description: "School year ID is required",
                    variant: "destructive"
                });
                return;
            }
            
            getSchoolYearUseCase.execute(new GetSchoolYearUseCaseCommand(Number(id)))
            .then((result) => {
                if(result.isLeft()){
                    toast({
                        title: "Error",
                        description: result.extract().map(error => error.getMessage()).join(", "),
                        variant: "destructive"
                    })
                    return
                }
                const schoolYear = result.extract() as SchoolYear
                console.log("Fetched school year:", schoolYear);
                setValue("data.id", schoolYear.id);
                setValue("data.name", schoolYear.name);
                setValue("data.startDate", schoolYear.startDate);
                setValue("data.endDate", schoolYear.endDate);
                setValue("data.status", schoolYear.status);
            })
            .catch((error) => {
                console.error("Error fetching school year:", error);
            });
        })
    }, [id, getSchoolYearUseCase, setValue, startTransition]);

    useEffect(() => {
        fetchSchoolYear();
    }, [fetchSchoolYear]);

    const onSubmit = (data: UpdateSchoolYearUseCaseCommand) => {
        startTransitionSave(()=>{
            updateSchoolYearUseCase.execute(data).then((result) => {
                if(result.isLeft()){
                    toast({
                        title: "Error",
                        description: result.extract().map(error => error.getMessage()).join(", "),
                        variant: "destructive"
                    })
                    return
                }
                toast({
                    title: "Success",
                    description: "School year updated successfully",
                    variant: "success"
                })
            }).catch((error) => {
                console.error("Error updating school year:", error);
                toast({
                    title: "Error",
                    description: "Failed to update school year",
                    variant: "destructive"
                })
            })
            
        })
    }
    const navigate = useNavigate();
    const onCancel = ()=>{
        navigate('/periodos-lectivos')
    }

    return (
        <EditSchoolYearPresenter
            control={control}
            errors={errors}
            formData={data}
            isSubmitting={isPending}
            onCancel={onCancel}
            onSubmit={handleSubmit(onSubmit)}
            register={register}
            key={"edit-school-year-container"}
        />
    )
}