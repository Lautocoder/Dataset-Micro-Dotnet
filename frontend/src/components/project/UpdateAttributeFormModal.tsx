
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Button } from "../ui/button";
import { FiEdit2 } from "react-icons/fi";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import type { AttributeDto } from "@/models/attribute";
import z from "zod";
import { updateAttribute } from "@/api/routes/attribute.api";

const formSchema = z.object({
  id: z.number().min(1, "Attribute is required."),
  name: z
    .string()
    .min(5, "Attribute name must be at least 5 characters.")
    .max(50, "Attribute name must be at most 50 characters."),
  type: z.string().min(1, "Type Is required."),
  constraints: z.string(),
  entityDefinitionId: z.number().min(1, "Entity Definition Is required."),
});

export default function UpdateAttributeFormModal({
  attribute,
  entityDefinitionId,
  refreshEntities,
}: {
  attribute: AttributeDto;
  entityDefinitionId: number;
  refreshEntities: () => void;
}) {
  const [message, setMessage] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: attribute.id,
      name: attribute.name,
      type: attribute.type,
      constraints: attribute.constraints,
      entityDefinitionId: entityDefinitionId,
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      const response = await updateAttribute(data.id, data);
      if (response && response.data) {
        toast.success(`Attribute "${data.name}" Updated successfully!`);
        refreshEntities();
        setOpen(false);
      }
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.message)
        setMessage(error.response.data.message);
      else
        setMessage(
          `Failed to update attribute. Please try again. ${message || ""}`,
        );

      toast.error(message || `Failed to update attribute. Please try again.`);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className="w-auto">
        <Button  variant="ghost" className="gap-2">
           <FiEdit2 className="size-4 text-success" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Update Attribute</DialogTitle>
          <DialogDescription>
            Update attribute for your project by providing a name, type, and
            constraints.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 ">
            <div className="space-y-2">
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-demo-title">Name</FieldLabel>
                    <Input
                      {...field}
                      id="form-rhf-demo-title"
                      aria-invalid={fieldState.invalid}
                      placeholder="Entity name"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>
            <div className="space-y-2">
              <Controller
                name="type"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-demo-title">Type</FieldLabel>
                    <Input
                      {...field}
                      id="form-rhf-demo-title"
                      aria-invalid={fieldState.invalid}
                      placeholder="Entity type"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>
            <div className="space-y-2">
              <Controller
                name="constraints"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-demo-title">
                      Constraints
                    </FieldLabel>
                    <Input
                      {...field}
                      id="form-rhf-demo-title"
                      aria-invalid={fieldState.invalid}
                      placeholder="Entity constraints"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>

            <div className="flex items-end">
              <Button type="submit" size="sm" className="w-full gap-2">
                Update
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
