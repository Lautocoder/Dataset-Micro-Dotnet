// src/models/project.ts
import type { EntityDto } from "./entity";

export interface ProjectDto {
  id: number;
  name: string;
  description?: string;
  entities: EntityDto[]; // dans ton DTO Java: new ArrayList<>() donc généralement toujours []
}

export interface AddProjectDto {
  name: string;
  description: string | null;
}

export interface UpdateProjectDto {
  name: string;
  description?: string;
}
