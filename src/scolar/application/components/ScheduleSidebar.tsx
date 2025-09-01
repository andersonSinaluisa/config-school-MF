import { SubjectItem } from "@/scolar/application/components/SubjectItem";
import { CourseSubject } from "@/scolar/domain/entities/course_subject";

interface Props {
    subject: CourseSubject[];
}

export const ScheduleSidebar = ({ subject }: Props) => {
    return (
        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm lg:col-span-1">
            <h3 className="text-lg font-medium text-gray-900">Materias</h3>
            <p className="mt-1 text-sm text-gray-500">
                Arrastra las materias a la tabla de horarios.
            </p>

            <div className="mt-4 space-y-4">
                {subject.map((s) => (
                    <div
                        key={s.id}
                        draggable
                        onDragStart={(e: React.DragEvent<HTMLDivElement>) => {
                            e.dataTransfer.setData(
                                "application/json",
                                JSON.stringify({
                                    subjectId: s.subject?.id,
                                    subjectName: s.subject?.name,
                                })
                            );
                        }}
                    >
                        <SubjectItem s={s} />
                    </div>
                ))}
            </div>
        </div>
    );
};
