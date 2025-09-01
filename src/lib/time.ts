import { ClassSchedule } from "@/scolar/domain/entities/classSchedule";

export const PER_PAGE = 100;
export const DAYS = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"] as const;

export const toMinutes = (hhmm: string) => {
    // "08:30" -> 510
    const [h, m] = hhmm.split(":").map(Number);
    return h * 60 + m;
};

export type ScheduleView = ClassSchedule & {
    courseName: string;
    parallelName: string;
    subjectName: string;
};

export const formatTime = (minutes: number) =>
    `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`;

export function parseHour(timeStr: string): number {
    // "14:00:00" → 14
    return parseInt(timeStr.split(":")[0], 10);
}

export function parseMinutes(timeStr: string): number {
    // "14:30:00" → 14*60 + 30 = 870
    const [h, m] = timeStr.split(":").map(Number);
    return h * 60 + m;
}

export const  HEIGHT_X_HOUR = 101;