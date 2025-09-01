import { ClassSchedule } from "../entities/classSchedule";

export interface IPdfService {
    generateSchedulePdf(
        schedules: ClassSchedule[],
        courseName: string,
        parallelName: string,
        schoolYear: string
    ): void;
}
