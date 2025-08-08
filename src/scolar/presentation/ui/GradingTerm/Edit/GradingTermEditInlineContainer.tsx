import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useInjection } from "inversify-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { GradingTerm } from "@/scolar/domain/entities/grading_term";
import {
  UpdateGradingTermUseCase,
  UpdateGradingTermCommand,
} from "@/scolar/application/useCases/gradingTerms/updateGradingTermUseCase";
import { GRADING_TERM_UPDATE_USECASE } from "@/scolar/domain/symbols/GradingTermSymbol";
import { GradingTermEditPresenter } from "./GradingTermEditPresenter";

const formSchema = z.object({
  data: z.object({
    gradingSystem_id: z
      .number({ required_error: "Seleccione un sistema" })
      .positive(),
    academicYear_id: z
      .number({ required_error: "Seleccione un año" })
      .positive(),
    name: z.string().min(1, "El nombre es obligatorio"),
    order: z
      .number({ required_error: "El orden es obligatorio" })
      .min(1),
    weight: z
      .number({ required_error: "El peso es obligatorio" })
      .min(0)
      .max(1),
  }),
});

type FormValues = z.infer<typeof formSchema>;

interface Props {
  gradingTerm: GradingTerm;
  onUpdated: () => void;
  children: React.ReactNode;
}

export const GradingTermEditInlineContainer = ({
  gradingTerm,
  onUpdated,
  children,
}: Props) => {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const updateGT = useInjection<UpdateGradingTermUseCase>(
    GRADING_TERM_UPDATE_USECASE
  );
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      data: {
        gradingSystem_id: gradingTerm.gradingSystem_id,
        academicYear_id: gradingTerm.academicYear_id,
        name: gradingTerm.name,
        order: gradingTerm.order,
        weight: parseFloat(gradingTerm.weight),
      },
    },
    mode: "onChange",
  });

  const onSubmit = (values: FormValues) => {
    startTransition(async () => {
      const command = new UpdateGradingTermCommand(
        gradingTerm.id,
        values.data.gradingSystem_id,
        values.data.academicYear_id,
        values.data.name,
        values.data.order,
        values.data.weight.toString()
      );
      const res = await updateGT.execute(command);
      if (res.isLeft()) {
        const fail = res.extract();
        toast({
          title: "Error",
          description: fail.map((f) => f.getMessage()).join(", "),
          variant: "destructive",
        });
        return;
      }
      toast({
        title: "Período actualizado",
        description: "Cambios guardados",
        variant: "success",
      });
      onUpdated();
      setOpen(false);
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-2xl">
        <GradingTermEditPresenter
          form={form}
          onSubmit={onSubmit}
          onCancel={() => setOpen(false)}
          isSubmitting={isPending}
        />
      </DialogContent>
    </Dialog>
  );
};

