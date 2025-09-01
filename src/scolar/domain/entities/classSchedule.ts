import { Course } from "./course";
import { SchoolYear } from "./school_year";
import { Subject } from "./subject";

export class ClassSchedule {
    constructor(
        public id: number,
        public courseId: number,
        public parallelId: number,
        public schoolYearId: number,
        public subjectId: number,
        public dayOfWeek: string,
        public startTime: string,
        public endTime: string,
        public course?:Course,
        public subject?:Subject,
        public schoolYear?: SchoolYear
    ) {}

    static isRecommended(schedule: ClassSchedule): boolean {
        return schedule.id === 0;
    }
}
