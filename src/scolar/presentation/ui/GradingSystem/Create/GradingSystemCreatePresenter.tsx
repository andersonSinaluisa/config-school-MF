import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { Link } from "react-router-dom";
import { AlertCircle, Check, ChevronRight, HelpCircle, Home, Info, Save, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface FormValues {
  data: {
    name: string;
    description: string;
    numberOfTerms: number;
    passingScore: string;
  }
}

interface Props {
  form: UseFormReturn<FormValues>;
  onSubmit: (values: FormValues) => void;
  onCancel: () => void;
  isSubmitting: boolean;
}

export const GradingSystemCreatePresenter = ({ form, onSubmit, onCancel, isSubmitting }: Props) => {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <nav className="flex items-center text-sm text-muted-foreground mb-4">
          <Link to="/" className="hover:text-foreground transition-colors">
            <Home className="h-4 w-4" />
            <span className="sr-only">Inicio</span>
          </Link>
          <ChevronRight className="h-4 w-4 mx-1" />
          <Link to="/sistemas-calificacion" className="hover:text-foreground transition-colors">
            Sistema de Calificación
          </Link>
          <ChevronRight className="h-4 w-4 mx-1" />
          <span className="text-foreground font-medium">
            Sistema de Calificación
          </span>
        </nav>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
              <ShieldCheck className="h-8 w-8 text-primary-500" />
              Nuevo Sistema de calificación
            </h1>
            <p className="text-muted-foreground mt-1">
              Define un nuevo sistema de calificación para tu institución

            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => onCancel()} disabled={isSubmitting}>
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Guardando...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Guardar
                </>
              )}
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">

            <Card>
              <CardHeader>
                <CardTitle>Nuevo Sistema de Calificación</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="data.name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre del sistema</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="data.description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descripción general</FormLabel>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="data.numberOfTerms"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Número de períodos académicos</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormDescription>
                        Indica cuántos períodos (por ejemplo, bimestres o trimestres) conformarán este sistema de evaluación.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="data.passingScore"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Puntaje aprobatorio</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormDescription>
                        Define la nota mínima que un estudiante debe obtener para aprobar una materia.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
                  {isSubmitting ? "Guardando..." : "Guardar"}
                </Button>
              </CardFooter>
            </Card>

          </div>
          <div className="space-y-6">
            {/* Preview Card */}
            <Card>
              <CardHeader>
                <CardTitle>Vista Previa</CardTitle>
                <CardDescription>Así se verá el sistema de calificación después de guardar</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <ShieldCheck className="h-5 w-5 text-primary-500" />
                      <h3 className="font-medium">
                        {form.watch("data.name") || "Título del sistema de calificación"}
                      </h3>
                    </div>
                    <Badge className="bg-accent-300 text-accent-800 hover:bg-accent-400 border-accent-500">Activo</Badge>
                  </div>


                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">
                      {form.watch("data.description") || "Descripción proporcionada"}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {form.watch("data.numberOfTerms") > 0 ? (
                        Array.from({ length: form.watch("data.numberOfTerms") }, (_, i) => (
                          <Badge key={i} className="bg-secondary-100 text-secondary-800">
                            Periodo {i + 1}
                          </Badge>
                        ))
                      ) : (
                          <p className="text-sm text-muted-foreground">Aún no se han definido períodos</p>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Help Card */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center">
                  <Info className="h-4 w-4 mr-2 text-primary" />
                  Recomendaciones para completar el formulario
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start">
                    <Check className="h-4 w-4 mr-2 text-primary mt-0.5" />
                    <span>
                      Usa un nombre único y claro que permita identificar fácilmente el sistema de calificación.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 mr-2 text-primary mt-0.5" />
                    <span>
                      Redacta una descripción breve pero informativa que explique el objetivo del sistema.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 mr-2 text-primary mt-0.5" />
                    <span>
                      El número de períodos debe ser un entero positivo. Representa las divisiones académicas del año escolar (por ejemplo: 2 quimestres, 4 bimestres).
                    </span>
                  </li>
                  <li className="flex items-start">
                    <AlertCircle className="h-4 w-4 mr-2 text-destructive mt-0.5" />
                    <span>
                      Verifica que el nombre no esté duplicado para evitar ambigüedades o conflictos con otros sistemas ya registrados.
                    </span>
                  </li>
                </ul>

                <div className="mt-4 bg-blue-50 dark:bg-blue-900/20 p-3 rounded-md">
                  <div className="flex items-start">
                    <HelpCircle className="h-4 w-4 text-blue-500 mr-2 mt-0.5" />
                    <div className="text-xs">
                      <p className="font-medium text-blue-700 dark:text-blue-300">¿Tienes dudas?</p>
                      <p className="text-blue-600 dark:text-blue-400">
                        Revisa la documentación para obtener más detalles sobre cómo configurar correctamente un sistema de calificación.


                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </Form>
  );
};

