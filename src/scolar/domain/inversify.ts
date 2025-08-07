import { COURSE_CREATE_USECASE, COURSE_DELETE_USECASE, COURSE_GET_USECASE, COURSE_LIST_USECASE, COURSE_REPOSITORY, COURSE_SERVICE, COURSE_UPDATE_USECASE } from "./symbols/CourseSymbol";
import { CourseRepositoryImpl } from "../infrastructure/adapters/api/CourseRepositoryImpl";
import { COURSE_SUBJECT_ASSIGN_TO_COURSE_USECASE, COURSE_SUBJECT_LIST_FROM_COURSE_USECASE, COURSE_SUBJECT_LIST_USECASE, COURSE_SUBJECT_REPOSITORY, COURSE_SUBJECT_SERVICE } from "./symbols/CourseSubjectSymbol";
import { LEVEL_CREATE_USECASE, LEVEL_DELETE_USECASE, LEVEL_GET_USECASE, LEVEL_LIST_USECASE, LEVEL_REPOSITORY, LEVEL_SERVICE, LEVEL_UPDATE_USECASE } from "./symbols/LevelSymbol";
import { CourseSubjectRepositoryImpl } from "../infrastructure/adapters/api/CourseSubjectRepositoryImpl";
import { LevelRepositoryImpl } from "../infrastructure/adapters/api/LevelRepositoryImpl";
import { PARALLEL_CREATE_USECASE, PARALLEL_DELETE_USECASE, PARALLEL_GET_LIST_BY_COURSE_USECASE, PARALLEL_LIST_USECASE, PARALLEL_REPOSITORY, PARALLEL_SERVICE, PARALLEL_UPDATE_USECASE } from "./symbols/ParallelSymbol";
import { ParallelRepositoryImpl } from "../infrastructure/adapters/api/ParallelRepositoryImpl";
import { SCHOOL_YEAR_CREATE_USE_CASE, SCHOOL_YEAR_DELETE_USE_CASE, SCHOOL_YEAR_GET_USE_CASE, SCHOOL_YEAR_LIST_USE_CASE, SCHOOL_YEAR_REPOSITORY, SCHOOL_YEAR_SERVICE, SCHOOL_YEAR_UPDATE_USE_CASE } from "./symbols/SchoolYearSymbol";
import { SchoolYearRepositoryImpl } from "../infrastructure/adapters/api/SchoolYearRepositoryImpl";
import { SECTION_LIST_USE_CASE, SECTION_REPOSITORY, SECTION_SERVICE } from "./symbols/SectionSymbol";
import { SectionRepositoryImpl } from "../infrastructure/adapters/api/SectionRepositoryImpl";
import { SUBJECT_CREATE_USE_CASE, SUBJECT_LIST_USE_CASE, SUBJECT_REPOSITORY, SUBJECT_SERVICE } from "./symbols/SubjectSymbol";
import { SubjectRepositoryImpl } from "../infrastructure/adapters/api/SubjectRepositoryImpl";
import { LevelService } from "./services/LevelService";
import { ListLevelsUsecaseImpl } from "../application/useCases/levels/listLevelsUseCase";
import schoolapi from "../infrastructure/services/Api";
import {  ContainerModule } from "inversify";
import { CreateLevelUseCaseImpl } from "../application/useCases/levels/createLevelUseCase";
import { CourseService } from "./services/CourseService";
import { SubjectService } from "./services/SubjectService";
import { ListSubjectUseCaseImpl } from "../application/useCases/subjects/listSubjectsUseCase";
import { ListCoursesUseCaseImpl } from "../application/useCases/courses/listCoursesUseCase";
import { CreateCourseUseCaseImpl } from "../application/useCases/courses/createCourseUseCase";
import { DeleteCourseUseCaseImpl } from "../application/useCases/courses/deleteCourseUseCase";
import { UpdateCourseUseCaseImpl } from "../application/useCases/courses/updateCourseUseCase";
import { GetCourseUseCaseImpl } from "../application/useCases/courses/getCourseUseCase";
import { CreateSubjectUseCaseImpl } from "../application/useCases/subjects/createSubjectUseCase";
import { AssignSubjectToCourseUseCaseImpl } from "../application/useCases/courses/assingSubjectToCourse";
import { CourseSubjetService } from "./services/CourseSubjectService";
import { ListSubjectFromCourseUseCaseImpl } from "../application/useCases/courses/listSubjectFromCourse";
import { SchoolYearService } from "./services/SchoolYearService";
import { ListSchoolYearUseCaseImpl } from "../application/useCases/schoolYears/listSchoolYearUseCase";
import { ListParallelUseCaseImpl } from "../application/useCases/parallels/listParallelUseCase";
import { CreateSchoolYearUseCaseImpl } from "../application/useCases/schoolYears/createSchoolYearUseCase";
import { UpdateSchoolYearUseCaseImpl } from "../application/useCases/schoolYears/updateSchoolYearUseCase";
import { GetSchoolYearUseCaseImpl } from "../application/useCases/schoolYears/getSchoolYearUseCase";
import { DeleteSchoolYearUseCaseImpl } from "../application/useCases/schoolYears/deleteSchoolYearUseCase";
import { GetLevelUseCaseImpl } from "../application/useCases/levels/getLevelUseCase";
import { EditLevelUseCaseImpl } from "../application/useCases/levels/editLevelUseCase";
import { DeleteLevelUseCaseImpl } from "../application/useCases/levels/deleteLevelUseCase";
import { ParallelService } from "./services/ParallelService";
import { CreateParallelUseCaseImpl } from "../application/useCases/parallels/createParallelUseCase";
import { UpdateParallelUseCaseImpl } from "../application/useCases/parallels/updateParallelUseCase";
import { DeleteParallelUseCaseImpl } from "../application/useCases/parallels/deleteParallelUseCase";
import { ListParallelByCourseUseCaseImpl } from "../application/useCases/parallels/listParallelByCourseUseCase";
import { LOGGER } from "./symbols/SharedSymbol";
import { Logger } from "../infrastructure/services/Logger";
import { ListSectionUseCaseImpl } from "../application/useCases/section/listSectionUseCases";
import { SectionService } from "./services/SectionService";

const contianerScolar = new ContainerModule(
    (bind) => {
        bind(LOGGER).to(Logger);
        bind(COURSE_REPOSITORY).toDynamicValue(() => {
            return new CourseRepositoryImpl(schoolapi);
        });

        bind(COURSE_SUBJECT_REPOSITORY).toDynamicValue(() => {
            return new CourseSubjectRepositoryImpl(schoolapi);
        });

        bind(LEVEL_REPOSITORY).toDynamicValue(() => {
            return new LevelRepositoryImpl(schoolapi);
        })

        bind(PARALLEL_REPOSITORY).toDynamicValue(() => {
            return new ParallelRepositoryImpl(schoolapi);
        })

        bind(SCHOOL_YEAR_REPOSITORY).toDynamicValue(() => {
            return new SchoolYearRepositoryImpl(schoolapi);
        })

        bind(SECTION_REPOSITORY).toDynamicValue(() => {
            return new SectionRepositoryImpl(schoolapi);
        })
        bind(SUBJECT_REPOSITORY).toDynamicValue(() => {
            return new SubjectRepositoryImpl(schoolapi);
        })
        bind(SECTION_SERVICE).to(SectionService)
        bind(SECTION_LIST_USE_CASE).to(ListSectionUseCaseImpl)


        bind(LEVEL_SERVICE).to(LevelService)
        bind(LEVEL_LIST_USECASE).to(ListLevelsUsecaseImpl)
        bind(LEVEL_CREATE_USECASE).to(CreateLevelUseCaseImpl)
        bind(LEVEL_GET_USECASE).to(GetLevelUseCaseImpl)
        bind(LEVEL_UPDATE_USECASE).to(EditLevelUseCaseImpl)
        bind(LEVEL_DELETE_USECASE).to(DeleteLevelUseCaseImpl)
        bind(COURSE_SUBJECT_SERVICE).to(CourseSubjetService)

        bind(COURSE_SERVICE).to(CourseService);
        bind(COURSE_LIST_USECASE).to(ListCoursesUseCaseImpl);   
        

        bind(SUBJECT_SERVICE).to(SubjectService);
        bind(SUBJECT_LIST_USE_CASE).to(ListSubjectUseCaseImpl)
        bind(SUBJECT_CREATE_USE_CASE).to(CreateSubjectUseCaseImpl)
        
        bind(COURSE_CREATE_USECASE).to(CreateCourseUseCaseImpl);
        bind(COURSE_DELETE_USECASE).to(DeleteCourseUseCaseImpl)
        bind(COURSE_UPDATE_USECASE).to(UpdateCourseUseCaseImpl)
        bind(COURSE_GET_USECASE).to(GetCourseUseCaseImpl)
        bind(COURSE_SUBJECT_ASSIGN_TO_COURSE_USECASE).to(AssignSubjectToCourseUseCaseImpl)
        bind(COURSE_SUBJECT_LIST_FROM_COURSE_USECASE).to(ListSubjectFromCourseUseCaseImpl)
        bind(COURSE_SUBJECT_LIST_USECASE).to(ListSubjectFromCourseUseCaseImpl)
        bind(SCHOOL_YEAR_SERVICE).to(SchoolYearService)
        bind(SCHOOL_YEAR_LIST_USE_CASE).to(ListSchoolYearUseCaseImpl)
        bind(SCHOOL_YEAR_CREATE_USE_CASE).to(CreateSchoolYearUseCaseImpl)
        bind(SCHOOL_YEAR_UPDATE_USE_CASE).to(UpdateSchoolYearUseCaseImpl)
        bind(SCHOOL_YEAR_GET_USE_CASE).to(GetSchoolYearUseCaseImpl);
        bind(SCHOOL_YEAR_DELETE_USE_CASE).to(DeleteSchoolYearUseCaseImpl);
        
        bind(PARALLEL_SERVICE).to(ParallelService);
        bind(PARALLEL_LIST_USECASE).to(ListParallelUseCaseImpl)
        bind(PARALLEL_CREATE_USECASE).to(CreateParallelUseCaseImpl)
        bind(PARALLEL_UPDATE_USECASE).to(UpdateParallelUseCaseImpl)
        bind(PARALLEL_DELETE_USECASE).to(DeleteParallelUseCaseImpl)
        bind(PARALLEL_GET_LIST_BY_COURSE_USECASE).to(ListParallelByCourseUseCaseImpl)
    }
);



export { contianerScolar  };