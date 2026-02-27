import type { AddEntityDto, EntityDto, UpdateEntityDto } from "@/models/entity";
import { apiClient } from "../client";
import type { ApiResponse } from "@/models/Response";

export async function getAllEntities(): Promise<ApiResponse<EntityDto[]>> {
  const res = await apiClient.get("/entities");
  return res.data;
}

export async function getEntityById(id: number): Promise<ApiResponse<EntityDto>> {
  const res = await apiClient.get(`/entities/${id}`);
  return res.data;
}

export async function getEntitiesByProjectId(id: number): Promise<ApiResponse<EntityDto[]>> {
  const res = await apiClient.get(`/entities/by-project/${id}`);
  return res.data;
}

export async function addEntity(entity: AddEntityDto): Promise<ApiResponse<number>> {
  const res = await apiClient.post("/entities", entity);
  return res.data;
}

export async function updateEntity(id: number, entity: UpdateEntityDto): Promise<ApiResponse<number>> {
  const res = await apiClient.put(`/entities/${id}`, entity);
  return res.data;
}

export async function deleteEntity(id: number): Promise<ApiResponse<number>> {
  const res = await apiClient.delete(`/entities/${id}`);
  return res.data;
}