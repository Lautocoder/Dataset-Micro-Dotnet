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
import { addEntity, getEntitiesByProjectId } from "@/api/routes/entity.api";
import { FiPlus } from "react-icons/fi";
import type { AxiosError } from "axios";
import { useEffect, useState } from "react";
import type { EntityDto } from "@/models/entity";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

const formSchema = z.object({
  name: z
    .string()
    .min(5, "Project name must be at least 5 characters.")
    .max(32, "Project name must be at most 32 characters."),
  projectId: z.number().min(1, "Project Is required."),
  parentEntityId: z.number().nullable(),
});

export default function CreateEntityModal({
  projectId,
  refreshEntities,
}: {
  projectId: number;
  refreshEntities: () => void;
}) {
  const [message, setMessage] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [parentEntities, setParentEntities] = useState<EntityDto[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const fetchParentEntities = async () => {
    try {
      setIsLoading(true);
      const response = await getEntitiesByProjectId(projectId);
      const entities = response.data;
      setParentEntities(entities);
    } catch (error) {
      console.error("Error fetching parent entities:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isDialogOpen) {
      fetchParentEntities();
    }
  }, [isDialogOpen]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      projectId: projectId,
      parentEntityId: null,
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      const response = await addEntity(data);
      console.log({ response });

      if (response && response.data) {
        toast.success(`Entity "${data.name}" created successfully!`);

        refreshEntities();
        fetchParentEntities();
        form.reset();
      }
    } catch (error: AxiosError | any) {
      console.log(error.response.data.message);
      if (error.response && error.response.data && error.response.data.message)
        setMessage(error.response.data.message);
      else
        setMessage(
          `Failed to create entity. Please try again. ${message || ""}`,
        );
      toast.error(message || `Failed to create entity. Please try again.`);
    }
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild className="w-auto">
        <Button className="gap-2">
          <FiPlus className="size-4" />
          New Entity
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Entity</DialogTitle>
          <DialogDescription>
            Define a new entity for your project by providing a name.
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
              name="parentEntityId"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Parent Entity</FieldLabel>

                  <Select
                    value={field.value === null ? "none" : String(field.value)}
                    onValueChange={(value) =>
                      field.onChange(value === "none" ? null : Number(value))
                    }
                  >
                    <SelectTrigger aria-invalid={fieldState.invalid}>
                      <SelectValue placeholder="Select a parent entity" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="none">No Parent</SelectItem>

                      {parentEntities.map((entity) => (
                        <SelectItem key={entity.id} value={String(entity.id)}>
                          {entity.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="projectId"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <Input
                    {...field}
                    id="form-rhf-demo-title"
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
            <Button type="submit">Create</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
