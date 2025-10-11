// CreateCoursePresenter.test.tsx
import { render, screen } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"
import { CreateCoursePresenter } from "./CreateCoursePresenter"
import { CreateCourseCommand } from "@/scolar/application/useCases/courses/createCourseUseCase"
import { Level } from "@/scolar/domain/entities/level"
import { Control, useForm } from "react-hook-form"
import { MemoryRouter } from "react-router-dom"

describe("CreateCoursePresenter", () => {
  const levels: Level[] = [
    { id: 1, name: "Primaria" } as Level,
    { id: 2, name: "Secundaria" } as Level,
  ]

  const formData: CreateCourseCommand =  new CreateCourseCommand("Matemáticas", 1, "Curso de álgebra básica")

  // ⚡️ necesitamos un control real de react-hook-form
  const Wrapper = (props: {
    onBack: () => void
    isSubmitting: boolean
    handleSubmit: (data: React.FormEvent) => void
  }) => {
    const { control, register,  } = useForm<CreateCourseCommand>({
      defaultValues: {
        data: formData.data
      },
    })
    return (
      <MemoryRouter>
      <CreateCoursePresenter
        onBack={props.onBack}
        isSubmitting={props.isSubmitting}
        handleSubmit={props.handleSubmit}
        formData={formData}
        levels={levels}
        register={register}
        control={control as unknown as Control<CreateCourseCommand, CreateCourseCommand>}
      />
      </MemoryRouter>
    )
  }

  it("debería renderizar el formulario con los datos iniciales", async() => {
    const mockOnBack = vi.fn()
    const mockHandleSubmit = vi.fn()

    render(
      <Wrapper
        onBack={mockOnBack}
        isSubmitting={false}
        handleSubmit={mockHandleSubmit}
      />
    )

    // Nombre y descripción se testean normal
    expect(screen.getByLabelText("Nombre")).toHaveValue("Matemáticas")
    expect(screen.getByLabelText("Descripción")).toHaveValue("Curso de álgebra básica")

    // Para nivel (Select de shadcn) usamos el combobox
    const nivelSelect = screen.getByRole("combobox")
    expect(nivelSelect).toHaveTextContent("Primaria")

    // También puedes validar en la vista previa
    const nivel =  screen.getAllByText("Primaria")
    expect(nivel).toHaveLength(2) // Uno en el select y otro en la vista previa
  })

  // Puedes agregar más tests aquí para interacciones, validaciones, etc.
  it("debería llamar a onBack cuando se hace clic en el botón Atrás", async() => {
    const mockOnBack = vi.fn()
    const mockHandleSubmit = vi.fn()
      
    render(
      <Wrapper
        onBack={mockOnBack}
        isSubmitting={false}
        handleSubmit={mockHandleSubmit}
      />
    )
    const backButton = screen.getByRole("button", { name: /Cancelar/i })
    backButton.click()
    expect(mockOnBack).toHaveBeenCalled()
  })
  it("debería mostrar 'Crear Curso' cuando el formulario no se está enviando", async() => {
    render(
      <Wrapper
        onBack={vi.fn()}
        isSubmitting={false}
        handleSubmit={vi.fn()}
      />
    )

    const button = await screen.findAllByRole("button", { name: /Crear Curso/i })
    expect(button).toHaveLength(2)
    expect(button[0]).not.toBeDisabled()
    expect(button[1]).not.toBeDisabled()
  })

  it("debería mostrar 'Guardando...' y estar deshabilitado mientras se envía el formulario", async() => {
    render(
      <Wrapper
        onBack={vi.fn()}
        isSubmitting={true}
        handleSubmit={vi.fn()}
      />
    )

    const button = await screen.findAllByRole("button", { name: /Guardando.../i })
    expect(button).toHaveLength(2)
    expect(button[0]).toBeDisabled()
    expect(button[1]).toBeDisabled()
    expect(button[0].querySelector(".animate-spin")).toBeTruthy()
    expect(button[1].querySelector(".animate-spin")).toBeTruthy()
    // opcional: verificar que el spinner aparezca

  })
})