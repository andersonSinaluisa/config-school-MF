import { useInjection } from "inversify-react";
import { useCallback, useEffect, useState } from "react";
import { ListLevelsUsecase, PaginateLevelsCommand } from "@/scolar/application/useCases/levels/listLevelsUseCase";
import { LEVEL_LIST_USECASE } from "@/scolar/domain/symbols/LevelSymbol";
import { Level } from "@/scolar/domain/entities/level";
import { toast } from "@/hooks/use-toast";
import { PaginatedResult } from "@/scolar/infrastructure/dto/paginateDto";

export const useFetchLevel = (page: number, size: number, search: string = "") => {
  const listUseCase = useInjection<ListLevelsUsecase>(LEVEL_LIST_USECASE);
  const [levels, setLevels] = useState<Level[]>([]);

  const fetchLevels = useCallback(() => {

      listUseCase.execute(new PaginateLevelsCommand(page, size, [], search)).then((res) => {
      if (res.isLeft()) {
        toast({
          title: "Error",
          description: "No se pudieron cargar los niveles",
          variant: "destructive",
        });
        return;
      }
      const data = res.extract() as PaginatedResult<Level>;
      setLevels(data ? data.data : []);
    });
  }, [listUseCase, page, size, search]);

  useEffect(() => {
    fetchLevels();
  }, [fetchLevels]);

  return levels;
};
