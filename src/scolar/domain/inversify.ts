import { COURSE_CREATE_USECASE, COURSE_DELETE_USECASE, COURSE_GET_USECASE, COURSE_LIST_USECASE, COURSE_LIST_BY_FILTERS_USECASE, COURSE_REPOSITORY, COURSE_SERVICE, COURSE_UPDATE_USECASE } from "./symbols/CourseSymbol";
import { CourseRepositoryImpl } from "../infrastructure/adapters/api/CourseRepositoryImpl";
import { COURSE_SUBJECT_ASSIGN_TO_COURSE_USECASE, COURSE_SUBJECT_LIST_FROM_COURSE_USECASE, COURSE_SUBJECT_LIST_USECASE, COURSE_SUBJECT_REPOSITORY, COURSE_SUBJECT_SERVICE } from "./symbols/CourseSubjectSymbol";
import { LEVEL_CREATE_USECASE, LEVEL_DELETE_USECASE, LEVEL_GET_USECASE, LEVEL_LIST_USECASE, LEVEL_REPOSITORY, LEVEL_SERVICE, LEVEL_UPDATE_USECASE } from "./symbols/LevelSymbol";
import { CourseSubjectRepositoryImpl } from "../infrastructure/adapters/api/CourseSubjectRepositoryImpl";
import { LevelRepositoryImpl } from "../infrastructure/adapters/api/LevelRepositoryImpl";
import { PARALLEL_CREATE_USECASE, PARALLEL_DELETE_USECASE, PARALLEL_GET_LIST_BY_COURSE_USECASE, PARALLEL_LIST_USECASE, PARALLEL_REPOSITORY, PARALLEL_SERVICE, PARALLEL_UPDATE_USECASE } from "./symbols/ParallelSymbol";
import { ParallelRepositoryImpl } from "../infrastructure/adapters/api/ParallelRepositoryImpl";
import { SCHOOL_YEAR_CREATE_USE_CASE, SCHOOL_YEAR_DELETE_USE_CASE, SCHOOL_YEAR_GET_USE_CASE, SCHOOL_YEAR_LIST_USE_CASE, SCHOOL_YEAR_LIST_BY_FILTERS_USE_CASE, SCHOOL_YEAR_REPOSITORY, SCHOOL_YEAR_SERVICE, SCHOOL_YEAR_UPDATE_USE_CASE } from "./symbols/SchoolYearSymbol";
import { SchoolYearRepositoryImpl } from "../infrastructure/adapters/api/SchoolYearRepositoryImpl";
import { SECTION_LIST_USE_CASE, SECTION_REPOSITORY, SECTION_SERVICE } from "./symbols/SectionSymbol";
import { SectionRepositoryImpl } from "../infrastructure/adapters/api/SectionRepositoryImpl";
import { SUBJECT_CREATE_USE_CASE, SUBJECT_LIST_USE_CASE, SUBJECT_LIST_BY_FILTERS_USE_CASE, SUBJECT_REPOSITORY, SUBJECT_SERVICE } from "./symbols/SubjectSymbol";
import { SubjectRepositoryImpl } from "../infrastructure/adapters/api/SubjectRepositoryImpl";
import { GRADING_SYSTEM_CREATE_USECASE, GRADING_SYSTEM_DELETE_USECASE, GRADING_SYSTEM_GET_USECASE, GRADING_SYSTEM_LIST_USECASE, GRADING_SYSTEM_REPOSITORY, GRADING_SYSTEM_SERVICE, GRADING_SYSTEM_UPDATE_USECASE } from "./symbols/GradingSystemSymbol";
import { GradingSystemRepositoryImpl } from "../infrastructure/adapters/api/GradingSystemRepositoryImpl";
import { GradingSystemService } from "./services/GradingSystemService";
import { CreateGradingSystemUseCaseImpl } from "../application/useCases/gradingSystems/createGradingSystemUseCase";
import { ListGradingSystemUseCaseImpl } from "../application/useCases/gradingSystems/listGradingSystemUseCase";
import { GetGradingSystemUseCaseImpl } from "../application/useCases/gradingSystems/getGradingSystemUseCase";
import { UpdateGradingSystemUseCaseImpl } from "../application/useCases/gradingSystems/updateGradingSystemUseCase";
import { DeleteGradingSystemUseCaseImpl } from "../application/useCases/gradingSystems/deleteGradingSystemUseCase";
import { GRADING_TERM_CREATE_USECASE, GRADING_TERM_DELETE_USECASE, GRADING_TERM_GET_USECASE, GRADING_TERM_LIST_USECASE, GRADING_TERM_REPOSITORY, GRADING_TERM_SERVICE, GRADING_TERM_UPDATE_USECASE } from "./symbols/GradingTermSymbol";
import { GradingTermRepositoryImpl } from "../infrastructure/adapters/api/GradingTermRepositoryImpl";
import { GradingTermService } from "./services/GradingTermService";
import { CreateGradingTermUseCaseImpl } from "../application/useCases/gradingTerms/createGradingTermUseCase";
import { ListGradingTermUseCaseImpl } from "../application/useCases/gradingTerms/listGradingTermUseCase";
import { GetGradingTermUseCaseImpl } from "../application/useCases/gradingTerms/getGradingTermUseCase";
import { UpdateGradingTermUseCaseImpl } from "../application/useCases/gradingTerms/updateGradingTermUseCase";
import { DeleteGradingTermUseCaseImpl } from "../application/useCases/gradingTerms/deleteGradingTermUseCase";
import { EVALUATION_TYPE_CREATE_USECASE, EVALUATION_TYPE_DELETE_USECASE, EVALUATION_TYPE_GET_USECASE, EVALUATION_TYPE_LIST_USECASE, EVALUATION_TYPE_REPOSITORY, EVALUATION_TYPE_SERVICE, EVALUATION_TYPE_UPDATE_USECASE } from "./symbols/EvaluationTypeSymbol";
import { EvaluationTypeRepositoryImpl } from "../infrastructure/adapters/api/EvaluationTypeRepositoryImpl";
import { EvaluationTypeService } from "./services/EvaluationTypeService";
import { CreateEvaluationTypeUseCaseImpl } from "../application/useCases/evaluationTypes/createEvaluationTypeUseCase";
import { ListEvaluationTypeUseCaseImpl } from "../application/useCases/evaluationTypes/listEvaluationTypeUseCase";
import { GetEvaluationTypeUseCaseImpl } from "../application/useCases/evaluationTypes/getEvaluationTypeUseCase";
import { UpdateEvaluationTypeUseCaseImpl } from "../application/useCases/evaluationTypes/updateEvaluationTypeUseCase";
import { DeleteEvaluationTypeUseCaseImpl } from "../application/useCases/evaluationTypes/deleteEvaluationTypeUseCase";
import { LevelService } from "./services/LevelService";
import { ListLevelsUsecaseImpl } from "../application/useCases/levels/listLevelsUseCase";
import schoolapi from "../infrastructure/services/Api";
import {  ContainerModule } from "inversify";
import { CreateLevelUseCaseImpl } from "../application/useCases/levels/createLevelUseCase";
import { CourseService } from "./services/CourseService";
import { SubjectService } from "./services/SubjectService";
import { ListSubjectUseCaseImpl } from "../application/useCases/subjects/listSubjectsUseCase";
import { ListSubjectsByFiltersUseCaseImpl } from "../application/useCases/subjects/listSubjectsByFiltersUseCase";
import { ListCoursesUseCaseImpl } from "../application/useCases/courses/listCoursesUseCase";
import { ListCoursesByFiltersUseCaseImpl } from "../application/useCases/courses/listCoursesByFiltersUseCase";
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
import { ListSchoolYearByFiltersUseCaseImpl } from "../application/useCases/schoolYears/listSchoolYearByFiltersUseCase";
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
import { MEETING_TYPE_REPOSITORY, MEETING_TYPE_SERVICE, MEETING_TYPE_LIST_USE_CASE, MEETING_TYPE_CREATE_USE_CASE, MEETING_TYPE_UPDATE_USE_CASE, MEETING_TYPE_DELETE_USE_CASE, MEETING_TYPE_GET_USE_CASE } from "./symbols/MeetingTypeSymbol";
import { MeetingTypeRepositoryImpl } from "../infrastructure/adapters/api/MeetingTypeRepositoryImpl";
import { MeetingTypeService } from "./services/MeetingTypeService";
import { ListMeetingTypesUseCaseImpl } from "../application/useCases/meetingTypes/listMeetingTypesUseCase";
import { CreateMeetingTypeUseCaseImpl } from "../application/useCases/meetingTypes/createMeetingTypeUseCase";
import { UpdateMeetingTypeUseCaseImpl } from "../application/useCases/meetingTypes/updateMeetingTypeUseCase";
import { DeleteMeetingTypeUseCaseImpl } from "../application/useCases/meetingTypes/deleteMeetingTypeUseCase";
import { GetMeetingTypeUseCaseImpl } from "../application/useCases/meetingTypes/getMeetingTypeUseCase";
import { ATTENDANCE_CODE_REPOSITORY, ATTENDANCE_CODE_SERVICE, ATTENDANCE_CODE_LIST_USE_CASE, ATTENDANCE_CODE_CREATE_USE_CASE, ATTENDANCE_CODE_UPDATE_USE_CASE, ATTENDANCE_CODE_DELETE_USE_CASE, ATTENDANCE_CODE_GET_USE_CASE } from "./symbols/AttendanceCodeSymbol";
import { AttendanceCodeRepositoryImpl } from "../infrastructure/adapters/api/AttendanceCodeRepositoryImpl";
import { AttendanceCodeService } from "./services/AttendanceCodeService";
import { ListAttendanceCodesUseCaseImpl } from "../application/useCases/attendanceCodes/listAttendanceCodesUseCase";
import { CreateAttendanceCodeUseCaseImpl } from "../application/useCases/attendanceCodes/createAttendanceCodeUseCase";
import { UpdateAttendanceCodeUseCaseImpl } from "../application/useCases/attendanceCodes/updateAttendanceCodeUseCase";
import { DeleteAttendanceCodeUseCaseImpl } from "../application/useCases/attendanceCodes/deleteAttendanceCodeUseCase";
import { GetAttendanceCodeUseCaseImpl } from "../application/useCases/attendanceCodes/getAttendanceCodeUseCase";
import { BEHAVIOR_SCALE_REPOSITORY, BEHAVIOR_SCALE_SERVICE, BEHAVIOR_SCALE_LIST_USE_CASE, BEHAVIOR_SCALE_CREATE_USE_CASE, BEHAVIOR_SCALE_UPDATE_USE_CASE, BEHAVIOR_SCALE_DELETE_USE_CASE, BEHAVIOR_SCALE_GET_USE_CASE } from "./symbols/BehaviorScaleSymbol";
import { BehaviorScaleRepositoryImpl } from "../infrastructure/adapters/api/BehaviorScaleRepositoryImpl";
import { BehaviorScaleService } from "./services/BehaviorScaleService";
import { ListBehaviorScalesUseCaseImpl } from "../application/useCases/behaviorScales/listBehaviorScalesUseCase";
import { CreateBehaviorScaleUseCaseImpl } from "../application/useCases/behaviorScales/createBehaviorScaleUseCase";
import { UpdateBehaviorScaleUseCaseImpl } from "../application/useCases/behaviorScales/updateBehaviorScaleUseCase";
import { DeleteBehaviorScaleUseCaseImpl } from "../application/useCases/behaviorScales/deleteBehaviorScaleUseCase";
import { CLASS_SCHEDULE_REPOSITORY, CLASS_SCHEDULE_SERVICE, CLASS_SCHEDULE_LIST_USE_CASE, CLASS_SCHEDULE_LIST_BY_FILTERS_USE_CASE, CLASS_SCHEDULE_CREATE_USE_CASE, CLASS_SCHEDULE_UPDATE_USE_CASE, CLASS_SCHEDULE_DELETE_USE_CASE, CLASS_SCHEDULE_GET_USE_CASE } from "./symbols/ClassScheduleSymbol";
import { ClassScheduleRepositoryImpl } from "../infrastructure/adapters/api/ClassScheduleRepositoryImpl";
import { ClassScheduleService } from "./services/ClassScheduleService";
import { ListClassSchedulesUseCaseImpl } from "../application/useCases/classSchedules/listClassSchedulesUseCase";
import { ListClassSchedulesByFiltersUseCaseImpl } from "../application/useCases/classSchedules/listClassSchedulesByFiltersUseCase";
import { CreateClassScheduleUseCaseImpl } from "../application/useCases/classSchedules/createClassScheduleUseCase";
import { UpdateClassScheduleUseCaseImpl } from "../application/useCases/classSchedules/updateClassScheduleUseCase";
import { DeleteClassScheduleUseCaseImpl } from "../application/useCases/classSchedules/deleteClassScheduleUseCase";
import { GetClassScheduleUseCaseImpl } from "../application/useCases/classSchedules/getClassScheduleUseCase";
import { ACADEMIC_PLANNING_REPOSITORY, ACADEMIC_PLANNING_SERVICE, ACADEMIC_PLANNING_LIST_USE_CASE, ACADEMIC_PLANNING_LIST_BY_FILTERS_USE_CASE, ACADEMIC_PLANNING_CREATE_USE_CASE, ACADEMIC_PLANNING_UPDATE_USE_CASE, ACADEMIC_PLANNING_DELETE_USE_CASE, ACADEMIC_PLANNING_GET_USE_CASE } from "./symbols/AcademicPlanningSymbol";
import { AcademicPlanningRepositoryImpl } from "../infrastructure/adapters/api/AcademicPlanningRepositoryImpl";
import { AcademicPlanningService } from "./services/AcademicPlanningService";
import { ListAcademicPlanningsUseCaseImpl } from "../application/useCases/academicPlannings/listAcademicPlanningsUseCase";
import { ListAcademicPlanningsByFiltersUseCaseImpl } from "../application/useCases/academicPlannings/listAcademicPlanningsByFiltersUseCase";
import { CreateAcademicPlanningUseCaseImpl } from "../application/useCases/academicPlannings/createAcademicPlanningUseCase";
import { UpdateAcademicPlanningUseCaseImpl } from "../application/useCases/academicPlannings/updateAcademicPlanningUseCase";
import { DeleteAcademicPlanningUseCaseImpl } from "../application/useCases/academicPlannings/deleteAcademicPlanningUseCase";
import { GetAcademicPlanningUseCaseImpl } from "../application/useCases/academicPlannings/getAcademicPlanningUseCase";
import { GetBehaviorScaleUseCaseImpl } from "../application/useCases/behaviorScales/getBehaviorScaleUseCase";

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
        bind(GRADING_SYSTEM_REPOSITORY).toDynamicValue(() => {
            return new GradingSystemRepositoryImpl(schoolapi);
        })
        bind(GRADING_TERM_REPOSITORY).toDynamicValue(() => {
            return new GradingTermRepositoryImpl(schoolapi);
        })
        bind(EVALUATION_TYPE_REPOSITORY).toDynamicValue(() => {
            return new EvaluationTypeRepositoryImpl(schoolapi);
        })
        bind(SECTION_SERVICE).to(SectionService)
        bind(SECTION_LIST_USE_CASE).to(ListSectionUseCaseImpl)

        bind(GRADING_SYSTEM_SERVICE).to(GradingSystemService);
        bind(GRADING_SYSTEM_CREATE_USECASE).to(CreateGradingSystemUseCaseImpl);
        bind(GRADING_SYSTEM_LIST_USECASE).to(ListGradingSystemUseCaseImpl);
        bind(GRADING_SYSTEM_GET_USECASE).to(GetGradingSystemUseCaseImpl);
        bind(GRADING_SYSTEM_UPDATE_USECASE).to(UpdateGradingSystemUseCaseImpl);
        bind(GRADING_SYSTEM_DELETE_USECASE).to(DeleteGradingSystemUseCaseImpl);

        bind(GRADING_TERM_SERVICE).to(GradingTermService);
        bind(GRADING_TERM_CREATE_USECASE).to(CreateGradingTermUseCaseImpl);
        bind(GRADING_TERM_LIST_USECASE).to(ListGradingTermUseCaseImpl);
        bind(GRADING_TERM_GET_USECASE).to(GetGradingTermUseCaseImpl);
        bind(GRADING_TERM_UPDATE_USECASE).to(UpdateGradingTermUseCaseImpl);
        bind(GRADING_TERM_DELETE_USECASE).to(DeleteGradingTermUseCaseImpl);

        bind(EVALUATION_TYPE_SERVICE).to(EvaluationTypeService);
        bind(EVALUATION_TYPE_CREATE_USECASE).to(CreateEvaluationTypeUseCaseImpl);
        bind(EVALUATION_TYPE_LIST_USECASE).to(ListEvaluationTypeUseCaseImpl);
        bind(EVALUATION_TYPE_GET_USECASE).to(GetEvaluationTypeUseCaseImpl);
        bind(EVALUATION_TYPE_UPDATE_USECASE).to(UpdateEvaluationTypeUseCaseImpl);
        bind(EVALUATION_TYPE_DELETE_USECASE).to(DeleteEvaluationTypeUseCaseImpl);

        bind(LEVEL_SERVICE).to(LevelService)
        bind(LEVEL_LIST_USECASE).to(ListLevelsUsecaseImpl)
        bind(LEVEL_CREATE_USECASE).to(CreateLevelUseCaseImpl)
        bind(LEVEL_GET_USECASE).to(GetLevelUseCaseImpl)
        bind(LEVEL_UPDATE_USECASE).to(EditLevelUseCaseImpl)
        bind(LEVEL_DELETE_USECASE).to(DeleteLevelUseCaseImpl)
        bind(COURSE_SUBJECT_SERVICE).to(CourseSubjetService)

        bind(COURSE_SERVICE).to(CourseService);
        bind(COURSE_LIST_USECASE).to(ListCoursesUseCaseImpl);
        bind(COURSE_LIST_BY_FILTERS_USECASE).to(ListCoursesByFiltersUseCaseImpl);

        bind(SUBJECT_SERVICE).to(SubjectService);
        bind(SUBJECT_LIST_USE_CASE).to(ListSubjectUseCaseImpl)
        bind(SUBJECT_LIST_BY_FILTERS_USE_CASE).to(ListSubjectsByFiltersUseCaseImpl)
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
        bind(SCHOOL_YEAR_LIST_BY_FILTERS_USE_CASE).to(ListSchoolYearByFiltersUseCaseImpl)
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

        bind(MEETING_TYPE_REPOSITORY).toDynamicValue(() => {
            return new MeetingTypeRepositoryImpl(schoolapi);
        })
        bind(MEETING_TYPE_SERVICE).to(MeetingTypeService)
        bind(MEETING_TYPE_LIST_USE_CASE).to(ListMeetingTypesUseCaseImpl)
        bind(MEETING_TYPE_CREATE_USE_CASE).to(CreateMeetingTypeUseCaseImpl)
        bind(MEETING_TYPE_UPDATE_USE_CASE).to(UpdateMeetingTypeUseCaseImpl)
        bind(MEETING_TYPE_DELETE_USE_CASE).to(DeleteMeetingTypeUseCaseImpl)
        bind(MEETING_TYPE_GET_USE_CASE).to(GetMeetingTypeUseCaseImpl)

        bind(ATTENDANCE_CODE_REPOSITORY).toDynamicValue(() => {
            return new AttendanceCodeRepositoryImpl(schoolapi);
        })
        bind(ATTENDANCE_CODE_SERVICE).to(AttendanceCodeService)
        bind(ATTENDANCE_CODE_LIST_USE_CASE).to(ListAttendanceCodesUseCaseImpl)
        bind(ATTENDANCE_CODE_CREATE_USE_CASE).to(CreateAttendanceCodeUseCaseImpl)
        bind(ATTENDANCE_CODE_UPDATE_USE_CASE).to(UpdateAttendanceCodeUseCaseImpl)
        bind(ATTENDANCE_CODE_DELETE_USE_CASE).to(DeleteAttendanceCodeUseCaseImpl)
        bind(ATTENDANCE_CODE_GET_USE_CASE).to(GetAttendanceCodeUseCaseImpl)

        bind(BEHAVIOR_SCALE_REPOSITORY).toDynamicValue(() => {
            return new BehaviorScaleRepositoryImpl(schoolapi);
        })
        bind(BEHAVIOR_SCALE_SERVICE).to(BehaviorScaleService)
        bind(BEHAVIOR_SCALE_LIST_USE_CASE).to(ListBehaviorScalesUseCaseImpl)
        bind(BEHAVIOR_SCALE_CREATE_USE_CASE).to(CreateBehaviorScaleUseCaseImpl)
        bind(BEHAVIOR_SCALE_UPDATE_USE_CASE).to(UpdateBehaviorScaleUseCaseImpl)
        bind(BEHAVIOR_SCALE_DELETE_USE_CASE).to(DeleteBehaviorScaleUseCaseImpl)
        bind(BEHAVIOR_SCALE_GET_USE_CASE).to(GetBehaviorScaleUseCaseImpl)

        bind(CLASS_SCHEDULE_REPOSITORY).toDynamicValue(() => {
            return new ClassScheduleRepositoryImpl(schoolapi);
        })
        bind(CLASS_SCHEDULE_SERVICE).to(ClassScheduleService)
        bind(CLASS_SCHEDULE_LIST_USE_CASE).to(ListClassSchedulesUseCaseImpl)
        bind(CLASS_SCHEDULE_LIST_BY_FILTERS_USE_CASE).to(ListClassSchedulesByFiltersUseCaseImpl)
        bind(CLASS_SCHEDULE_CREATE_USE_CASE).to(CreateClassScheduleUseCaseImpl)
        bind(CLASS_SCHEDULE_UPDATE_USE_CASE).to(UpdateClassScheduleUseCaseImpl)
        bind(CLASS_SCHEDULE_DELETE_USE_CASE).to(DeleteClassScheduleUseCaseImpl)
        bind(CLASS_SCHEDULE_GET_USE_CASE).to(GetClassScheduleUseCaseImpl)

        bind(ACADEMIC_PLANNING_REPOSITORY).toDynamicValue(() => {
            return new AcademicPlanningRepositoryImpl(schoolapi);
        })
        bind(ACADEMIC_PLANNING_SERVICE).to(AcademicPlanningService)
        bind(ACADEMIC_PLANNING_LIST_USE_CASE).to(ListAcademicPlanningsUseCaseImpl)
        bind(ACADEMIC_PLANNING_LIST_BY_FILTERS_USE_CASE).to(ListAcademicPlanningsByFiltersUseCaseImpl)
        bind(ACADEMIC_PLANNING_CREATE_USE_CASE).to(CreateAcademicPlanningUseCaseImpl)
        bind(ACADEMIC_PLANNING_UPDATE_USE_CASE).to(UpdateAcademicPlanningUseCaseImpl)
        bind(ACADEMIC_PLANNING_DELETE_USE_CASE).to(DeleteAcademicPlanningUseCaseImpl)
        bind(ACADEMIC_PLANNING_GET_USE_CASE).to(GetAcademicPlanningUseCaseImpl)
    }
);

export { contianerScolar };
