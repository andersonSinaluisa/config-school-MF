import { generateVibrantPalette } from "@/lib/utils";
import { minutesToPixels, START_HOUR, timeToMinutes } from "@/scolar/presentation/hooks/useSchedulePosition";
import { ClassSchedule } from "@/scolar/domain/entities/classSchedule";
import { Section } from "@/scolar/domain/entities/section";
import { parseHour } from "@/lib/time";

interface Props {
    schedule: ClassSchedule;
    section: Section
}

export const ScheduleBlock = ({ schedule, section }: Props) => {
    
    const startHour = section.startTime ? parseHour(section.startTime) : START_HOUR;

    const startMinutes = timeToMinutes(schedule.startTime) - startHour * 60;
    const endMinutes = timeToMinutes(schedule.endTime) - startHour * 60;
    const top = minutesToPixels(startMinutes);
    const height = minutesToPixels(endMinutes - startMinutes);

    const palette = generateVibrantPalette(schedule.subjectId);

    return (
        <div
         id={schedule.id.toString()}
            className={`absolute left-1 right-1 border-4 rounded-md shadow-sm
                 ${ClassSchedule.isRecommended(schedule) ? "border-dashed" : ""
                }`}
            style={{ top: `${top}px`, 
                    height: `${height}px`, 
                    backgroundColor: palette.lighter1,
                borderColor: ClassSchedule.isRecommended(schedule) ? palette.base : palette.darker1
                }}
        >
            {/* Badge para recomendados */}
            {ClassSchedule.isRecommended(schedule) && (
                <span className="absolute top-1 right-1 rounded bg-blue-600 px-2 py-0.5 text-[10px] font-semibold text-white shadow">
                    Recomendado
                </span>
            )}

            <div className="p-2">
                <p className="font-semibold" style={{ color: palette.foreground }}>
                    {schedule.subject?.name}
                </p>
                <p className="text-sm" style={{ color: palette.darker2 }}>
                    {schedule.startTime} - {schedule.endTime}
                </p>
            </div>
        </div>
    );
};
