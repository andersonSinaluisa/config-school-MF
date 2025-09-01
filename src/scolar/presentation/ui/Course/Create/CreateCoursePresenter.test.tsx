// CreateCoursePresenter.test.tsx
import { render, screen, fireEvent } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"
import { CreateCoursePresenter } from "./CreateCoursePresenter"
import { CreateCourseCommand } from "@/scolar/application/useCases/courses/createCourseUseCase"
import { Level } from "@/scolar/domain/entities/level"
import { Control, useForm } from "react-hook-form"

describe("CreateCoursePresenter", () => {
  const levels: Level[] = [
    { id: 1, name: "Primaria" } as Level,
    { id: 2, name: "Secundaria" } as Level,
  ]

  const formData: CreateCourseCommand =  new CreateCourseCommand("Matemáticas", 1, "Curso de álgebra básica")

  // ⚡️ necesitamos un control real de react-hook-form
  const Wrapper = (props: any) => {
    const { control, register,  } = useForm<CreateCourseCommand>({
      defaultValues: formData,
    })
    return (
      <CreateCoursePresenter
        onBack={props.onBack}
        isSubmitting={props.isSubmitting}
        handleSubmit={props.handleSubmit}
        formData={formData}
        levels={levels}
        register={register}
        control={control as unknown as Control<CreateCourseCommand, CreateCourseCommand>}
      />
    )
  }

  it("renderiza título y breadcrumb", () => {
    render(<Wrapper onBack={vi.fn()} isSubmitting={false} handleSubmit={vi.fn()} />)
    expect(screen.getByText("Nuevo Curso")).toBeInTheDocument()
    expect(screen.getByText("Cursos")).toBeInTheDocument()
  })

  it("muestra los valores del form en la vista previa", () => {
    render(<Wrapper onBack={vi.fn()} isSubmitting={false} handleSubmit={vi.fn()} />)
    expect(screen.getByText("Matemáticas")).toBeInTheDocument()
    expect(screen.getByText("Curso de álgebra básica")).toBeInTheDocument()
    expect(screen.getByText("Primaria")).toBeInTheDocument()
  })

  it("dispara onBack cuando se hace click en Cancelar", () => {
    const onBack = vi.fn()
    render(<Wrapper onBack={onBack} isSubmitting={false} handleSubmit={vi.fn()} />)

    fireEvent.click(screen.getByRole("button", { name: /Cancelar/i }))
    expect(onBack).toHaveBeenCalled()
  })

  it("dispara handleSubmit al hacer click en Crear Curso", () => {
    const handleSubmit = vi.fn()
    render(<Wrapper onBack={vi.fn()} isSubmitting={false} handleSubmit={handleSubmit} />)

    fireEvent.click(screen.getByRole("button", { name: /Crear Curso/i }))
    expect(handleSubmit).toHaveBeenCalled()
  })

  it("muestra 'Guardando...' cuando isSubmitting es true", () => {
    render(<Wrapper onBack={vi.fn()} isSubmitting={true} handleSubmit={vi.fn()} />)
    expect(screen.getByText("Guardando...")).toBeInTheDocument()
  })
})
