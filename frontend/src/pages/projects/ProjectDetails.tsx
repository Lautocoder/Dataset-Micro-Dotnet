import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FiArrowLeft, FiGrid, FiLoader } from "react-icons/fi";
import { getProjectById } from "@/api/routes/project.api";
import type { ProjectDto } from "@/models/project";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StatCard from "../../components/project/StatCard";
import CreateEntityModal from "../../components/project/CreateEntityModal";
import EntitiesSection from "../../components/project/EntitiesSection";
import { toast } from "sonner";
import ProjectDetailsHeader from "@/components/project/ProjectDetailsHeader";

const ProjectDetails = () => {
  const { state } = useLocation();
  const projectId = state?.projectId;
  const navigate = useNavigate();

  const [project, setProject] = useState<ProjectDto | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      if (!projectId) {
        setIsLoading(false);
        setError("No Project selected");
        return;
      }
      try {
        setIsLoading(true);
        const response = await getProjectById(Number(projectId));
        setProject(response.data);
      } catch (err) {
        setError("Failed to load project details");
        console.error("Error fetching project:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProject();
  }, [projectId]);

  const handleRefreshEntities = async () => {
    if (!project) return;
    try {
      const response = await getProjectById(project.id);
      setProject(response.data);
    } catch (err) {
      toast.error("Failed to refresh entities");
      console.error("Error refreshing entities:", err);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-linear-to-b from-background to-muted/20 p-6 flex items-center justify-center">
        <div className="text-center">
          <FiLoader className="size-12 text-primary animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading project details...</p>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-linear-to-b from-background to-muted/20 p-6">
        <div className="mx-auto max-w-7xl">
          <Button
            variant="outline"
            onClick={() => navigate("/projects")}
            className="mb-6 gap-2"
          >
            <FiArrowLeft className="size-4" />
            Back to Projects
          </Button>
          <div className="rounded-lg bg-destructive/10 p-8 text-center text-destructive">
            {error || "Project not found"}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-background to-muted/20 p-6">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header */}
        <ProjectDetailsHeader project={project} />

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-2">
          <StatCard title="Entities" value={project.entities?.length || 0} />
          <StatCard
            title="Total Attributes"
            value={project.entities?.reduce(
              (sum, e) => sum + (e.attributes?.length || 0),
              0,
            )}
          />
        </div>

        {/* Entities Section */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <FiGrid className="size-5 text-primary" />
              <CardTitle>Entities & Attributes</CardTitle>
            </div>

            {/* Add Entity Dialog */}
            <CreateEntityModal
              projectId={project.id}
              refreshEntities={handleRefreshEntities}
            />
          </CardHeader>

          <CardContent>
            <EntitiesSection
              entities={project.entities}
              refreshEntities={handleRefreshEntities}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProjectDetails;
