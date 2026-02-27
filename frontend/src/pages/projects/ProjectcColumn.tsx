import { useState } from "react";
import DataTableColumnHeader from "@/components/data-table/data-table-column-header";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import type { ProjectDto } from "@/models/project";
import type { ColumnDef } from "@tanstack/react-table";
import {
  FiFolder,
  FiTrash2,
  FiAlertTriangle,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { deleteProject } from "@/api/routes/project.api";
import ExportProjectButton from "@/components/project/ExportProjectButton";
import UpdateProjectModal from "./UpdateProjectModal";

export const ProjectColumns: ColumnDef<ProjectDto>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
    cell: ({ row }) => {
      const v = row.getValue("description") as string | null | undefined;
      return <span className="text-muted-foreground">{v ?? "-"}</span>;
    },
  },
  {
    id: "entitiesCount",
    meta: { label: "Entities" },
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="# Entities"
        className="justify-center"
      />
    ),
    accessorFn: (row) => row.entities?.length ?? 0,
    cell: ({ row }) => {
      const n = row.getValue("entitiesCount") as number;
      return (
        <div className="flex w-full justify-center">
          <span className="inline-flex items-center justify-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
            {n}
          </span>
        </div>
      );
    },
  },
  {
    id: "attributesCount",
    meta: { label: "Attributes" },
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="# Attributes"
        className="justify-center"
      />
    ),
    accessorFn: (row) =>
      row.entities?.reduce((sum, e) => sum + (e.attributes?.length ?? 0), 0) ??
      0,
    cell: ({ row }) => {
      const n = row.getValue("attributesCount") as number;
      return (
        <div className="font-medium flex w-full justify-center">
          <span className="inline-flex items-center justify-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
            {n}
          </span>
        </div>
      );
    },
  },
  {
    id: "Actions",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Actions"
        className="flex justify-end pr-12"
      />
    ),
    cell: ({ row }) => {
      const navigate = useNavigate();
      const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

      const handleViewDetails = (id: number) => {
        navigate("/projects/details", { state: { projectId: id } });
      };

      const handleConfirmDelete = async (id: number) => {
        setDeleteDialogOpen(false);

        // Toast de chargement
        toast.loading("Deleting project...", { id: "delete-project" });

        try {
          await deleteProject(id);

          toast.success(`Project deleted successfully!`, {
            id: "delete-project",
            duration: 3000,
          });

          // Option 1: Rafraîchir après un court délai pour que l'utilisateur voie le toast
          setTimeout(() => {
            window.location.reload();
          }, 500);
        } catch (error) {
          toast.error(`Failed to delete project.`, {
            id: "delete-project",
            duration: 4000,
          });
        }
      };

      return (
        <div className="flex items-center justify-end gap-2">
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => handleViewDetails(row.original.id)}
            title="View details"
          >
            <FiFolder className="size-4" />
          </Button>
          <ExportProjectButton project={row.original} type="icon" />
          <UpdateProjectModal project={row.original} />

          {/* Delete Confirmation Dialog */}
          <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon-sm" title="Delete project">
                <FiTrash2 className="size-4 text-destructive" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-destructive/10 p-2">
                    <FiAlertTriangle className="size-5 text-destructive" />
                  </div>
                  <div>
                    <DialogTitle>Delete Project?</DialogTitle>
                  </div>
                </div>
                <DialogDescription className="mt-4 text-base">
                  Are you sure you want to delete{" "}
                  <span className="font-semibold text-foreground">
                    "{row.original.name}"
                  </span>
                  ? This action cannot be undone.
                </DialogDescription>
              </DialogHeader>
              <div className="rounded-lg bg-muted/50 p-3 text-sm text-muted-foreground">
                <p>This will also remove:</p>
                <ul className="mt-2 ml-4 list-disc space-y-1">
                  <li>{row.original.entities?.length || 0} entity/entities</li>
                  <li>
                    {row.original.entities?.reduce(
                      (sum, e) => sum + (e.attributes?.length ?? 0),
                      0,
                    ) ?? 0}{" "}
                    attribute(s)
                  </li>
                </ul>
              </div>
              <DialogFooter className="gap-2">
                <Button
                  variant="outline"
                  onClick={() => setDeleteDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleConfirmDelete(row.original.id)}
                >
                  Delete Project
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      );
    },
  },
];
