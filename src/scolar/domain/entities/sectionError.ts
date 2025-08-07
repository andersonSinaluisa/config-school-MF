import { AbstractFailure } from "@/scolar/domain/failure";

export class SectionError extends AbstractFailure{
    static readonly SECTION_NOT_FOUND = new SectionError("section_not_found", "Section not found",'root');

    static readonly SECTION_SERVICE_ERROR = new SectionError("section_service_error", "Section service error",'root');
    static readonly SECTION_ALREADY_EXISTS = new SectionError("section_already_exists", "Section already exists",'root');

    static readonly SECTION_NOT_DELETED = new SectionError("section_not_deleted", "Section not deleted",'root');

    static readonly SECTION_NOT_UPDATED = new SectionError("section_not_updated", "Section not updated",'root');

    static readonly SECTION_NOT_CREATED = new SectionError("section_not_created", "Section not created",'root');

    static readonly SECTION_NOT_ACTIVATED = new SectionError("section_not_activated", "Section not activated",'root');
}