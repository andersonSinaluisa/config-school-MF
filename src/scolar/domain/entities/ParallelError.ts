import { AbstractFailure } from "@/scolar/domain/failure";


export class ParallelError extends AbstractFailure {
    

    static PARALLEL_NOT_FOUND = new ParallelError("Parallel not found", "PARALLEL_NOT_FOUND",   "root");

    static PARALLEL_SERVICE_ERROR = new ParallelError("PARALLEL_SERVICE_ERROR", "PARALLEL_SERVICE_ERROR", "root");

    static PARALLEL_ALREADY_EXISTS = new ParallelError("Parallel already exists", "PARALLEL_ALREADY_EXISTS", "root");
    static PARALLEL_NAME_IS_REQUIRED = new ParallelError("Parallel name is required", "PARALLEL_NAME_IS_REQUIRED", "name");
    static PARALLEL_CAPACITY_MUST_BE_GREATER_THAN_ZERO = new ParallelError("Parallel capacity must be greater than 0", "PARALLEL_CAPACITY_MUST_BE_GREATER_THAN_ZERO", "capacity");
    static PARALLEL_COURSE_ID_MUST_BE_GREATER_THAN_ZERO = new ParallelError("Parallel course id must be greater than 0", "PARALLEL_COURSE_ID_MUST_BE_GREATER_THAN_ZERO", "courseId");

    static PARALLEL_SECTION_ID_MUST_BE_GREATER_THAN_ZERO = new ParallelError("Parallel section id must be greater than 0", "PARALLEL_SECTION_ID_MUST_BE_GREATER_THAN_ZERO", "sectionId");
    static PARALLEL_SCHOOL_YEAR_ID_MUST_BE_GREATER_THAN_ZERO = new ParallelError("Parallel school year id must be greater than 0", "PARALLEL_SCHOOL_YEAR_ID_MUST_BE_GREATER_THAN_ZERO", "schoolYearId");
    static PARALLEL_NAME_MUST_BE_UNIQUE = new ParallelError("Parallel name must be unique", "PARALLEL_NAME_MUST_BE_UNIQUE", "name");
    
}