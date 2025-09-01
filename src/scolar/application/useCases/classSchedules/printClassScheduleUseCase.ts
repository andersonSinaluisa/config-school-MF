import { injectable } from "inversify";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export class PrintCalendarUseCaseCommand {
    constructor(
        public elementId: string,
        public fileName: string,
        public courseName: string,
        public parallelName: string,
        public schoolYear: string
    ) { }
}
@injectable()
export class PrintCalendarUseCase {
    async execute(command: PrintCalendarUseCaseCommand): Promise<void> {
        const { elementId, fileName, courseName, parallelName, schoolYear } = command;
        const element = document.getElementById(elementId);
        if (!element) throw new Error("Elemento no encontrado");

        const canvas = await html2canvas(element, { scale: 2 });
        const imgData = canvas.toDataURL("image/png");

        const pdf = new jsPDF("landscape", "pt", "a4");
        const pageWidth = pdf.internal.pageSize.getWidth();

        // ---- Encabezado ----
        pdf.setFontSize(18);
        pdf.text("Horario de clases", pageWidth / 2, 40, { align: "center" });

        pdf.setFontSize(12);
        pdf.text(`Curso: ${courseName}`, 40, 65);
        pdf.text(`Paralelo: ${parallelName}`, 200, 65);
        pdf.text(`Año escolar: ${schoolYear}`, 400, 65);

        // ---- Imagen del calendario ----
        const imgProps = (pdf as any).getImageProperties(imgData);

        const pageHeight = pdf.internal.pageSize.getHeight();

        // espacio disponible después del encabezado
        const availableHeight = pageHeight - 120;
        const availableWidth = pageWidth - 80;

        // proporción
        const scale = Math.min(
            availableWidth / imgProps.width,
            availableHeight / imgProps.height
        );

        const imgWidth = imgProps.width * scale;
        const imgHeight = imgProps.height * scale;

        const xStart = (pageWidth - imgWidth) / 2; // centrar horizontal
        const yStart = 90; // dejar espacio para el encabezado

        pdf.addImage(imgData, "PNG", xStart, yStart, imgWidth, imgHeight);

        pdf.save(`${fileName}.pdf`);
    }
}
