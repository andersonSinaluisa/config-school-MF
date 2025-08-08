import { format } from "date-fns";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useSystems } from "@/scolar/presentation/hooks/useSystems";
import { useAcademicYears } from "@/scolar/presentation/hooks/useAcademicYears";
import { GradingSystem } from "@/scolar/domain/entities/grading_system";
import { SchoolYear } from "@/scolar/domain/entities/school_year";
import { UseFormReturn } from "react-hook-form";

interface FormValues {
  data: {
    gradingSystem_id: number;
    academicYear_id: number;
    name: string;
    order: number;
    weight: number;
  };
}

interface Props {
  form: UseFormReturn<FormValues>;
  onSubmit: (values: FormValues) => void;
  onCancel: () => void;
  isSubmitting: boolean;
}

export const GradingTermEditPresenter = ({
  form,
  onSubmit,
  onCancel,
  isSubmitting,
}: Props) => {
  const systems = useSystems();
  const years = useAcademicYears();
  const selectedSystem = systems.find(
    (s: GradingSystem) => s.id === form.watch("data.gradingSystem_id")
  );
  const selectedYear = years.find(
    (y: SchoolYear) => y.id === form.watch("data.academicYear_id")
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle>Información del Período de Calificación</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="data.gradingSystem_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sistema de Calificación</FormLabel>
                    <Select
                      onValueChange={(value) => field.onChange(Number(value))}
                      value={field.value ? String(field.value) : ""}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione un sistema" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {systems.map((s) => (
                          <SelectItem key={s.id} value={String(s.id)}>
                            <div className="flex flex-col">
                              <span>{s.name}</span>
                              {s.description && (
                                <span className="text-xs text-muted-foreground">
                                  {s.description}
                                </span>
                              )}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Selecciona el sistema al que pertenece el período.
                    </FormDescription>
                    <FormMessage />
                    {selectedSystem && (
                      <p className="text-sm text-muted-foreground">
                        Sistema {selectedSystem.name}, {selectedSystem.description}
                      </p>
                    )}
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="data.academicYear_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Año Académico</FormLabel>
                    <Select
                      onValueChange={(value) => field.onChange(Number(value))}
                      value={field.value ? String(field.value) : ""}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione un año" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {years.map((y) => (
                          <SelectItem key={y.id} value={String(y.id)}>
                            <div className="flex flex-col">
                              <span>{y.name}</span>
                              <span className="text-xs text-muted-foreground">
                                {format(y.startDate, "dd/MM/yyyy")} -
                                {" "}
                                {format(y.endDate, "dd/MM/yyyy")}
                              </span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Selecciona el año académico correspondiente.
                    </FormDescription>
                    <FormMessage />
                    {selectedYear && (
                      <p className="text-sm text-muted-foreground">
                        {selectedYear.name} ({
                          format(selectedYear.startDate, "dd/MM/yyyy")
                        }
                        -
                        {format(selectedYear.endDate, "dd/MM/yyyy")})
                      </p>
                    )}
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="data.name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      Nombre descriptivo del período de calificación.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="data.order"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Orden</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormDescription>
                      Posición del período dentro del sistema.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="data.weight"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Peso</FormLabel>
                    <FormControl>
                      <Slider
                        min={0}
                        max={1}
                        step={0.05}
                        value={[field.value ?? 0]}
                        onValueChange={(val) => field.onChange(val[0])}
                      />
                    </FormControl>
                    <div className="text-sm text-muted-foreground mt-2">
                      Valor: {field.value?.toFixed(2)}
                    </div>
                    <FormDescription>
                      Define el peso relativo del período (0 a 1).
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || !form.formState.isValid}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Guardando...
                </>
              ) : (
                "Guardar"
              )}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};

