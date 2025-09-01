import { CourseDto } from "./CourseDto";
import { SchoolYearDto } from "./SchoolYearDto";
import { SubjectDto } from "./SubjectDto";

export interface ClassScheduleDto {
    id: number;
    course_id: number;
    parallel_id: number;
    school_year_id: number;
    subject_id: number;
    day_of_week: string;
    start_time: string;
    end_time: string;
    course?: CourseDto;
    subject?: SubjectDto;
    school_year?: SchoolYearDto;
}
