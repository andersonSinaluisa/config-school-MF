import { AbstractFailure } from "@/scolar/domain/failure";



export class SchoolYearError extends AbstractFailure{
    static readonly SCHOOL_YEAR_NOT_FOUND = new SchoolYearError('SCHOLAR_YEAR_NOT_FOUND', 'School year not found','root');
    static readonly SCHOOL_YEAR_ALREADY_EXISTS = new SchoolYearError('SCHOOL_YEAR_ALREADY_EXISTS', 'School year already exists', 'root');

    static readonly SCHOOL_YEAR_INVALID_DATE = new SchoolYearError('SCHOOL_YEAR_INVALID_DATE', 'School year start date must be before end date', 'root');
    static readonly SCHOOL_YEAR_INVALID_NAME = new SchoolYearError('SCHOOL_YEAR_INVALID_NAME', 'School year name must be at least 3 characters long', 'root');
    static readonly SCHOOL_YEAR_INVALID_ID = new SchoolYearError('SCHOOL_YEAR_INVALID_ID', 'School year id must be a positive integer', 'root');

    static readonly SCHOOL_YEAR_INVALID_STATUS = new SchoolYearError('SCHOOL_YEAR_INVALID_STATUS', 'School year status must be one of the following: active, inactive, archived', 'root');
    static readonly SCHOOL_YEAR_INVALID_START_DATE = new SchoolYearError('SCHOOL_YEAR_INVALID_START_DATE', 'School year start date must be a valid date', 'root');
    static readonly SCHOOL_YEAR_INVALID_END_DATE = new SchoolYearError('SCHOOL_YEAR_INVALID_END_DATE', 'School year end date must be a valid date', 'root');
    static readonly SCHOOL_YEAR_INVALID = new SchoolYearError('SCHOOL_YEAR_INVALID', 'School year is invalid', 'root');
    static readonly SCHOOL_YEAR_NOT_ACTIVE = new SchoolYearError('SCHOOL_YEAR_NOT_ACTIVE', 'School year is not active', 'root');
    static readonly SCHOOL_YEAR_NOT_INACTIVE = new SchoolYearError('SCHOOL_YEAR_NOT_INACTIVE', 'School year is not inactive', 'root');
    

    static readonly SCHOOL_YEAR_ERROR = new SchoolYearError('SCHOOL_YEAR_ERROR', 'An error occurred while processing the school year', 'root');
}