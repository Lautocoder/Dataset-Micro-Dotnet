import { FiGrid } from "react-icons/fi";

const EmptyEntitiesState = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-12">
      <FiGrid className="size-12 text-muted-foreground/50" />
      <div className="text-center">
        <p className="font-medium">No entities yet</p>
        <p className="text-sm text-muted-foreground">
          Create your first entity to start defining your dataset structure
        </p>
      </div>
    </div>
  );
};

export default EmptyEntitiesState;
