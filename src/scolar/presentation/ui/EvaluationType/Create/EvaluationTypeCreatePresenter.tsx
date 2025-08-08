import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
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

interface FormValues {
    data: {
        name: string;
        description: string;
        weight: number;
    }
}

interface Props {
  form: UseFormReturn<FormValues>;
  onSubmit: (values: FormValues) => void;
  onCancel: () => void;
  isSubmitting: boolean;
}

export const EvaluationTypeCreatePresenter = ({ form, onSubmit, onCancel, isSubmitting }: Props) => {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle>Nuevo Tipo de Evaluación</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="data.name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
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
                  <FormLabel>Descripción</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="data.weight"
              render={({ field }) => (
                <FormItem>
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
                    Define el peso relativo (0 a 1) de este tipo de evaluación.
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
              {isSubmitting ? 'Guardando...' : 'Guardar'}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};

