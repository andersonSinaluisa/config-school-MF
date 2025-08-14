
export class Section {
    constructor(
        public id: number,
        public name: string,
        public type: string,
        public description: string = '',
        public startTime: string = '',
        public endTime: string = '',
        public hasBreak: boolean = false,
        public breakCount: number = 0,
        public breakDuration: string = '',
        public days: string[] = []
    ) { }
}