import { useEffect, useState } from "react";
import { useInjection } from "inversify-react";
import { ListGradingSystemUseCase, ListGradingSystemCommand } from "@/scolar/application/useCases/gradingSystems/listGradingSystemUseCase";
import { GRADING_SYSTEM_LIST_USECASE } from "@/scolar/domain/symbols/GradingSystemSymbol";
import { GradingSystem } from "@/scolar/domain/entities/grading_system";
import { toast } from "@/hooks/use-toast";

export const useSystems = () => {
  const listUseCase = useInjection<ListGradingSystemUseCase>(GRADING_SYSTEM_LIST_USECASE);
  const [systems, setSystems] = useState<GradingSystem[]>([]);

  useEffect(() => {
    listUseCase
      .execute(new ListGradingSystemCommand(1, 100, []))
      .then((res) => {
        if (res.isLeft()) {
          toast({
            title: "Error",
            description: "No se pudieron cargar los sistemas",
            variant: "destructive",
          });
          return;
        }
        const data = res.extract();
        setSystems(data ? data.data : []);
      });
  }, [listUseCase]);

  return systems;
};

