import { Course } from "./course";
import { ParallelError } from "./ParallelError";
import { SchoolYear } from "./school_year";
import { Section } from "./section";


export class Parallel {
     constructor(
          public id: number,
          public name: string,
          public courseId: number,
          public capacity: number,
          public sectionId: number,
          public schoolYearId: number,
          public course?: Course,
          public section?: Section,
          public schoolYear?: SchoolYear
     ) {
          this.validate();
     }


     validate(): boolean {
          if (!this.name || this.name.trim() === '') {
               throw ParallelError.PARALLEL_NAME_IS_REQUIRED;
          }
          if (this.capacity <= 0) {
               throw ParallelError.PARALLEL_CAPACITY_MUST_BE_GREATER_THAN_ZERO;
          }
          if (this.courseId <= 0) {
               throw ParallelError.PARALLEL_COURSE_ID_MUST_BE_GREATER_THAN_ZERO;
          }
          if (this.sectionId <= 0) {
               throw ParallelError.PARALLEL_SECTION_ID_MUST_BE_GREATER_THAN_ZERO;
          }
          if (this.schoolYearId <= 0) {
               throw ParallelError.PARALLEL_SCHOOL_YEAR_ID_MUST_BE_GREATER_THAN_ZERO;
          }
          return true;
     }


}