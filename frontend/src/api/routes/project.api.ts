import type { AddProjectDto, ProjectDto, UpdateProjectDto } from "@/models/project";
import { apiClient } from "../client";
import type { ApiResponse } from "@/models/Response";
import type { AxiosResponse } from "axios";

export async function getAllProjects(): Promise<ApiResponse<ProjectDto[]>> {
  const res = await apiClient.get("/projects");
  return res.data;
}

export async function getProjectById(projectId: number): Promise<ApiResponse<ProjectDto>> {
  const res = await apiClient.get(`/projects/${projectId}`);
  return res.data;
}

export async function getProjectPreview(projectId: number): Promise<ApiResponse<string>> {
  const res = await apiClient.get(`/projects/${projectId}/preview`);
  return res.data;
} 

export async function exportDatasetProject(projectId: number, format: "csv" | "json" | "xml" | "sql", count: number): Promise<AxiosResponse<Blob>> {
  return await apiClient.get(`/projects/${projectId}/export?format=${format}&count=${count}`, {
    responseType: "blob",
    headers: {
      Accept: "application/octet-stream",
    },
  });
}

export async function addProject(projectData: AddProjectDto): Promise<ApiResponse<number>> {
  const res = await apiClient.post("/projects", projectData);
  return res.data;
}

export async function updateProject(projectId: number, projectData: UpdateProjectDto): Promise<ApiResponse<number>> {
  const res = await apiClient.put(`/projects/${projectId}`, projectData);
  return res.data;
}

export async function deleteProject(projectId: number): Promise<ApiResponse<number>> {
  const res = await apiClient.delete(`/projects/${projectId}`);
  return res.data;
}