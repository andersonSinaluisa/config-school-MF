import { AbstractFailure } from "@/scolar/domain/failure";

export class CourseError extends AbstractFailure {

    static COURSE_SERVICE_ERROR = new CourseError('CourseServiceError', 'Course service error', 'root')

    static COURSE_NOT_FOUND = new CourseError('CourseNotFound', 'Course not found', 'root')


    static COURSE_ALREADY_EXISTS = new CourseError('CourseAlreadyExists', 'Course already exists', 'root')
    static COOURSE_NAME_IS_REQUIRED = new CourseError('CourseNameIsRequired', 'Course name is required', 'name')
    static COURSE_DESCRIPTION_IS_REQUIRED = new CourseError('CourseDescriptionIsRequired', 'Course description is required', 'description')
    static COURSE_LEVEL_ID_IS_REQUIRED = new CourseError('CourseLevelIdIsRequired', 'Course level id is required', 'level_id')
    static COURSE_ID_IS_REQUIRED = new CourseError('CourseIdIsRequired', 'Course id is required', 'courseId')
    static COURSE_ID_MUST_BE_GREATER_THAN_ZERO = new CourseError('CourseIdMustBeGreaterThanZero', 'Course id must be greater than zero', 'courseId')
    static COURSE_NAME_MUST_BE_UNIQUE = new CourseError('CourseNameMustBeUnique', 'Course name must be unique', 'name')


}