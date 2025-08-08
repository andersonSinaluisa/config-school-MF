import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ClassSchedule } from "@/scolar/domain/entities/classSchedule";
import { Trash2 } from "lucide-react";

interface ScheduleView extends ClassSchedule {
    courseName: string;
    parallelName: string;
    subjectName: string;
}

interface Props {
    schedules: ScheduleView[];
    onAdd: (day?: string) => void;
    onSelect: (s: ScheduleView) => void;
    onDelete: (s: ScheduleView) => void;
}

export const ClassScheduleCalendarPresenter = ({ schedules, onAdd, onSelect, onDelete }: Props) => {
    const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    const startHour = 7;
    const endHour = 20;
    const totalMinutes = (endHour - startHour) * 60;
    const containerHeight = 600; // px
    const colors = [
        "bg-blue-500",
        "bg-green-500",
        "bg-red-500",
        "bg-purple-500",
        "bg-yellow-500",
        "bg-pink-500",
        "bg-teal-500",
        "bg-indigo-500"
    ];

    const timeToMinutes = (time: string) => {
        const [h, m] = time.split(":").map(Number);
        return h * 60 + m;
    };

    const getColor = (id: number) => colors[id % colors.length];

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h1 className="text-xl font-bold">Horarios de Clase</h1>
                <Button onClick={() => onAdd()}>Agregar Clase</Button>
            </div>
            <TooltipProvider>
                <div className="grid grid-cols-6 gap-2">
                    {days.map(day => (
                        <div
                            key={day}
                            className="border rounded-md h-[600px] relative"
                            onClick={() => onAdd(day)}
                        >
                            <div className="text-center font-medium border-b">{day}</div>
                            {schedules.filter(s => s.dayOfWeek === day).map(s => {
                                const top = ((timeToMinutes(s.startTime) - startHour * 60) / totalMinutes) * containerHeight;
                                const height = ((timeToMinutes(s.endTime) - timeToMinutes(s.startTime)) / totalMinutes) * containerHeight;
                                return (
                                    <Tooltip key={s.id}>
                                        <TooltipTrigger asChild>
                                            <div
                                                data-type="block"
                                                onClick={(e) => { e.stopPropagation(); onSelect(s); }}
                                                className={`absolute left-1 right-1 text-white rounded p-1 text-xs overflow-hidden cursor-pointer ${getColor(s.subjectId)}`}
                                                style={{ top: `${top}px`, height: `${height}px` }}
                                            >
                                                <div className="font-semibold">{s.startTime} - {s.endTime}</div>
                                                <div>{s.subjectName}</div>
                                                <div className="text-[10px]">{s.courseName} {s.parallelName}</div>
                                                <button
                                                    className="absolute top-1 right-1 opacity-80 hover:opacity-100"
                                                    onClick={(e) => { e.stopPropagation(); onDelete(s); }}
                                                >
                                                    <Trash2 className="h-3 w-3" />
                                                </button>
                                            </div>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p className="font-semibold">{s.subjectName}</p>
                                            <p>{s.courseName} {s.parallelName}</p>
                                            <p>{s.dayOfWeek}: {s.startTime} - {s.endTime}</p>
                                        </TooltipContent>
                                    </Tooltip>
                                );
                            })}
                        </div>
                    ))}
                </div>
            </TooltipProvider>
        </div>
    );
};

