import { SubjectDto } from "../../infrastructure/dto/SubjectDto";
import { Subject } from "../entities/subject";


export class SubjectMapper {

    static toDomain(subject: SubjectDto): Subject {
        return new Subject(
            subject.id,
            subject.name,
            subject.code,
            subject.description,
            subject.hoursPerWeek
        );
    }

    static toDto(subject: Subject): Omit<SubjectDto, 'id'> {
        return {
            name: subject.name,
            code: subject.code,
            description: subject.description,
            hoursPerWeek: subject.hoursPerWeek
        };
    }
}