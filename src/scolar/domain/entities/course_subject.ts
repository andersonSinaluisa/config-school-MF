import { Course } from "./course";
import { CourseError } from "./CourseError";
import { Subject } from "./subject";


export class CourseSubject {
    constructor(
        public id: number,
        public courseId: number,
        public subjectId: number,
        public hoursPerWeek: string,
        public isRequired: boolean,
        public course?: Course,
        public subject?: Subject
    ) {
        this.validate();
     }

    validate(): boolean {
        if (this.courseId <= 0) {
            throw  CourseError.COURSE_ID_IS_REQUIRED;
        }
        if (this.subjectId <= 0) {
            throw new Error('Subject ID must be greater than 0');
        }
        if (!this.hoursPerWeek || this.hoursPerWeek.trim() === '') {
            throw new Error('Hours per week is required');
        }
        return true;
    }
}