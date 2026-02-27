import EmptyEntitiesState from "./EmptyEntitiesState";
import EntityNode from "./EntityNode";
import type { EntityDto } from "@/models/entity";

type Props = {
  entities?: EntityDto[];
  refreshEntities: () => void;
};

const EntitiesSection = ({ entities, refreshEntities }: Props) => {
  if (!entities || entities.length === 0) {
    return <EmptyEntitiesState />;
  }

  return (
    <div className="space-y-4">
      {entities.map((entity) => (
        <EntityNode
          key={entity.id}
          entity={entity}
          refreshEntities={refreshEntities}
        />
      ))}
    </div>
  );
};

export default EntitiesSection;
