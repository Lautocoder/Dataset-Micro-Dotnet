import { API_PROJECT_URL } from "@/config/env";

export default function ApiDocsFrame() {
  return (
    <div className="h-[calc(100vh-120px)] w-full overflow-hidden rounded-xl border">
      <iframe
        src={`${API_PROJECT_URL}/swagger-ui/index.html`}
        className="h-full w-full"
        title="Swagger UI"
      />
    </div>
  );
}
