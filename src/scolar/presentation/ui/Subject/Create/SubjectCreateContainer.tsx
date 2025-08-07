
import { useInjection } from "inversify-react"
import { SubjectCreatePresenter } from "./SubjectCreatePresenter"
import { CreateSubjectCommand, CreateSubjectUseCase } from "@/scolar/application/useCases/subjects/createSubjectUseCase"
import { SUBJECT_CREATE_USE_CASE } from "@/scolar/domain/symbols/SubjectSymbol"
import { useForm } from "react-hook-form"
import { toast } from "@/hooks/use-toast"
import { useTransition } from "react"
import { useNavigate } from "react-router-dom"



export const SubjectCreateContainer = () => {
    const subjectCreate = useInjection<CreateSubjectUseCase>(SUBJECT_CREATE_USE_CASE);
    const [isPending, startTransition] = useTransition();
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm<CreateSubjectCommand>({
        defaultValues:{
            data:{
                code: "",
                description: "",
                hoursPerWeek: 1,
                id: 0,
                name: "",
            }
        }
    })
    const formstate = watch();
    const onSubmit = async (data: CreateSubjectCommand) => {
       
        startTransition(async() => {
            const res = await subjectCreate.execute(new CreateSubjectCommand(data.data));
            if (res.isLeft()) {
                console.log("Error creating subject", res);
                return;
            }

            toast({
                title: "Materia Creada",
                description: `Materia ${data.data.name} creada correctamente`,
                variant: "success",
            })
            
        })
        
    }
    const navigate = useNavigate();
    const onCancel = () => {
        navigate('/materias')
    }
    return (
        <SubjectCreatePresenter
            formData={formstate}
            errors={errors}
            isSubmitting={isPending}
            onCancel={onCancel}
            onSubmit={handleSubmit(onSubmit)}
            register={register}

        />
    )

}