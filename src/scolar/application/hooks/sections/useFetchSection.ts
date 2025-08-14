import { useInjection } from "inversify-react";
import { ListSectionCommand, ListSectionUseCase } from "../../useCases/section/listSectionUseCases";
import { SECTION_LIST_USE_CASE } from "@/scolar/domain/symbols/SectionSymbol";
import { useCallback, useEffect, useState } from "react";
import { Section } from "@/scolar/domain/entities/section";
import { toast } from "@/hooks/use-toast";
import { PaginatedResult } from "@/scolar/infrastructure/dto/paginateDto";


export const useFetchSection = (
    page: number,
    pageSize: number,
    search: string,
) => {
    // Implementación del hook
    const sectionUseCase = useInjection<ListSectionUseCase>(SECTION_LIST_USE_CASE);
    const [sections, setSections] = useState<Section[]>([]);

    const fetchSections = useCallback(async () => {
        
            const sections = await sectionUseCase.execute(
                new ListSectionCommand(
                    page,
                    pageSize,
                    ['id'],
                    search
                )
            );
            if(sections.isLeft()){
                toast({
                    title: "Error al cargar las secciones",
                    description: sections.extract().map(
                        e => e.getMessage()
                    ).join(", "),
                    variant: "destructive",
                })
                return;
            }
            const result = sections.extract() as PaginatedResult<Section>;
            setSections(result.data);
        
    }, [page,pageSize,search,sectionUseCase]);

    useEffect(()=>{
        fetchSections()
    },[fetchSections])

    return sections
};
