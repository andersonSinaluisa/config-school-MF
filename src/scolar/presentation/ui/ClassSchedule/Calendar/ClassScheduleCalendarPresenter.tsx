import { Button } from "@/components/ui/button";
import { ClassSchedule } from "@/scolar/domain/entities/classSchedule";

interface Props {
    schedules: ClassSchedule[];
    onAdd: (day?: string) => void;
    onSelect: (s: ClassSchedule) => void;
}

export const ClassScheduleCalendarPresenter = ({ schedules, onAdd, onSelect }: Props) => {
    const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    const startHour = 7;
    const endHour = 20;
    const totalMinutes = (endHour - startHour) * 60;
    const containerHeight = 600; // px

    const timeToMinutes = (time: string) => {
        const [h, m] = time.split(":").map(Number);
        return h * 60 + m;
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h1 className="text-xl font-bold">Horarios de Clase</h1>
                <Button onClick={() => onAdd()}>Agregar Clase</Button>
            </div>
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
                                <div
                                    key={s.id}
                                    data-type="block"
                                    onClick={(e) => { e.stopPropagation(); onSelect(s); }}
                                    className="absolute left-1 right-1 bg-blue-500 text-white rounded p-1 text-xs overflow-hidden cursor-pointer"
                                    style={{ top: `${top}px`, height: `${height}px` }}
                                >
                                    <div>{s.startTime} - {s.endTime}</div>
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
};

