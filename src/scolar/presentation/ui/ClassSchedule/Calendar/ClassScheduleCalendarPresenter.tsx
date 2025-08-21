import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { SearchSelect } from "@/components/ui/search-select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { generateConsistentHexColor } from "@/lib/utils";
import { ClassSchedule } from "@/scolar/domain/entities/classSchedule";
import { Course } from "@/scolar/domain/entities/course";
import { CourseSubject } from "@/scolar/domain/entities/course_subject";
import { Parallel } from "@/scolar/domain/entities/parallel";
import { SchoolYear } from "@/scolar/domain/entities/school_year";
import { Section } from "@/scolar/domain/entities/section";
import { Calendar, Plus, Trash2 } from "lucide-react";

interface ScheduleView extends ClassSchedule {
    courseName: string;
    parallelName: string;
    subjectName: string;
}

interface Props {
    schedules: ScheduleView[];
    onAdd: (day?: string) => void;
    onSelect: (s: ScheduleView) => void;
    onDelete: (s: ScheduleView) => void;
    onSearchYear: (input: string) => void;
    onSearchCourse: (input: string) => void;
    onSearchParallel: (input: string) => void;
    onSearchSubject: (input: string) => void;

    year: SchoolYear[];
    course: Course[];
    parallel: Parallel[];
    subject: CourseSubject[];
    section: Section[]

    selectedYearId: number | null;
    selectedCourseId: number | null;
    selectedParallelId: number | null;
    selectedSubjectId: number | null;
    selectedSectionId: number | null;

    setSelectedYearId: (id: number ) => void;
    setSelectedCourseId: (id: number ) => void;
    setSelectedParallelId: (id: number ) => void;
    setSelectedSubjectId: (id: number ) => void;
    setSelectedSectionId: (id: number ) => void;

    days: string[]
}

export const ClassScheduleCalendarPresenter = ({
    schedules,
    onAdd,
    onSelect,
    onDelete,
    onSearchYear,
    onSearchCourse,
    onSearchParallel,
    onSearchSubject,
    year,
    course,
    parallel,
    subject,
    section,
    selectedYearId,
    selectedCourseId,
    selectedParallelId,
    selectedSubjectId,
    selectedSectionId,
    setSelectedYearId,
    setSelectedCourseId,
    setSelectedParallelId,
    setSelectedSubjectId,
    setSelectedSectionId,
    days
}: Props) => {
    const startHour = 6;
    const endHour = 20;
    const totalMinutes = (endHour - startHour) * 60;
    const containerHeight = 600;


    const timeToMinutes = (time: string) => {
        const [h, m] = time.split(":").map(Number);
        return h * 60 + m;
    };


    const grid = {
        1: 'grid-cols-1',
        2: 'grid-cols-2',
        3: 'grid-cols-3',
        4: 'grid-cols-4',
        5: 'grid-cols-5',
        6: 'grid-cols-6',
        7: 'grid-cols-7'
    }

    return (
        <div className="space-y-6">
            <Card className="p-4 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                        <Label>Año escolar</Label>
                        <SearchSelect
                            options={year.map((y) => ({ label: y.name, value: y.id.toString() }))}
                            placeholder="Buscar año escolar"
                            onInputChange={onSearchYear}
                            onChange={(v) => setSelectedYearId(Number(v))}
                            value={selectedYearId?.toString() || ""}
                        />
                    </div>
                    <div>
                        <Label>Jornada</Label>
                        <SearchSelect
                            options={section.map((c) => ({ label: c.name, value: c.id.toString() }))}
                            placeholder="Buscar Jornada"
                            onChange={(v) => setSelectedSectionId(Number(v))}
                            value={selectedSectionId?.toString() || ""}

                        />
                    </div>
                    <div>
                        <Label>Curso</Label>
                        <SearchSelect
                            options={course.map((c) => ({ label: c.name, value: c.id.toString() }))}
                            placeholder="Buscar curso"
                            onInputChange={onSearchCourse}
                            onChange={(v) => setSelectedCourseId(Number(v))}
                            value={selectedCourseId?.toString() || ""}

                        />
                    </div>
                    <div>
                        <Label>Paralelo</Label>
                        <SearchSelect
                            options={parallel.map((p) => ({ label: p.name + " " + p.course?.name, value: p.id.toString() }))}
                            placeholder="Buscar paralelo"
                            onInputChange={onSearchParallel}
                            onChange={(v) => setSelectedParallelId(Number(v))}
                            value={selectedParallelId?.toString() || ""}

                        />
                    </div>
                    <div>
                        <Label>Asignatura</Label>
                        <SearchSelect
                            options={subject.map((s) => 
                                ({ label: s.subject?.name+" "+s.hoursPerWeek, 
                                    value: s.subject?.id.toString()||"0" 
                                }))}
                            placeholder="Buscar asignatura"
                            onInputChange={onSearchSubject}
                            onChange={(v) => setSelectedSubjectId(Number(v))}
                            value={selectedSubjectId?.toString() || ""}

                        />
                    </div>
                </div>
            </Card>

            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-primary" /> Horarios de Clase
                    </h2>
                    <p className="text-muted-foreground text-sm">
                        Visualiza y administra los horarios asignados por día.
                    </p>
                </div>
                <Button onClick={() => onAdd()}>
                    <Plus className="w-4 h-4 mr-2" /> Agregar Clase
                </Button>
            </div>

            <TooltipProvider>
                <div className="overflow-x-auto">
                    <div className={"min-w-[900px] grid  gap-2 text-sm " + ` ${grid[days.length as keyof typeof grid]}`}>
                        {days.map((day) => (
                            <div
                                key={day}
                                className="border rounded-md relative bg-muted h-[600px]"
                                onClick={() => onAdd(day)}
                            >
                                <div className="sticky top-0 bg-background border-b py-1 text-center font-semibold z-10">
                                    {day}
                                </div>

                                <div className="absolute inset-0">
                                    {/* marcas horarias */}
                                    {Array.from({ length: endHour - startHour }).map((_, i) => (
                                        <div
                                            key={i}
                                            className="absolute left-0 right-0 border-t border-dashed text-xs text-muted-foreground"
                                            style={{ top: `${(i * containerHeight) / (endHour - startHour)}px` }}
                                        >
                                            <span className="pl-1">{startHour + i}:00</span>
                                        </div>
                                    ))}

                                    {/* clases */}
                                    {schedules.filter((s) => s.dayOfWeek === day).map((s) => {
                                        const top = ((timeToMinutes(s.startTime) - startHour * 60) / totalMinutes) * containerHeight;
                                        const height = ((timeToMinutes(s.endTime) - timeToMinutes(s.startTime)) / totalMinutes) * containerHeight;
                                        return (
                                            <Tooltip key={s.id}>
                                                <TooltipTrigger asChild>
                                                    <div
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            onSelect(s);
                                                        }}
                                                        className={`absolute left-1 right-1 text-white rounded-md shadow-sm px-2 py-1 text-xs cursor-pointer`}
                                                        style={{ top: `${top}px`, height: `${height}px`, background: generateConsistentHexColor(s.parallelId) }}
                                                    >
                                                        <div className="font-bold">{s.subjectName}</div>
                                                        <div className="text-[10px]">{s.startTime} - {s.endTime}</div>
                                                        <div className="text-[10px]">{s.courseName} {s.parallelName}</div>
                                                        <button
                                                            title="Eliminar"
                                                            className="absolute top-1 right-1 opacity-80 hover:opacity-100"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                onDelete(s);
                                                            }}
                                                        >
                                                            <Trash2 className="h-3 w-3" />
                                                        </button>
                                                    </div>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p className="font-semibold">{s.subjectName}</p>
                                                    <p>{s.courseName} {s.parallelName}</p>
                                                    <p>{s.dayOfWeek}: {s.startTime} - {s.endTime}</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </TooltipProvider>
        </div>
    );
};