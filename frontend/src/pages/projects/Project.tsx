import { useEffect, useState } from "react";
import { FiFolder, FiDatabase } from "react-icons/fi";
import { getAllProjects } from "@/api/routes/project.api";
import type { ProjectDto } from "@/models/project";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/data-table/data-table";
import { ProjectColumns } from "./ProjectcColumn";
import CreateProjectModal from "./CreateProjectModal";

interface ProjectsPageState {
  isLoading: boolean;
  error: string | null;
}
export const handleExportProject = (
  project: ProjectDto,
  format: "csv" | "json" | "xml" | "sql",
) => {
  const timestamp = new Date().toISOString().split("T")[0];
  const projectNameSafe = project.name.replace(/\s+/g, "_");

  const exportFunctions = {
    csv: (p: ProjectDto) => {
      let csv = "Project Name,Entity Name,Attribute Name,Type,Constraints\n";
      p.entities?.forEach((entity) => {
        if ((entity.attributes || []).length === 0) {
          csv += `"${p.name}","${entity.name}","","",""\n`;
        } else {
          entity.attributes?.forEach((attr) => {
            csv += `"${p.name}","${entity.name}","${attr.name}","${attr.type}","${attr.constraints || ""}"\n`;
          });
        }
      });
      return csv;
    },
    json: (p: ProjectDto) => JSON.stringify(p, null, 2),
    xml: (p: ProjectDto) => {
      let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
      xml += `<project id="${p.id}" name="${p.name}">\n`;
      xml += `  <description>${p.description || ""}</description>\n`;
      xml += `  <entities>\n`;
      p.entities?.forEach((entity) => {
        xml += `    <entity id="${entity.id}" name="${entity.name}">\n`;
        xml += `      <attributes>\n`;
        entity.attributes?.forEach((attr) => {
          xml += `        <attribute id="${attr.id}" name="${attr.name}" type="${attr.type}" constraints="${attr.constraints || ""}"/>\n`;
        });
        xml += `      </attributes>\n`;
        xml += `    </entity>\n`;
      });
      xml += `  </entities>\n`;
      xml += `</project>`;
      return xml;
    },
    sql: (p: ProjectDto) => {
      let sql = `-- Dataset Schema for Project: ${p.name}\n`;
      sql += `-- Generated on ${new Date().toISOString()}\n\n`;
      p.entities?.forEach((entity) => {
        sql += `CREATE TABLE ${entity.name.toUpperCase()} (\n`;
        sql += `  id INT PRIMARY KEY AUTO_INCREMENT,\n`;
        entity.attributes?.forEach((attr, index) => {
          const isLastAttribute =
            index === (entity.attributes?.length || 0) - 1;
          let sqlType = "VARCHAR(255)";
          switch (attr.type.toLowerCase()) {
            case "integer":
              sqlType = "INT";
              break;
            case "float":
              sqlType = "FLOAT";
              break;
            case "boolean":
              sqlType = "BOOLEAN";
              break;
            case "date":
              sqlType = "DATE";
              break;
          }
          const constraint = attr.constraints ? ` ${attr.constraints}` : "";
          sql += `  ${attr.name} ${sqlType}${constraint}${isLastAttribute ? "" : ","}\n`;
        });
        sql += `);\n\n`;
      });
      return sql;
    },
  };

  const content = exportFunctions[format](project);
  const mimeTypes = {
    csv: "text/csv",
    json: "application/json",
    xml: "application/xml",
    sql: "application/sql",
  };

  const blob = new Blob([content], { type: mimeTypes[format] });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${projectNameSafe}_${timestamp}.${format}`;
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
};
const ProjectsPage = () => {
  const [projects, setProjects] = useState<ProjectDto[]>([]);
  const [state, setState] = useState<ProjectsPageState>({
    isLoading: true,
    error: null,
  });
  const fetchProjects = async () => {
    try {
      setState({ isLoading: true, error: null });
      const response = await getAllProjects();

      setProjects(response.data || []);
    } catch (error) {
      setState({
        isLoading: false,
        error: "Failed to load projects. Please try again.",
      });
      console.error("Error fetching projects:", error);
    } finally {
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  };
  
  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-b from-background to-muted/20 p-6">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header Section */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-3 rounded-lg">
                <FiDatabase className="size-6 text-primary" />
              </div>
              <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
            </div>
            <p className="text-muted-foreground">
              Manage your dataset generation projects and define entities with
              their attributes.
            </p>
          </div>
          <CreateProjectModal />
        </div>

        {/* Stats Section */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="border-primary/10">
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm font-medium text-muted-foreground">
                  Total Projects
                </p>
                <p className="text-3xl font-bold text-primary">
                  {projects.length}
                </p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-primary/10">
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm font-medium text-muted-foreground">
                  Total Entities
                </p>
                <p className="text-3xl font-bold">
                  {projects.reduce(
                    (sum, p) => sum + (p.entities?.length || 0),
                    0,
                  )}
                </p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-primary/10">
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm font-medium text-muted-foreground">
                  Total Attributes
                </p>
                <p className="text-3xl font-bold">
                  {projects.reduce(
                    (sum, p) =>
                      sum +
                      (p.entities?.reduce(
                        (entitySum, e) =>
                          entitySum + (e.attributes?.length || 0),
                        0,
                      ) || 0),
                    0,
                  )}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Projects Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FiFolder className="size-5 text-primary" />
              Projects List
            </CardTitle>
          </CardHeader>
          <CardContent>
            {state.error && (
              <div className="rounded-lg bg-destructive/10 p-4 text-destructive mb-4">
                {state.error}
              </div>
            )}

            {state.isLoading ? (
              <div className="flex h-40 items-center justify-center">
                <div className="text-center">
                  <div className="mb-4 inline-block animate-spin">
                    <FiDatabase className="size-8 text-primary" />
                  </div>
                  <p className="text-muted-foreground">Loading projects...</p>
                </div>
              </div>
            ) : projects.length === 0 ? (
              <div className="flex h-40 flex-col items-center justify-center gap-4">
                <FiFolder className="size-12 text-muted-foreground/50" />
                <div className="text-center">
                  <p className="font-medium">No projects yet</p>
                  <p className="text-sm text-muted-foreground">
                    Create your first project to get started
                  </p>
                </div>
                <CreateProjectModal />
              </div>
            ) : (
              <div className="overflow-x-auto">
                <DataTable columns={ProjectColumns} data={projects} />
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProjectsPage;
