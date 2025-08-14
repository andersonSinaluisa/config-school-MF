import { useInjection } from "inversify-react"
import { EditLevelPresenter } from "./EditLevelPresenter"
import { GetLevelCommand, GetLevelUseCase } from "@/scolar/application/useCases/levels/getLevelUseCase"
import { LEVEL_GET_USECASE, LEVEL_UPDATE_USECASE } from "@/scolar/domain/symbols/LevelSymbol"
import { startTransition, useCallback, useEffect } from "react"
import { toast } from "@/hooks/use-toast"
import { useForm } from "react-hook-form"
import { EditLevelCommand, EditLevelUseCase } from "@/scolar/application/useCases/levels/editLevelUseCase"
import { Level } from "@/scolar/domain/entities/level"
import { useNavigate, useParams } from "react-router-dom"



export const EditLevelContainer = () => {

    const { id } = useParams<{ id: string }>();
    const getLevelUseCase = useInjection<GetLevelUseCase>(LEVEL_GET_USECASE);
    const updateLevelUseCase = useInjection<EditLevelUseCase>(LEVEL_UPDATE_USECASE);
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,

    } = useForm<EditLevelCommand>({
        defaultValues: {
            data: {
                description: "",
                id: 0,
                name: "",
            }
        }
    })
    const data = watch();

    const handleGetLevel = useCallback(() => {
        startTransition(() => {
            getLevelUseCase.execute(
                new GetLevelCommand(Number(id))
            ).then(level => {
                    if (level.isLeft()) {
                        toast({
                            title: "Error",
                            description: "Nivel no encontrado",
                            variant: "destructive"
                        })
                        return;
                    }

                    const levelData = level.extract() as Level;
                    setValue("data.id", levelData.id)
                    setValue("data.name", levelData.name)
                    setValue("data.description", levelData.description)
                    setValue("data.order", levelData.order)
                })
        })
    }, [getLevelUseCase, id])

    useEffect(() => {
        handleGetLevel();
    }, [handleGetLevel])



    const onSubmit = ()=>{
        startTransition(() => {
            updateLevelUseCase.execute(
                new EditLevelCommand(
                    data.data.id,
                    data.data.name,
                    data.data.description,
                    data.data.order
                )
            ).then(result => {
                if (result.isLeft()) {
                    toast({
                        title: "Error",
                        description: "No se pudo actualizar el nivel",
                        variant: "destructive"
                    })
                    return;
                }
                toast({
                    title: "Éxito",
                    description: "Nivel actualizado correctamente",
                })
                onCancel()
            })
        })
    }
    const navigate = useNavigate();

    const onCancel = () => {
        navigate('/niveles-escolares')
    }

    return (
        <EditLevelPresenter
            errors={errors}
            formData={data}
            isSubmitting={false}
            onCancel={ onCancel }
            onSubmit={ handleSubmit(onSubmit) }
            register={ register }
        />
    )
}