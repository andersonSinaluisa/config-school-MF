import { parseMinutes } from "@/lib/time";
import { Section } from "./section";

export class Block {
    constructor(
        public type: "class" | "break",
        public start: number,
        public end: number
    ) { }

    static generateBlocks(section: Section): Block[] {
        const blocks: Block[] = [];

        const start = parseMinutes(section.startTime); // ej: "08:00:00" → 480
        const end = parseMinutes(section.endTime);     // ej: "14:00:00" → 840
        const total = end - start; // minutos totales (360)

        if (!section.hasBreak || section.breakCount === 0) {
            return [{ type: "class", start, end }];
        }

        // ✅ receso en minutos
        const breakDuration = Number(section.breakDuration) * 60;

        // tiempo efectivo de clases quitando recesos
        const effective = total - breakDuration * section.breakCount;

        // repartir entre (breakCount + 1) bloques
        const segment = effective / (section.breakCount + 1);

        let cursor = start;
        for (let i = 0; i <= section.breakCount; i++) {
            // bloque de clase
            blocks.push(new Block("class", cursor, cursor + segment));
            cursor += segment;

            // bloque de receso (excepto al final)
            if (i < section.breakCount) {
                blocks.push(new Block("break", cursor, cursor + breakDuration));
                cursor += breakDuration;
            }
        }

        return blocks;
    }
}
