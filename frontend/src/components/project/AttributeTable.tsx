import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { EntityDto } from "@/models/entity";
import { FiTrash2 } from "react-icons/fi";
import UpdateAttributeFormModal from "./UpdateAttributeFormModal";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";
import { toast } from "sonner";
import { deleteAttribute } from "@/api/routes/attribute.api";
import { useState } from "react";

export default function AttributeTable({
  entity,
  refreshEntities,
}: {
  entity: EntityDto;
  refreshEntities: () => void;
}) {
  const [message, setMessage] = useState<string | null>(null);
  
  const onDeleteAttribute = async (attributeId: number) => {
    try {
      const response = await deleteAttribute(attributeId);
      if (response && response.status === 200) {
        toast.success(`Attribute deleted successfully!`);
        refreshEntities();
      } else {
        toast.error(`Failed to delete attribute. Please try again.`);
        return;
      }
      
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.message)
        setMessage(error.response.data.message);
      else setMessage(`Failed to delete attribute. Please try again. ${message || ""}`);

      toast.error(message);
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-muted/30">
          <TableHead>Attribute Name</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Constraints</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {(entity.attributes || []).map((attr) => (
          <TableRow key={attr.id}>
            <TableCell className="font-medium">{attr.name}</TableCell>
            <TableCell>
              <span className="inline-flex items-center rounded-full bg-blue-100 dark:bg-blue-900 px-3 py-1 text-xs font-medium text-blue-800 dark:text-blue-200">
                {attr.type}
              </span>
            </TableCell>
            <TableCell className="text-muted-foreground">
              {attr.constraints || "-"}
            </TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                <UpdateAttributeFormModal
                  attribute={attr}
                  entityDefinitionId={attr.id}
                  refreshEntities={refreshEntities}
                />
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="icon-sm">
                      <FiTrash2 className="size-4 text-destructive" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Confirmer la suppression
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        Êtes-vous sûr de vouloir supprimer l'attribut "
                        {attr.name}" ?
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Annuler</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => onDeleteAttribute(attr.id)}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        Supprimer
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
