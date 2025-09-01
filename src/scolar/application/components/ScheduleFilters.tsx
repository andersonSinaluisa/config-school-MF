import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { SearchSelect } from "@/components/ui/search-select";
import { Course } from "@/scolar/domain/entities/course";
import { CourseSubject } from "@/scolar/domain/entities/course_subject";
import { Parallel } from "@/scolar/domain/entities/parallel";

// ScheduleFilters.tsx
interface ScheduleFiltersProps {
    course: Course[];
    parallel: Parallel[];
    subject: CourseSubject[];
    selectedCourseId: number | null;
    selectedParallelId: number | null;
    selectedSubjectId: number | null;
    onSearchCourse: (input: string) => void;
    onSearchParallel: (input: string) => void;
    onSearchSubject: (input: string) => void;
    setSelectedCourseId: (id: number) => void;
    setSelectedParallelId: (id: number) => void;
    setSelectedSubjectId: (id: number) => void;
}

export const ScheduleFilters = ({
    course,
    parallel,
    subject,
    selectedCourseId,
    selectedParallelId,
    selectedSubjectId,
    onSearchCourse,
    onSearchParallel,
    onSearchSubject,
    setSelectedCourseId,
    setSelectedParallelId,
    setSelectedSubjectId
}: ScheduleFiltersProps) => (
    <Card className="p-4 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Curso */}
            <div>
                <Label>Curso</Label>
                <SearchSelect
                    options={course.map(c => ({ label: c.name, value: c.id.toString() }))}
                    placeholder="Buscar curso"
                    onInputChange={onSearchCourse}
                    onChange={(v) => setSelectedCourseId(Number(v))}
                    value={selectedCourseId?.toString() || ""}
                />
            </div>
            {/* Paralelo */}
            <div>
                <Label>Paralelo</Label>
                <SearchSelect
                    options={parallel.map(p => ({ label: `${p.name} ${p.course?.name}`, value: p.id.toString() }))}
                    placeholder="Buscar paralelo"
                    onInputChange={onSearchParallel}
                    onChange={(v) => setSelectedParallelId(Number(v))}
                    value={selectedParallelId?.toString() || ""}
                />
            </div>
            {/* Asignatura */}
            <div>
                <Label>Asignatura</Label>
                <SearchSelect
                    options={subject.map(s => ({
                        label: `${s.subject?.name} ${s.hoursPerWeek}`,
                        value: s.subject?.id.toString() || "0",
                    }))}
                    placeholder="Buscar asignatura"
                    onInputChange={onSearchSubject}
                    onChange={(v) => setSelectedSubjectId(Number(v))}
                    value={selectedSubjectId?.toString() || ""}
                />
            </div>
        </div>
    </Card>
);
