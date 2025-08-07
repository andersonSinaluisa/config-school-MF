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

const isStandalone = !window.singleSpaNavigate;

export const  MenuOptions = [
    { name: 'Cursos', path: '/cursos' },
    {name:'Niveles Escolares', path:'/niveles-escolares' },
    {name:'Paralelos', path:'/paralelos' },
    {name:'Materias', path:'/materias' },
    {name:'Periodos lectivos', path:'/periodos-lectivos' }
]


const router = createBrowserRouter([
    {
        path: "/cursos",
        Component: CourseListContainer
    },
    {
        path: "/cursos/nuevo",
        Component: CreateCourseContainer
    },
    {
        path: "/cursos/:id",
        Component: EditCourseContainer,
    },
    {
        path: "/niveles-escolares",
        Component: LevelListContainer
    },
    {
        path: "/niveles-escolares/nuevo",
        Component: LevelCreateContainer
    },
    {
        path:"/niveles-escolares/:id",
        Component: EditLevelContainer
    },
    {
        path: "/paralelos",
        Component: ListParallelContainer
    },
    {
        path:"/cursos/:courseId/paralelos",
        Component: ListByCourseContainer
    },
    {
        path:"/periodos-lectivos",
        Component: ListSchoolYearContainer
    },
    {
        path:"/periodos-lectivos/nuevo",
        Component: CreateSchoolYearContainer
    },
    {
        path:"/periodos-lectivos/:id",
        Component: EditSchoolYearContainer
    },
    {
        path:"/materias",
        Component: SubjectListContainer
    },
    {
        path:"/materias/nuevo",
        Component: SubjectCreateContainer
    },
    {
        path:"/cursos/:id/materias",
        Component: SubjectCourseContainer
    }

],
{
    basename: isStandalone ? '/' : '/escolar',
});

export default router;