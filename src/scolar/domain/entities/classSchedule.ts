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
    ) {}
}
