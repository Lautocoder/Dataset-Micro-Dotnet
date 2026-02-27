import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import AttributeTable from "@/components/project/AttributeTable";
import AddAttributeForm from "@/components/project/AddAttributeForm";
import { FiChevronDown, FiChevronRight, FiTrash2 } from "react-icons/fi";
import UpdateEntityModal from "./UpdateEntityModal";
import type { EntityDto } from "@/models/entity";
import { deleteEntity } from "@/api/routes/entity.api";
import { toast } from "sonner";



type Props = {
  entity: EntityDto;
  isExpanded: boolean;
  onToggle: () => void;
  refreshEntities: () => void;
};

const EntityCard = ({ entity, isExpanded, onToggle, refreshEntities }: Props) => {

  const onDelete = async (entityId: number) => {
      const response = await deleteEntity(entityId);
      if (response && response.status === 200) {
        toast.success(`Entity deleted successfully!`);
        refreshEntities();
  
      } else {
        toast.error(`Failed to delete entity. Please try again.`);
        return;
      }
    };
    
  return (
    <div className="border rounded-lg overflow-hidden">
      {/* Header */}
      <div className="bg-muted/30 px-4 py-3 flex items-center justify-between">
        <button
          onClick={onToggle}
          className="flex items-center gap-3 flex-1 text-left hover:opacity-75 transition-opacity"
        >
          {isExpanded ? (
            <FiChevronDown className="size-5 text-primary" />
          ) : (
            <FiChevronRight className="size-5 text-primary" />
          )}

          <div className="flex-1">
            <h3 className="font-semibold">{entity.name}</h3>
            <p className="text-sm text-muted-foreground">
              {entity.attributes?.length || 0} attributes {entity.subEntities?.length ? ` - ${entity.subEntities.length} sub-entities` : ""}
            </p>
          </div>
        </button>

        <div className="flex items-center gap-2">
          <UpdateEntityModal entity={entity} refreshEntities={refreshEntities} />
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" size="icon-sm">
                <FiTrash2 className="size-4 text-destructive" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
                <AlertDialogDescription>
                  Êtes-vous sûr de vouloir supprimer l'entité "{entity.name}" ?
                  Cette action est irréversible et supprimera également tous les attributs associés.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Annuler</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => onDelete(entity.id)}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Supprimer
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      {/* Content */}
      {isExpanded && (
        <div className="border-t p-4 space-y-4">
          {(entity.attributes || []).length > 0 && (
            <div className="overflow-x-auto">
              <AttributeTable entity={entity as EntityDto}  refreshEntities={refreshEntities}/>
            </div>
          )}

          <div className="border-t pt-4">
            <AddAttributeForm entityDefinitionId={entity.id} refreshEntities={refreshEntities} />
          </div>
        </div>
      )}
    </div>
  );
};

export default EntityCard;
