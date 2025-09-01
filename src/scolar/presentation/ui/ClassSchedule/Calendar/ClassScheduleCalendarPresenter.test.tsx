// ClassScheduleCalendarPresenter.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { ClassScheduleCalendarPresenter } from "./ClassScheduleCalendarPresenter";
import { describe, it, expect, vi } from "vitest";
import { ClassSchedule } from "@/scolar/domain/entities/classSchedule";
import { Section } from "@/scolar/domain/entities/section";

describe("ClassScheduleCalendarPresenter", () => {
  const baseProps = {
    schedules: [] as ClassSchedule[],
    onSelect: vi.fn(),
    onDelete: vi.fn(),
    onSearchCourse: vi.fn(),
    onSearchParallel: vi.fn(),
    onSearchSubject: vi.fn(),
    course: [],
    parallel: [],
    subject: [],
    year: [],
    selectedCourseId: null,
    selectedParallelId: null,
    selectedSubjectId: null,
    setSelectedCourseId: vi.fn(),
    setSelectedParallelId: vi.fn(),
    setSelectedSubjectId: vi.fn(),
    onGenerate: vi.fn(),
    onSave: vi.fn(),
    sectionSelected: {
      id: 1,
      name: "A",
      startTime: "08:00:00",
      endTime: "15:00:00",
      days: ["Lunes", "Martes"],
      classDuration: "00:45:00",
    } as unknown as Section,
    sectionBreaks: [],
    savedId: null,
    onDrop: vi.fn(),
  };

  it("debe renderizar el título y el botón de generar", () => {
    render(<ClassScheduleCalendarPresenter {...baseProps} />);
    expect(
      screen.getByText("Horarios de Clase")
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Generar Automáticamente/i })
    ).toBeInTheDocument();
  });

  it("debe llamar onGenerate al hacer click en el botón", () => {
    render(<ClassScheduleCalendarPresenter {...baseProps} />);
    fireEvent.click(
      screen.getByRole("button", { name: /Generar Automáticamente/i })
    );
    expect(baseProps.onGenerate).toHaveBeenCalledTimes(1);
  });

  it("debe delegar onDrop al ScheduleGrid", () => {
    render(<ClassScheduleCalendarPresenter {...baseProps} />);
    const grid = screen.getByText("Lunes").closest("div"); // contenedor del día
    if (grid) {
      fireEvent.drop(grid, {
        dataTransfer: {
          getData: vi.fn().mockReturnValue(JSON.stringify({ subjectId: 1 })),
        },
      });
      expect(baseProps.onDrop).toHaveBeenCalled();
    }
  });

  it("debe renderizar ScheduleSidebar", () => {
    render(<ClassScheduleCalendarPresenter {...baseProps} />);
    expect(
      screen.getByText("Materias")
    ).toBeInTheDocument();
  });
});
