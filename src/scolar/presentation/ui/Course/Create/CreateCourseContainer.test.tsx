import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import { vi } from "vitest"
import { CreateCourseContainer } from "./CreateCourseContainer"
import { useInjection } from "inversify-react"
import { toast } from "@/hooks/use-toast"
import { MemoryRouter } from "react-router-dom"
import { COURSE_CREATE_USECASE } from "@/scolar/domain/symbols/CourseSymbol"
import { LEVEL_LIST_USECASE } from "@/scolar/domain/symbols/LevelSymbol"

// 1. Mocks
vi.mock("inversify-react", () => ({
  useInjection: vi.fn(),
}))
vi.mock("@/hooks/use-toast", () => ({
  toast: vi.fn(),
}))
const mockNavigate = vi.fn()
vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal()
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

// 2. Stubs de casos de uso
const mockCreateCourse = { execute: vi.fn() }
const mockLevelList = { execute: vi.fn() }

describe("CreateCourseContainer", () => {
  beforeEach(() => {
    vi.clearAllMocks()
          ; (useInjection as any).mockImplementation((token:any) => {
              if (token === COURSE_CREATE_USECASE) return mockCreateCourse
              if (token === LEVEL_LIST_USECASE) return mockLevelList
          })
  })

  it("carga niveles al montar", async () => {
    mockLevelList.execute.mockResolvedValueOnce({
      isLeft: () => false,
      extract: () => ({ data: [{ id: 1, name: "Primaria" }], meta: {} }),
    })

    render(
      <MemoryRouter>
        <CreateCourseContainer />
      </MemoryRouter>
    )

    await waitFor(() => {
        const nivelSelect = screen.getByRole("combobox")
        expect(nivelSelect).toBeInTheDocument()
        //en el listado
    })
  })

  it("muestra toast de error si createCourse falla", async () => {
    mockLevelList.execute.mockResolvedValue({
      isLeft: () => false,
      extract: () => ({ data: [], meta: {} }),
    })
    mockCreateCourse.execute.mockResolvedValue({
      isLeft: () => true,
      extract: () => ["Error al crear"],
    })

    render(
      <MemoryRouter>
        <CreateCourseContainer />
      </MemoryRouter>
    )
    const buttons = await screen.findAllByRole("button", { name: /Crear Curso/i })
    expect(buttons).toHaveLength(2)
    fireEvent.click(buttons[0]) // clic en el primer botón

    await waitFor(() => {
      expect(toast).toHaveBeenCalledWith(
        expect.objectContaining({
          title: "Error",
          description: "Error al crear",
        })
      )
    })
    expect(mockNavigate).not.toHaveBeenCalled()
  })

  it("navega y muestra toast de éxito si createCourse tiene éxito", async () => {
    mockLevelList.execute.mockResolvedValue({
      isLeft: () => false,
      extract: () => ({ data: [], meta: {} }),
    })
    mockCreateCourse.execute.mockResolvedValue({
      isLeft: () => false,
      extract: () => ({}),
    })

    render(
      <MemoryRouter>
        <CreateCourseContainer />
      </MemoryRouter>
    )
    
    const buttons = await screen.findAllByRole("button", { name: /Crear Curso/i })
    expect(buttons).toHaveLength(2)
    fireEvent.click(buttons[0]) // clic en el primer botón

    await waitFor(() => {
      expect(toast).toHaveBeenCalledWith(
        expect.objectContaining({
          title: "Curso creado",
        })
      )
      expect(mockNavigate).toHaveBeenCalledWith("/cursos")
    })
  })
})
