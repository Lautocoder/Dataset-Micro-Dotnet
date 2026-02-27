import type { AddAttributeDto, AttributeDto, UpdateAttributeDto } from "@/models/attribute";
import type { ApiResponse } from "@/models/Response";
import { apiClient } from "../client";

export async function getAllAttributes(): Promise<ApiResponse<AttributeDto[]>> {
  const res = await apiClient.get(`/attributes`);
  return res.data;
}

export async function getAttributesByEntityId(id: number): Promise<ApiResponse<AttributeDto[]>> {
  const res = await apiClient.get(`/attributes/by-entity/${id}`);
  return res.data;
}

export async function getAttributeById(id: number): Promise<ApiResponse<AttributeDto>> {
  const res = await apiClient.get(`/attributes/${id}`);
  return res.data;
}

export async function addAttribute(attribute: AddAttributeDto): Promise<ApiResponse<number>> {
  const res = await apiClient.post("/attributes", attribute);
  return res.data;
}

export async function updateAttribute(id: number, attribute: UpdateAttributeDto): Promise<ApiResponse<number>> {
  const res = await apiClient.put(`/attributes/${id}`, attribute);
  return res.data;
}

export async function deleteAttribute(id: number): Promise<ApiResponse<number>> {
  const res = await apiClient.delete(`/attributes/${id}`);
  return res.data;
}