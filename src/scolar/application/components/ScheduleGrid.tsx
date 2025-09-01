import { AnimatePresence } from "framer-motion";
import { HEIGHT_X_HOUR, parseMinutes } from "@/lib/time";
import { Section } from "@/scolar/domain/entities/section";
import { SectionBreak } from "@/scolar/domain/entities/sectionBreak";
import { ClassSchedule } from "@/scolar/domain/entities/classSchedule";
import { BreakBlock } from "@/scolar/application/components/BreakBlock";
import { ScheduleBlockItem } from "./ScheduleBlockItem";

interface Props {
    schedules: ClassSchedule[];
    sectionSelected: Section;
    sectionBreaks: SectionBreak[];
    startTime: number;
    endTime: number;
    savedId: number | null;

    onSave: (s: ClassSchedule) => void;
    onSelect: (s: ClassSchedule) => void;
    onDelete: (s: ClassSchedule) => void;
    onDrop: (e: React.DragEvent<HTMLDivElement>, day: string) => void; // 👈 delegado al container
}

export const ScheduleGrid = ({
    schedules,
    sectionSelected,
    sectionBreaks,
    startTime,
    endTime,
    savedId,
    onSave,
    onSelect,
    onDelete,
    onDrop,
}: Props) => {
    return (
        <div className="grid grid-cols-12 col-span-3 gap-4 w-full" id="calendar">
            <div className="col-span-12 rounded-lg border bg-white shadow-sm">
                {/* Header días */}
                <div className="grid grid-cols-5">
                    {sectionSelected?.days.map((day) => (
                        <div
                            key={day}
                            className="border-b text-center h-16 flex items-center justify-center"
                        >
                            <h3 className="text-lg font-semibold text-gray-700">{day}</h3>
                        </div>
                    ))}
                </div>

                {/* Columna horas + días */}
                <div className="grid grid-cols-[auto,1fr]">
                    {/* Horas */}
                    <div className="w-20 border-r">
                        {Array.from({ length: endTime - startTime + 1 }).map((_, i) => (
                            <div
                                key={i}
                                className="flex h-[96px] items-center justify-center border-b"
                            >
                                <span className="text-sm font-medium text-gray-500">
                                    {startTime + i}:00
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Días */}
                    <div className="grid flex-1 grid-cols-5">
                        {sectionSelected?.days.map((day) => (
                            <div
                                key={day}
                                className="relative border-r"
                                style={{
                                    height: (endTime - startTime) * HEIGHT_X_HOUR,
                                }}
                                onDragOver={(e) => e.preventDefault()}
                                onDrop={(e) => onDrop(e, day)} // 👈 delega al container
                            >
                                {/* breaks */}
                                {sectionBreaks
                                    .filter((b) => b.day === day)
                                    .map((b, i) => (
                                        <BreakBlock
                                            key={`${day}-break-${i}`}
                                            startTime={parseMinutes(b.startTime)}
                                            endTime={parseMinutes(b.endTime)}
                                            baseStart={startTime * 60}
                                            heightPerHour={HEIGHT_X_HOUR}
                                        />
                                    ))}

                                {/* bloques */}
                                <AnimatePresence>
                                    {schedules
                                        .filter((s) => s.dayOfWeek === day)
                                        .map((s) => (
                                            <ScheduleBlockItem
                                                key={s.id}
                                                schedule={s}
                                                savedId={savedId}
                                                onSave={onSave}
                                                onSelect={onSelect}
                                                onDelete={onDelete}
                                                section={sectionSelected}
                                            />
                                        ))}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
