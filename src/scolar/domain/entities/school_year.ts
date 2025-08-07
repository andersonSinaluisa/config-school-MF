
export class SchoolYear {
    constructor(
        public id: number,
        public name: string,
        public startDate: Date,
        public endDate: Date,
        public status: string = ''
    ) { }
}