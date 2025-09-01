import { generateVibrantPalette } from "@/lib/utils";
import { CourseSubject } from "@/scolar/domain/entities/course_subject";

export const SubjectItem = ({ s }: { s: CourseSubject }) => {
    const palette = generateVibrantPalette(s.subjectId);
    return (
        <div
            key={s.id}
            className="cursor-grab rounded-md p-3 text-sm font-medium shadow-sm transition-shadow hover:shadow-md"
            style={{ background: palette.lighter2 }}
            draggable
            onDragStart={(e) => {
                e.dataTransfer.setData("subjectId", s.subjectId.toString());
                e.dataTransfer.setData("subjectName", s.subject?.name || "");
                e.dataTransfer.setData("hoursPerWeek", s.hoursPerWeek.toString());
            }}
        >
            <div className="flex items-center justify-between">
                <span>{s.subject?.name}</span>
                <span className="text-xs font-normal" style={{ color: palette.base }}>
                    (0/{s.hoursPerWeek})
                </span>
            </div>
        </div>
    );
};