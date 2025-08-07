;
import { useForm } from "react-hook-form"
import { CreateSchoolYearPresenter } from "./CreateSchoolYearPresenter"
import { CreateSchoolYearUseCase, CreateSchoolYearUseCaseCommand } from "@/scolar/application/useCases/schoolYears/createSchoolYearUseCase";
import { useTransition } from "react";
import { useInjection } from "inversify-react";
import { SCHOOL_YEAR_CREATE_USE_CASE } from "@/scolar/domain/symbols/SchoolYearSymbol";
import { toast } from "@/hooks/use-toast";
import { SchoolYear } from "@/scolar/domain/entities/school_year";
import { useNavigate } from "react-router-dom";


export const CreateSchoolYearContainer = () => {

    const [isPending, startTransition] = useTransition();
    const createSchoolYearUseCase = useInjection<CreateSchoolYearUseCase>(SCHOOL_YEAR_CREATE_USE_CASE);
    const {
        control,
        handleSubmit,
        formState: {  errors, },
        register,
        watch,
    } = useForm<CreateSchoolYearUseCaseCommand>({
        defaultValues: {
            data:{
                name: '',
                startDate: new Date(),
                endDate: new Date(),
                status: 'ACTIVE',
            }
        },
    });


    const _data = watch();
   

    const onSubmit = (data: CreateSchoolYearUseCaseCommand) => {
        startTransition( () => {
            
            
            createSchoolYearUseCase.execute(data).then((result) => {
                if (result.isLeft()) {
                    toast({
                        title: "Error",
                        description: result.extract().map(failure => failure.getMessage()).join(", "),
                        variant: "destructive",
                    })
                    return;
                }
                const schoolYear = result.extract() as SchoolYear;
                toast({
                    title: "Success",
                    description: `School Year ${schoolYear?.name} created successfully!`,
                    variant: "success",
                });
                onCancel();
            }).catch((error) => {
                toast({
                    title: "Error",
                    description: error.message || "An error occurred while creating the school year.",
                    variant: "destructive",
                });
            });
            
        });
    }
    const navigate = useNavigate();
    const onCancel = () => {
        navigate('/periodos-lectivos')
    }
    return (
        <CreateSchoolYearPresenter
            control={control}
            errors={errors}
            formData={_data}
            isSubmitting={isPending}
            onCancel={onCancel}
            onSubmit={handleSubmit(onSubmit)}
            register={register}
        />
    )
}