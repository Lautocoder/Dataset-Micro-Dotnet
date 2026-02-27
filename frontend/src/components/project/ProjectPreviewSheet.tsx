import { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Loading from "@/components/common/Loading";
import ReactJsonView from "@microlink/react-json-view";
import { getProjectPreview } from "@/api/routes/project.api";
import { VscOpenPreview } from "react-icons/vsc";
type Props = {
  projectId: number;
  style: "text" | "icon";
};

export default function ProjectPreviewSheet({
  projectId,
  style = "text",
}: Props) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dataSet, setDataSet] = useState<any>(null);

  useEffect(() => {
    const fetchPreview = async () => {
      if (!open) return; // on charge seulement quand le sous-menu s’ouvre

      try {
        setIsLoading(true);
        setError(null);

        const response = await getProjectPreview(projectId);
        setDataSet(response.data);
      } catch (e) {
        setError("Failed to load project preview");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPreview();
  }, [open, projectId]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          size={style === "icon" ? "icon" : "default"}
          variant={style === "icon" ? "ghost" : "outline"}
          className={style === "icon" ? "p-2" : ""}
          title={style === "icon" ? "Preview Project Dataset" : ""}
        >
          {style === "icon" ? (
            <>
              <VscOpenPreview className="size-4" />
              <span className="sr-only">Preview</span>
            </>
          ) : (
            "Preview"
          )}
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="w-[60%] sm:w-160 overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Preview Project Dataset</SheetTitle>
        </SheetHeader>

        <div className="mt-4">
          {isLoading && <Loading title="Loading Preview Project Dataset..." />}

          {!isLoading && error && (
            <div className="rounded-lg bg-destructive/10 p-4 text-destructive">
              {error}
            </div>
          )}

          {!isLoading && !error && dataSet && (
            <ReactJsonView
              src={dataSet}
              collapsed={2}
              name="Project Preview"
              theme="twilight"
              displayDataTypes={false}
              displayObjectSize={false}
              iconStyle="triangle"
              style={{ padding: "1rem", borderRadius: "0.5rem" }}
            />
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
