import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import { updateEntity } from "@/api/routes/entity.api";
import { FiEdit2 } from "react-icons/fi";
import type { EntityDto } from "@/models/entity";

const formSchema = z.object({
  name: z
    .string()
    .min(5, "Entity name must be at least 5 characters.")
    .max(32, "Entity name must be at most 32 characters."),
  id: z.number().min(1, "Entity is required."),
});

export default function UpdateEntityModal({
  entity,
  refreshEntities,
}: {
  entity: EntityDto;
  refreshEntities: () => void;
}) {

  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: entity.name,
      id: entity.id,
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      const response = await updateEntity(data.id, {
        name: data.name
      });
      
      if (response && response.data) {
        toast.success(`Entity "${data.name}" Updated successfully!`);
        refreshEntities();
        // close the modal after success
        setOpen(false);
      }
    } catch (error) {
      toast.error(`Failed to update entity. Please try again.`);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className="w-auto">
        <Button variant={"ghost"} className="gap-2">
          <FiEdit2 className="size-4 text-success" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Update Entity</DialogTitle>
          <DialogDescription>
            Update the entity for your project by providing a new name.
          </DialogDescription>
        </DialogHeader>

        <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
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
            <Controller
              name="id"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <Input
                    {...field}
                    id="form-rhf-demo-id"
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                    hidden
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Update</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
