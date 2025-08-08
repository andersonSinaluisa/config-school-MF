export interface ClassScheduleDto {
    id: number;
    course_id: number;
    parallel_id: number;
    school_year_id: number;
    subject_id: number;
    day_of_week: string;
    start_time: string;
    end_time: string;
}
