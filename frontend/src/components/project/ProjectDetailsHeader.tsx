import { useNavigate } from "react-router-dom";
import { FiArrowLeft, FiDatabase } from "react-icons/fi";
import type { ProjectDto } from "@/models/project";
import { Button } from "@/components/ui/button";
import ExportProjectButton from "../../components/project/ExportProjectButton";
import ProjectPreviewSheet from "./ProjectPreviewSheet";

export default function ProjectDetailsHeader({
  project,
}: {
  project: ProjectDto;
}) {

  const navigate = useNavigate();

  return (
    <div>
      <Button
        variant="outline"
        onClick={() => navigate("/projects")}
        className="mb-6 gap-2"
      >
        <FiArrowLeft className="size-4" />
        Back to Projects
      </Button>

      <div className="flex justify-between gap-0">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-3 rounded-lg">
              <FiDatabase className="size-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                {project.name}
              </h1>
              {project.description && (
                <p className="text-muted-foreground">{project.description}</p>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-row gap-2">
          <ProjectPreviewSheet projectId={project.id} style="text" />
          {/* Export Button */}
          <ExportProjectButton project={project}type="text" />
        </div>
      </div>
    </div>
  );
}
