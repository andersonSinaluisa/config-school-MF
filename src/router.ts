import { createBrowserRouter } from "react-router-dom";
import { CourseListContainer } from "./scolar/presentation/ui/Course/List/CourseListContainer";
import { CreateCourseContainer } from "./scolar/presentation/ui/Course/Create/CreateCourseContainer";
import { LevelListContainer } from "./scolar/presentation/ui/Level/List/LevelListContainer";
import { LevelCreateContainer } from "./scolar/presentation/ui/Level/Create/LevelCreateContainer";
import { EditLevelContainer } from "./scolar/presentation/ui/Level/Edit/EditLevelContainer";
import { ListParallelContainer } from "./scolar/presentation/ui/Parallel/List/ListParallelContainer";
import { ListByCourseContainer } from "./scolar/presentation/ui/Parallel/ListByCourse/ListByCourserContainer";
import { ListSchoolYearContainer } from "./scolar/presentation/ui/SchoolYear/List/ListSchoolYearContainer";
import { CreateSchoolYearContainer } from "./scolar/presentation/ui/SchoolYear/Create/CreateSchoolYearContainer";
import { EditSchoolYearContainer } from "./scolar/presentation/ui/SchoolYear/Edit/EditSchoolYearContainer";
import { SubjectListContainer } from "./scolar/presentation/ui/Subject/List/SubjectListContainer";
import { SubjectCreateContainer } from "./scolar/presentation/ui/Subject/Create/SubjectCreateContainer";
import { SubjectCourseContainer } from "./scolar/presentation/ui/Course/SubjectCourse/SubjectCourseContainer";
import { EditCourseContainer } from "./scolar/presentation/ui/Course/Edit/CourseEditContainer";
import { EvaluationTypeListContainer } from "./scolar/presentation/ui/EvaluationType/List/EvaluationTypeListContainer";
import { EvaluationTypeCreateContainer } from "./scolar/presentation/ui/EvaluationType/Create/EvaluationTypeCreateContainer";
import { EvaluationTypeEditContainer } from "./scolar/presentation/ui/EvaluationType/Edit/EvaluationTypeEditContainer";
import { GradingSystemListContainer } from "./scolar/presentation/ui/GradingSystem/List/GradingSystemListContainer";
import { GradingSystemCreateContainer } from "./scolar/presentation/ui/GradingSystem/Create/GradingSystemCreateContainer";
import { GradingSystemEditContainer } from "./scolar/presentation/ui/GradingSystem/Edit/GradingSystemEditContainer";
import { GradingTermListContainer } from "./scolar/presentation/ui/GradingTerm/List/GradingTermListContainer";
import { GradingTermCreateContainer } from "./scolar/presentation/ui/GradingTerm/Create/GradingTermCreateContainer";
import { GradingTermEditContainer } from "./scolar/presentation/ui/GradingTerm/Edit/GradingTermEditContainer";
import { MeetingTypeListContainer } from "./scolar/presentation/ui/MeetingType/List/MeetingTypeListContainer";
import { MeetingTypeCreateContainer } from "./scolar/presentation/ui/MeetingType/Create/MeetingTypeCreateContainer";
import { MeetingTypeEditContainer } from "./scolar/presentation/ui/MeetingType/Edit/MeetingTypeEditContainer";
import { AttendanceCodeListContainer } from "./scolar/presentation/ui/AttendanceCode/List/AttendanceCodeListContainer";
import { AttendanceCodeCreateContainer } from "./scolar/presentation/ui/AttendanceCode/Create/AttendanceCodeCreateContainer";
import { AttendanceCodeEditContainer } from "./scolar/presentation/ui/AttendanceCode/Edit/AttendanceCodeEditContainer";
import { BehaviorScaleCreateContainer } from './scolar/presentation/ui/BehaviorScale/Create/BehaviorScaleCreateContainer';
import { BehaviorScaleEditContainer } from './scolar/presentation/ui/BehaviorScale/Edit/BehaviorScaleEditContainer';
import { ClassScheduleCalendarContainer } from './scolar/presentation/ui/ClassSchedule/Calendar/ClassScheduleCalendarContainer';
import { AcademicPlanningListContainer } from './scolar/presentation/ui/AcademicPlanning/List/AcademicPlanningListContainer';
import { AcademicPlanningCreateContainer } from './scolar/presentation/ui/AcademicPlanning/Create/AcademicPlanningCreateContainer';
import { AcademicPlanningEditContainer } from './scolar/presentation/ui/AcademicPlanning/Edit/AcademicPlanningEditContainer';
import { BehaviorScaleListContainer } from "./scolar/presentation/ui/BehaviorScale/List/BehaviorScaleListContainer";

const isStandalone = !window.singleSpaNavigate;

export const MenuOptions = [
    { name: 'Cursos', path: '/cursos' },
    { name: 'Niveles Escolares', path: '/niveles-escolares' },
    { name: 'Paralelos', path: '/paralelos' },
    { name: 'Materias', path: '/materias' },
    { name: 'Periodos lectivos', path: '/periodos-lectivos' },
    { name: 'Sistemas de calificación', path: '/sistemas-calificacion' },
    { name: 'Períodos de calificación', path: '/terminos-calificacion' },
    { name: 'Tipos de evaluación', path: '/tipos-evaluacion' },
    { name: 'Tipos de reunión', path: '/tipos-reuniones' },
    { name: 'Códigos de asistencia', path: '/codigos-asistencia' },
    { name: 'Escalas de comportamiento', path: '/escalas-comportamiento' },
    { name: 'Horarios de clase', path: '/horarios-clase' },
    { name: 'Planificaciones académicas', path: '/planificaciones-academicas' }
];

const router = createBrowserRouter([
    { path: '/cursos', Component: CourseListContainer },
    { path: '/cursos/nuevo', Component: CreateCourseContainer },
    { path: '/cursos/:id', Component: EditCourseContainer },
    { path: '/niveles-escolares', Component: LevelListContainer },
    { path: '/niveles-escolares/nuevo', Component: LevelCreateContainer },
    { path: '/niveles-escolares/:id', Component: EditLevelContainer },
    { path: '/paralelos', Component: ListParallelContainer },
    { path: '/cursos/:courseId/paralelos', Component: ListByCourseContainer },
    { path: '/periodos-lectivos', Component: ListSchoolYearContainer },
    { path: '/periodos-lectivos/nuevo', Component: CreateSchoolYearContainer },
    { path: '/periodos-lectivos/:id', Component: EditSchoolYearContainer },
    { path: '/materias', Component: SubjectListContainer },
    { path: '/materias/nuevo', Component: SubjectCreateContainer },
    { path: '/cursos/:id/materias', Component: SubjectCourseContainer },
    { path: '/tipos-evaluacion', Component: EvaluationTypeListContainer },
    { path: '/tipos-evaluacion/nuevo', Component: EvaluationTypeCreateContainer },
    { path: '/tipos-evaluacion/:id', Component: EvaluationTypeEditContainer },
    { path: '/sistemas-calificacion', Component: GradingSystemListContainer },
    { path: '/sistemas-calificacion/nuevo', Component: GradingSystemCreateContainer },
    { path: '/sistemas-calificacion/:id', Component: GradingSystemEditContainer },
    { path: '/terminos-calificacion', Component: GradingTermListContainer },
    { path: '/terminos-calificacion/nuevo', Component: GradingTermCreateContainer },
    { path: '/terminos-calificacion/:id', Component: GradingTermEditContainer },
    { path: '/tipos-reuniones', Component: MeetingTypeListContainer },
    { path: '/tipos-reuniones/nuevo', Component: MeetingTypeCreateContainer },
    { path: '/tipos-reuniones/:id', Component: MeetingTypeEditContainer },
    { path: '/codigos-asistencia', Component: AttendanceCodeListContainer },
    { path: '/codigos-asistencia/nuevo', Component: AttendanceCodeCreateContainer },
    { path: '/codigos-asistencia/:id', Component: AttendanceCodeEditContainer },
    { path: '/escalas-comportamiento', Component: BehaviorScaleListContainer },
    { path: '/escalas-comportamiento/nuevo', Component: BehaviorScaleCreateContainer },
    { path: '/escalas-comportamiento/:id', Component: BehaviorScaleEditContainer },
    { path: '/horarios-clase', Component: ClassScheduleCalendarContainer },
    { path: '/planificaciones-academicas', Component: AcademicPlanningListContainer },
    { path: '/planificaciones-academicas/nuevo', Component: AcademicPlanningCreateContainer },
    { path: '/planificaciones-academicas/:id', Component: AcademicPlanningEditContainer },
], {
    basename: isStandalone ? '/' : '/escolar',
});

export default router;
