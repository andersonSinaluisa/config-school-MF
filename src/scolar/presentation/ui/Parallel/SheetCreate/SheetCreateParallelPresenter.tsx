import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { CreateParallelUseCaseCommand } from "@/scolar/application/useCases/parallels/createParallelUseCase"
import { Course } from "@/scolar/domain/entities/course"
import { Section } from "@/scolar/domain/entities/section"
import { Control, Controller, UseFormRegister } from "react-hook-form"
import AsyncSelect from 'react-select/async';



interface SheetCreateParallelPresenter {
    course: Course;
    register: UseFormRegister<CreateParallelUseCaseCommand>
    onSearchSchoolYear: (search: string) => Promise<{
        label: string;
        value: string;
    }[]>;
    onSubmit: () => Promise<void>;
    control: Control<CreateParallelUseCaseCommand, CreateParallelUseCaseCommand>
    sections: Section[]
}
export const SheetCreateParallelPresenter = (props: SheetCreateParallelPresenter) => {

    return (

        <Sheet>
            <SheetTrigger asChild>
                <Button >Nuevo Paralelo</Button>
            </SheetTrigger>
            <SheetContent>
                <form onSubmit={props.onSubmit} >
                    <SheetHeader>
                        <SheetTitle>
                            Crear Paralelo para el curso {props.course.name}
                        </SheetTitle>
                        <SheetDescription>
                            Esta creando un nuevo paralelo para el curso {props.course.name}

                            <br />
                        </SheetDescription>
                    </SheetHeader>
                    <div className="grid flex-1 auto-rows-min gap-6 px-4">
                        <div className="grid gap-3">
                            <Label htmlFor="sheet-demo-name">
                                Nombre del Paralelo
                            </Label>
                            <Input
                                id="sheet-demo-name"
                                defaultValue="A"
                                {...props.register("data.name", { required: true })}
                            />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="sheet-demo-capacity">
                                Capacidad del Paralelo
                            </Label>
                            <Input
                                id="sheet-demo-capacity"
                                type="number"
                                defaultValue={30}
                                {...props.register("data.capacity", { required: true, valueAsNumber: true })}
                            />
                        </div>

                        <div className="grid gap-3">
                            <Label htmlFor="sheet-demo-sectionId">
                                Jornada
                            </Label>
                            <Controller
                                name="data.sectionId"
                                rules={{ required: true }}
                                control={props.control}
                                render={({ field }) => (
                                    <Select onValueChange={(value) => field.onChange(value)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Seleccionar nivel" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {
                                                props.sections.map((section) => (
                                                    <SelectItem key={section.id} value={section.id.toString()}>
                                                        {section.name}
                                                    </SelectItem>
                                                ))
                                            }
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="sheet-demo-schoolYearId">
                                Año Escolar
                            </Label>
                            <Controller
                                name="data.schoolYearId"
                                rules={{ required: true }}
                                control={props.control}
                                render={({ field }) => (
                                    <AsyncSelect
                                        
                                        cacheOptions
                                        defaultOptions
                                        loadOptions={props.onSearchSchoolYear}
                                        onChange={(option) => field.onChange(option?.value)}
                                        placeholder="Seleccione un año escolar"
                                    />
                                )}
                            />
                        </div>
                    </div>
                    <SheetFooter className="flex justify-between mt-10">
                        <Button type="submit">Save changes</Button>
                        <SheetClose asChild>
                            <Button variant="outline">Close</Button>
                        </SheetClose>
                    </SheetFooter>
                </form>
            </SheetContent>
        </Sheet>
    )
}