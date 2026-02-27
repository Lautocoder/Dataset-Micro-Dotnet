import type { ProjectDto } from "@/models/project";
import {
  downloadFile,
} from "../../services/downloadFile";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  FiDownload,
} from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { exportDatasetProject } from "@/api/routes/project.api";
import { useState } from "react";

export default function ExportProjectButton({ project, type }: { project: ProjectDto | null, type?: "text"|"icon" }) {
  const [count, setCount] = useState(10); // Default number of records to export

  const getFilenameFromHeader = (contentDisposition?: string, fallback?: string): string => {
    if (!contentDisposition) return fallback || "project_export";
    const match = contentDisposition.match(/filename\*?=(?:UTF-8''|\")?([^\";]+)/i);
    if (!match?.[1]) return fallback || "project_export";
    return decodeURIComponent(match[1].trim());
  };

  const handleExport = async(format: "json" | "xml") => {
    if (!project) return;

    const exportCount = Number.isFinite(count) && count > 0 ? count : 10;
    const response = await exportDatasetProject(project.id, format, exportCount);
    const fallbackFilename = `${project.name || "project"}_export.${format}`;
    const filename = getFilenameFromHeader(response.headers["content-disposition"], fallbackFilename);
    const mimeType = response.data.type || (format === "json" ? "application/json" : "application/xml");

    downloadFile(response.data, filename, mimeType);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={type==="icon"?"ghost":"default"}  title={type==="icon"?"Export DataSet" : ""} className="gap-2 whitespace-nowrap">
          <FiDownload className="size-4"  />
          {type === "text" ? "Export Dataset" : "" }
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Export Dataset for Project: {project?.name}</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Choose the format and number of records to export for your dataset. You can export a sample of your data to quickly review the structure, or export the entire dataset for comprehensive analysis.
          </p>
          <div className="flex justify-between">
            <label htmlFor="count" className="mr-2 self-center text-sm">Number of records to export:</label>
          <input
          id="count"
            type="number"
            min={1}
            max={100}
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
            className=" rounded-md border px-2 py-1 w-24 text-sm"
            placeholder="Number of records to export"
          />
          </div>
          <div className="grid grid-cols-2 gap-2">
            {/* <Button
              variant="outline"
              onClick={() => handleExport("csv")}
              className="gap-2"
            >
              <FiDownload className="size-4" />
              CSV
            </Button> */}
            <Button
              variant="outline"
              onClick={() => handleExport("json")}
              className="gap-2"
            >
              <FiDownload className="size-4" />
              JSON
            </Button>
            <Button
              variant="outline"
              onClick={() => handleExport("xml")}
              className="gap-2"
            >
              <FiDownload className="size-4" />
              XML
            </Button>
            {/* <Button
              variant="outline"
              onClick={() => handleExport("sql")}
              className="gap-2"
            >
              <FiDownload className="size-4" />
              SQL
            </Button> */}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}