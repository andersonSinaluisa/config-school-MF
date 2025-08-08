import { AttendanceCodeDto } from "@/scolar/infrastructure/dto/AttendanceCodeDto";
import { AttendanceCode } from "../entities/attendanceCode";

export class AttendanceCodeMapper {
    static toDomain(dto: AttendanceCodeDto): AttendanceCode {
        return new AttendanceCode(dto.id, dto.code, dto.description, dto.affectsGrade);
    }
    static toDto(entity: AttendanceCode): Omit<AttendanceCodeDto, 'id'> {
        return {
            code: entity.code,
            description: entity.description,
            affectsGrade: entity.affectsGrade,
        };
    }
}
