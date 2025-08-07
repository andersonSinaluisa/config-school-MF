
import { LevelCreatePresenter } from "./LevelCreatePresenter"
import { useInjection } from "inversify-react"
import { CreateLevelCommand, CreateLevelUseCase } from "@/scolar/application/useCases/levels/createLevelUseCase"
import { LEVEL_CREATE_USECASE } from "@/scolar/domain/symbols/LevelSymbol"
import { useForm } from "react-hook-form"
import { useEffect, useState, useTransition } from "react"
import { toast } from "@/hooks/use-toast"
import { useNavigate } from "react-router-dom"


export const LevelCreateContainer = () => {

    const [isPending, startTransition] = useTransition()
    const createLevel = useInjection<CreateLevelUseCase>(LEVEL_CREATE_USECASE);
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors , },
    } = useForm<CreateLevelCommand>({
        defaultValues:{
            data: {
                name: "",
                description: "",
                order: 0,
            },
        }
    })
    const [commandCreate, setCommandCreate] = useState<CreateLevelCommand>(()=> 
    new CreateLevelCommand(
       "","",0
    ))

    const { name, description, order } = watch('data')

    useEffect(() => {
        setCommandCreate(new CreateLevelCommand(
            name,
            description,
            order
        ))
    },[name, description, order])

    const onSubmit = async (data:CreateLevelCommand)=>{
        startTransition(async () => {
            const res = await createLevel.execute(data)
            if (res.isLeft()) {
                const fail = res.extract()
                toast({
                    title: "Error",
                    description: fail.map((error) => error.getMessage()).join(", "),
                    duration: 3000,
                    variant: "destructive",
                })
                return
            }

            toast({
                title: "Nivel creado",
                description: "El nivel ha sido creado con éxito",
                duration: 3000,
                variant:'success'
            })
            handleCancel()
        })
    }
    const navigate = useNavigate();
    const handleCancel = () => {
        navigate('/niveles-escolares')
    }

    return (
        <LevelCreatePresenter
            onSubmit={handleSubmit(onSubmit)}
            register={register}
            errors={errors}
            isSubmitting={isPending}
            onCancel={handleCancel}
            formData={commandCreate}
            
        />
    )
}