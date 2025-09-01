import { useInjection } from "inversify-react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";
import { PaginatedResult } from "@/scolar/infrastructure/dto/paginateDto";
import { SectionBreak } from "@/scolar/domain/entities/sectionBreak";
import { ListSectionBreaksCommand, ListSectionBreaksUseCase } from "@/scolar/application/useCases/sectionBreaks/listSectionBreaksUseCase";
import { SECTION_BREAK_LIST_USE_CASE } from "@/scolar/domain/symbols/SectionBreakSymbol";

export const useFetchSectionBreaks = (
    page: number,
    pageSize: number,
    sectionId?: number,
) => {
    const listUseCase = useInjection<ListSectionBreaksUseCase>(SECTION_BREAK_LIST_USE_CASE);
    const [items, setItems] = useState<SectionBreak[]>([]);

    const fetchItems = useCallback(async () => {
        const res = await listUseCase.execute(
            new ListSectionBreaksCommand(page, pageSize, ["id"], sectionId)
        );
        if (res.isLeft()) {
            toast({
                title: "Error al cargar los descansos",
                description: res.extract().map(e => e.getMessage()).join(", "),
                variant: "destructive",
            });
            return;
        }
        const result = res.extract() as PaginatedResult<SectionBreak>;
        setItems(result.data);
    }, [listUseCase, page, pageSize, sectionId]);

    useEffect(() => {
        fetchItems();
    }, [fetchItems]);

    return items;
};

