
export interface SectionDto {

    id: number;
    name: string;
    type: string;
    description: string;
    start_time: string;
    end_time: string;
    has_break: boolean;
    break_count: number;
    break_duration: string;
    days: string;
    class_duration: string;
}