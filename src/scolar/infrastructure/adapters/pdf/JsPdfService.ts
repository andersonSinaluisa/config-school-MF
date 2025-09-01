import jsPDF from "jspdf";
import autoTable, { RowInput } from "jspdf-autotable";
import { IPdfService } from "../../../domain/repositories/PdfRepository";
import { ClassSchedule } from "../../../domain/entities/classSchedule";

export class JsPdfService implements IPdfService {
    generateSchedulePdf(schedules: ClassSchedule[],
            courseName: string,
            parallelName: string,
            schoolYear: string) {
        const doc = new jsPDF();
        doc.setFontSize(18);
        doc.text(`Horario de clases`, 14, 20);
        doc.setFontSize(12);
        doc.text(`Curso: ${courseName} | Paralelo: ${parallelName}`, 14, 30);
        doc.text(`Año Escolar: ${schoolYear}`, 14, 37);

        const rows = schedules.map((s) => [
            s.dayOfWeek,
            s.startTime + " - " + s.endTime,
            s.subject?.name,
            s.courseId,
            s.parallelId,
        ]);

        autoTable(doc, {
            head: [["Día", "Hora", "Materia", "Curso", "Paralelo"]],
            body: rows as RowInput[],
            startY: 45,
        });

        doc.save(`Horario_${courseName}_${parallelName}.pdf`);
    }
}
