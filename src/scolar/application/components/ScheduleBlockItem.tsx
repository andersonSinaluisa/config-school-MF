import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuSeparator, ContextMenuTrigger } from "@/components/ui/context-menu";
import { ClassSchedule } from "@/scolar/domain/entities/classSchedule";
import { Section } from "@/scolar/domain/entities/section";
import { motion } from "framer-motion";
import { ScheduleBlock } from "./ScheduleBlock";
import { Pencil, PlusCircle, Trash2 } from "lucide-react";

export const ScheduleBlockItem = ({
    schedule,
    savedId,
    onSave,
    onSelect,
    onDelete,
    section
}: {
    schedule: ClassSchedule;
    savedId: number | null;
    onSave: (s: ClassSchedule) => void;
    onSelect: (s: ClassSchedule) => void;
    onDelete: (s: ClassSchedule) => void;
    section: Section;
}) => (
    <motion.div
        key={schedule.id}
        draggable
        onDragStartCapture={(e: React.DragEvent<HTMLDivElement>) => {
            e.dataTransfer.setData("application/json", JSON.stringify(schedule));
        }}
        animate={
            savedId === schedule.id
                ? { boxShadow: ["0 0 0px rgba(255,215,0,0)", "0 0 20px rgba(255,215,0,0.9)", "0 0 0px rgba(255,215,0,0)"] }
                : { opacity: 1, y: 0, scale: 1 }
        }
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        exit={{ opacity: 0, y: -20, scale: 0.95 }}
        transition={{ duration: 0.3 }}
    >
        <ContextMenu>
            <ContextMenuTrigger>
                <ScheduleBlock schedule={schedule} section={section} />
            </ContextMenuTrigger>
            <ContextMenuContent className="w-40 rounded-md border bg-popover p-1 shadow-md">
                {ClassSchedule.isRecommended(schedule) ? (
                    <ContextMenuItem onClick={() => onSave(schedule)}>
                        <PlusCircle className="h-4 w-4" /> Crear
                    </ContextMenuItem>
                ) : (
                    <>
                        <ContextMenuItem onClick={() => onSelect(schedule)}>
                            <Pencil className="h-4 w-4 text-muted-foreground" /> Editar
                        </ContextMenuItem>
                        <ContextMenuSeparator />
                        <ContextMenuItem
                            onClick={() => onDelete(schedule)}
                            className="text-red-600"
                        >
                            <Trash2 className="h-4 w-4" /> Eliminar
                        </ContextMenuItem>
                    </>
                )}
            </ContextMenuContent>
        </ContextMenu>
    </motion.div>
);
