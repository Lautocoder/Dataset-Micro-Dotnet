import { useState } from "react";
import type { EntityDto } from "@/models/entity";
import EntityCard from "./EntityCard";

type Props = {
  entity: EntityDto;
  level?: number;
  refreshEntities: () => void;
};

const EntityNode = ({ entity, level = 0, refreshEntities }: Props) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div>
      <div style={{ marginLeft: level * 16 }}>
        <EntityCard
          entity={entity}
          isExpanded={expanded}
          onToggle={() => setExpanded((v) => !v)}
          refreshEntities={refreshEntities}
        />
      </div>

      {expanded && (entity.subEntities?.length ?? 0) > 0 && (
        <div className="mt-3 space-y-3 border-l pl-4">
          {entity.subEntities!.map((child) => (
            <EntityNode
              key={child.id}
              entity={child}
              level={level + 1}
              refreshEntities={refreshEntities}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default EntityNode;
