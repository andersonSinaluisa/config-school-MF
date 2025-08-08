export class AcademicPlanning {
    constructor(
        public id: number,
        public courseId: number,
        public parallelId: number,
        public schoolYearId: number,
        public subjectId: number,
        public topic: string,
        public startDate: string,
        public endDate: string,
        public description: string,
    ) {}
}
