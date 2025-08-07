export class GradingTerm {
    constructor(
        public id: number,
        public gradingSystem_id: number,
        public academicYear_id: number,
        public name: string,
        public order: number,
        public weight: string
    ) {}
}
