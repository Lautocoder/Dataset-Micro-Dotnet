// src/models/attribute.ts

export interface AttributeDto {
  id: number;              // Long -> number
  name: string;
  type: string;
  constraints?: string;    // peut être null/absent côté backend
}

export interface AddAttributeDto {
  name: string;
  type: string;
  constraints?: string;
  entityDefinitionId: number;
}

export interface UpdateAttributeDto {
  name: string;
  type: string;
  constraints?: string;
  entityDefinitionId: number;
}
