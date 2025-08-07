import { Level } from "./level";


export class Course {
    constructor(
        public id: number,
        public name: string,
        public level_id: number,
        public description: string,
        public level?: Level
    ) { 
        
    }

    /*private validate(): boolean {
        if (!this.name || this.name.trim() === '') {
            throw CourseError.COOURSE_NAME_IS_REQUIRED
        }
        if (this.level_id <= 0) {
            throw CourseError.COURSE_LEVEL_ID_IS_REQUIRED;
        }
        if (!this.description || this.description.trim() === '') {
            throw CourseError.COURSE_DESCRIPTION_IS_REQUIRED;
        }
        return true;
    }*/
}