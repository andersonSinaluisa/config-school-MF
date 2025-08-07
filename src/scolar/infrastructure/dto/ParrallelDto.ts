import { CourseDto } from "./CourseDto";
import { SchoolYearDto } from "./SchoolYearDto";
import { SectionDto } from "./SectionDto";

    
export interface ParallelDto {
    id: number;
    name: string;
    course_id: number;
    capacity: number;
    section_id: number;
    school_year_id: number;
    course?: CourseDto;
    section?: SectionDto;
    school_year?: SchoolYearDto
}