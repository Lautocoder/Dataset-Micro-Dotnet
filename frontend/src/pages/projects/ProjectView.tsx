import { getProjectPreview } from "@/api/routes/project.api";
import Loading from "@/components/common/Loading";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";
import ReactJsonView from "@microlink/react-json-view";

export default function ProjectView() {
  const { state } = useLocation();
  const projectId = state?.projectId;
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [dataSet, setDataSet] = useState<any>(null);

  const fetchProjectGenerate = async () => {
    if (!projectId) {
      setIsLoading(false);
      setError("No Project selected");
      return;
    }
    try {
      setIsLoading(true);
      const response = await getProjectPreview(Number(projectId));
      setDataSet(response.data);
    } catch (err) {
      setError("Failed to load project details");
      console.error("Error fetching project:", err);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchProjectGenerate();
  }, [projectId, navigate]);

  if (isLoading) {
    return <Loading title="Loading project preview..." />;
  }

  if (error || !dataSet) {
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
    <ReactJsonView
      src={dataSet}
      collapsed={2}
      name="Project Preview"
      theme="twilight"
      displayDataTypes={false}
      displayObjectSize={false}
      iconStyle="triangle"
      style={{ padding: "1rem", borderRadius: "0.5rem"}}
    />
  );
}
