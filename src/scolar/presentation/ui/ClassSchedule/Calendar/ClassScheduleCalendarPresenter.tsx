import { Button } from "@/components/ui/button";
import { Copy, DownloadCloud, RefreshCw } from "lucide-react";
import { ClassSchedule } from "@/scolar/domain/entities/classSchedule";
import { Course } from "@/scolar/domain/entities/course";
import { CourseSubject } from "@/scolar/domain/entities/course_subject";
import { Parallel } from "@/scolar/domain/entities/parallel";
import { SchoolYear } from "@/scolar/domain/entities/school_year";
import { Section } from "@/scolar/domain/entities/section";
import { SectionBreak } from "@/scolar/domain/entities/sectionBreak";
import { parseHour } from "@/lib/time";
import { ScheduleFilters } from "@/scolar/application/components/ScheduleFilters";
import { ScheduleGrid } from "@/scolar/application/components/ScheduleGrid";
import { ScheduleSidebar } from "@/scolar/application/components/ScheduleSidebar";


interface Props {
    schedules: ClassSchedule[];
    onSelect: (s: ClassSchedule) => void;
    onDelete: (s: ClassSchedule) => void;
    onSearchCourse: (input: string) => void;
    onSearchParallel: (input: string) => void;
    onSearchSubject: (input: string) => void;

    year: SchoolYear[];
    course: Course[];
    parallel: Parallel[];
    subject: CourseSubject[];

    selectedCourseId: number | null;
    selectedParallelId: number | null;
    selectedSubjectId: number | null;

    setSelectedCourseId: (id: number) => void;
    setSelectedParallelId: (id: number) => void;
    setSelectedSubjectId: (id: number) => void;
    onPrint: () => void;
    onGenerate: () => void;
    onSave: (updatedSchedule: ClassSchedule) => void;
    sectionSelected?: Section;
    sectionBreaks: SectionBreak[];
    savedId: number | null;
    onDrop: (e: React.DragEvent<HTMLDivElement>, day: string) => void
}

// ---- Main container ----
export const ClassScheduleCalendarPresenter = ({
    schedules,
    onSelect,
    onDelete,
    onSearchCourse,
    onSearchParallel,
    onSearchSubject,
    course,
    parallel,
    subject,
    selectedCourseId,
    selectedParallelId,
    selectedSubjectId,
    setSelectedCourseId,
    setSelectedParallelId,
    setSelectedSubjectId,
    onGenerate,
    onSave,
    onPrint,
    sectionSelected,
    sectionBreaks,
    savedId,
    onDrop
}: Props) => {
    const startTime = sectionSelected?.startTime
        ? parseHour(sectionSelected.startTime)
        : 8;
    const endTime = sectionSelected?.endTime
        ? parseHour(sectionSelected.endTime)
        : 15;


    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center"> <div> <h2 className="text-2xl font-bold flex items-center gap-2">Horarios de Clase</h2> <p className="text-muted-foreground text-sm">Visualiza y administra los horarios asignados por día.</p> </div> </div>
            {/* Filters */}
            <ScheduleFilters
                course={course}
                parallel={parallel}
                subject={subject}
                selectedCourseId={selectedCourseId}
                selectedParallelId={selectedParallelId}
                selectedSubjectId={selectedSubjectId}
                onSearchCourse={onSearchCourse}
                onSearchParallel={onSearchParallel}
                onSearchSubject={onSearchSubject}
                setSelectedCourseId={setSelectedCourseId}
                setSelectedParallelId={setSelectedParallelId}
                setSelectedSubjectId={setSelectedSubjectId}
            />
            <div className="flex items-center gap-2">               
                <Button onClick={onGenerate}>
                    <RefreshCw className="mr-2 h-4 w-4 " />
                    Generar Automáticamente
                </Button>
                <Button variant={"link"} onClick={onPrint}>
                    <DownloadCloud className="mr-2 h-4 w-4" />
                    Exportar/Imprimir PDF
                </Button>
                <Button variant={"link"}>
                    <Copy className="mr-2 h-4 w-4" />
                    Duplicar Horario
                </Button>
            </div>

            {/* Layout: sidebar + grid */}
            <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-4">
                {/* Sidebar */}
                <ScheduleSidebar subject={subject} />

                {/* Grid */}
                {sectionSelected && (
                    <ScheduleGrid
                        schedules={schedules}
                        sectionSelected={sectionSelected}
                        sectionBreaks={sectionBreaks}
                        startTime={startTime}
                        endTime={endTime}
                        savedId={savedId}
                        onSave={onSave}
                        onSelect={onSelect}
                        onDelete={onDelete}
                        onDrop={onDrop}

                    />
                )}
            </div>
        </div>
    );
};
