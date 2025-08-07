import { AbstractFailure } from "@/scolar/domain/failure";


export class SubjectError extends AbstractFailure{
    static readonly SUBJECT_NOT_FOUND = new SubjectError("subject_not_found", "Materia no encontrada",'root');

    static readonly SUBJECT_ALREADY_EXISTS = new SubjectError("subject_already_exists", "Materia ya existe",'root');
    static readonly SUBJECT_INVALID = new SubjectError("subject_invalid", "Materia inválida",'root');

    static readonly SUBJECT_NOT_CREATED = new SubjectError("subject_not_created", "Materia no creada",'root');

    static readonly SUBJECT_NOT_UPDATED = new SubjectError("subject_not_updated", "Materia no actualizada",'root');

    static readonly SUBJECT_NOT_DELETED = new SubjectError("subject_not_deleted", "Materia no eliminada",'root');

    static readonly SUBJECT_NOT_ASSIGNED = new SubjectError("subject_not_assigned", "Materia no asignada",'root');

    static readonly SUBJECT_SERVICE_ERROR = new SubjectError("subject_service_error", "Error en el servicio de materias",'root');
}