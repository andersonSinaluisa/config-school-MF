import { toast } from "@/hooks/use-toast"
import { useInjection } from "inversify-react"
import { DeleteLevelPresenter } from "./DeleteLevelPresenter"
import { Level } from "@/scolar/domain/entities/level"
import { DeleteLevelCommand, DeleteLevelUseCase } from "@/scolar/application/useCases/levels/deleteLevelUseCase"
import { LEVEL_DELETE_USECASE } from "@/scolar/domain/symbols/LevelSymbol"

interface DeleteAppContainer {
    level: Level
    onConfirm: () => void
}
export const DeleteLevelContainer = (props: DeleteAppContainer) => {
    const deleteLevel = useInjection<DeleteLevelUseCase>(LEVEL_DELETE_USECASE)
    const onDeleteApp = async () => {
        const res = await deleteLevel.execute(new DeleteLevelCommand(props.level.id))
        if (res.isRight()) {
            props.onConfirm()
            toast({
                title: "Nivel escolar eliminado",
                description: "El nivel escolar ha sido eliminado correctamente",
                duration: 2000,
                variant: "success"
            })
            return;
        } else {
            toast({
                title: "Error eliminando el nivel escolar",
                description: "No se ha podido eliminar el nivel escolar, por favor intente más tarde",
                duration: 2000,
                variant: "destructive"
            })
        }

    }
    return (
        <DeleteLevelPresenter
            level={props.level}
            onConfirm={onDeleteApp}
        />
    )
}