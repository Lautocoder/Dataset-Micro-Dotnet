// src/models/entity.ts
import type { AttributeDto } from "./attribute";

export interface EntityDto {
  id: number;
  name: string;
  subEntities?: EntityDto[]; // parfois le backend peut renvoyer null 
  attributes?: AttributeDto[]; // parfois le backend peut renvoyer null 
}

export interface AddEntityDto {
  name: string;
  projectId: number;
  parentEntityId: number|null; 
}

// UpdateEntityDto n'a pas de @NotBlank/@NotNull en Java => souvent "patch-like"
export interface UpdateEntityDto {
  name: string;
}
