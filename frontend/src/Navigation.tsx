import { Routes, Route } from "react-router-dom";
import MainLayout from "@/components/layout/main-layout";
import Home from "@/pages/home/Home";
import PublicRoute from "./auth/PublicRoute.tsx";
import ProtectedRoute from "./auth/ProtectedRoute.tsx";
import NotFound from "./pages/not-found/NotFound.tsx";
import Project from "./pages/projects/Project.tsx";
import ProjectDetails from "./pages/projects/ProjectDetails.tsx";
import ApiDocsFrame from "./pages/docs/SwaggerDocs.tsx";
import ProjectView from "./pages/projects/ProjectView.tsx";

export default function Navigation() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route element={<PublicRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/projects" element={<Project />} />
          <Route path="/projects/details" element={<ProjectDetails />} />
          <Route path="/docs/swagger-docs" element={<ApiDocsFrame />} />
          <Route path="/docs/api" element={<ApiDocsFrame />} />
          <Route path="/projects/preview" element={<ProjectView />} />
        </Route>

        <Route element={<ProtectedRoute />}></Route>
        
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
