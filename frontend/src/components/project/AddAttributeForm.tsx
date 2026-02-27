import { addAttribute } from "@/api/routes/attribute.api";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Button } from "../ui/button";
import { FiPlus } from "react-icons/fi";
import { toast } from "sonner";

const formSchema = z.object({
  name: z
    .string()
    .min(5, "Attribute name must be at least 5 characters.")
    .max(50, "Attribute name must be at most 50 characters."),
  type: z.string().min(1, "Type Is required."),
  constraints: z.string().min(1, "Constraints Is required."),
  entityDefinitionId: z.number().min(1, "Entity Definition Is required."),
});

export default function AddAttributeForm({
  entityDefinitionId, refreshEntities
}: {
  entityDefinitionId: number;
  refreshEntities: () => void;
}) {
  const [message, setMessage] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        name: "",
        type: "",
        constraints: "String",
        entityDefinitionId: entityDefinitionId,
      },
    });

    async function onSubmit(data: z.infer<typeof formSchema>) {
      try {
        const response = await addAttribute(data);
        if (response && response.data) {
          form.reset();
          toast.success(`Attribute "${data.name}" created successfully!`);
          refreshEntities();
        }
      } catch (error: any) {
        if (error.response && error.response.data && error.response.data.message)
          setMessage(error.response.data.message);
        else setMessage(`Failed to create attribute. Please try again. ${message || ""}`);

        toast.error(message || `Failed to create attribute. Please try again.`);
      }

    }


  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
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
                  <FieldLabel htmlFor="form-rhf-demo-title">Constraints</FieldLabel>
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

        {/* <div className="space-y-2">
          <Label
            htmlFor={`attr-type-${entityDefinitionId}`}
            className="text-xs"
          >
            Type
          </Label>
          <select
            id={`attr-type-${entityDefinitionId}`}
            value={formState.type}
            onChange={(e) =>
              setFormState((prev) => ({
                ...prev,
                type: e.target.value,
              }))
            }
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option>String</option>
            <option>Integer</option>
            <option>Float</option>
            <option>Boolean</option>
            <option>Date</option>
          </select>
        </div>

        <div className="space-y-2">
          <Label
            htmlFor={`attr-constraints-${entityDefinitionId}`}
            className="text-xs"
          >
            Constraints
          </Label>
          <Input
            id={`attr-constraints-${entityDefinitionId}`}
            placeholder="e.g., NOT_NULL"
            value={formState.constraints}
            onChange={(e) =>
              setFormState((prev) => ({
                ...prev,
                constraints: e.target.value,
              }))
            }
            className="text-sm"
          />
        </div>*/}

        <div className="flex items-end">
          <Button type="submit" size="sm" className="w-full gap-2">
            <FiPlus className="size-4" />
            Add Attribute
          </Button>
        </div> 
      </div>
    </form>
  );
}
