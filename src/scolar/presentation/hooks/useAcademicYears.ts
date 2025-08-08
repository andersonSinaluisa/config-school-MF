import { useEffect, useState } from "react";
import { useInjection } from "inversify-react";
import { ListSchoolYearUseCase, ListSchoolYearUseCaseCommand } from "@/scolar/application/useCases/schoolYears/listSchoolYearUseCase";
import { SCHOOL_YEAR_LIST_USE_CASE } from "@/scolar/domain/symbols/SchoolYearSymbol";
import { SchoolYear } from "@/scolar/domain/entities/school_year";
import { toast } from "@/hooks/use-toast";

export const useAcademicYears = () => {
  const listUseCase = useInjection<ListSchoolYearUseCase>(SCHOOL_YEAR_LIST_USE_CASE);
  const [years, setYears] = useState<SchoolYear[]>([]);

  useEffect(() => {
    listUseCase
      .execute(new ListSchoolYearUseCaseCommand(1, 100, []))
      .then((res) => {
        if (res.isLeft()) {
          toast({
            title: "Error",
            description: "No se pudieron cargar los años académicos",
            variant: "destructive",
          });
          return;
        }
        const data = res.extract();
        setYears(data ? data.data : []);
      });
  }, [listUseCase]);

  return years;
};

