import { ParallelDto } from "../../infrastructure/dto/ParrallelDto";
import { Parallel } from "../entities/parallel";
import { CourseMapper } from "./CourseMapper";
import { SchoolYearMapper } from "./SchoolYearMapper";
import { SectionMapper } from "./SectionMapper";


export class ParallelMapper {

    static toDomain(data: ParallelDto): Parallel {
        return new Parallel(
            data.id,
            data.name,
            data.course_id,
            data.capacity,
            data.section_id,
            data.school_year_id,
            data.course ? CourseMapper.toDomain(data.course) : undefined,
            data.section ? SectionMapper.partialToDomain(data.section) : undefined,
            data.school_year ? SchoolYearMapper.toDomain(data.school_year) : undefined,
            
        )
    }

    static toDto(data: Parallel): Omit<ParallelDto, 'id'> {
        return {
            name: data.name,
            course_id: data.courseId,
            capacity: data.capacity,
            section_id: data.sectionId,
            school_year_id: data.schoolYearId,
        }
    }
}