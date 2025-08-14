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
