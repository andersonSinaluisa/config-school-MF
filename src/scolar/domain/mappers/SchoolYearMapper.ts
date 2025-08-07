import { SchoolYearDto } from "../../infrastructure/dto/SchoolYearDto";
import { SchoolYear } from "../entities/school_year";


export class SchoolYearMapper {

    static toDomain(schoolYear: SchoolYearDto): SchoolYear {
        return new SchoolYear(
            schoolYear.id,
            schoolYear.name,
            new Date(schoolYear.startDate),
            new Date(schoolYear.endDate),
            schoolYear.status
        );
    }

    static toDto(schoolYear: SchoolYear): Omit<SchoolYearDto, 'id'> {
        return {
            name: schoolYear.name,
            // YYYY-MM-DD format for dates
            startDate: schoolYear.startDate.toLocaleDateString('en-CA'), // ISO format YYYY-MM-DD
            endDate: schoolYear.endDate.toLocaleDateString('en-CA'), // ISO format YYYY-MM-DD
            status: schoolYear.status
        };
    }
}