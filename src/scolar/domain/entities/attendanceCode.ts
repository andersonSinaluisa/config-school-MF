export class AttendanceCode {
    constructor(
        public id: number,
        public code: string,
        public description: string,
        public affectsGrade: boolean,
    ) {}
}
