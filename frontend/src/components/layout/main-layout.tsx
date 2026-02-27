import { Outlet } from "react-router-dom";
import { SiteHeader } from "../site-header";
import { SiteFooter } from "../site-footer";

export default function MainLayout() {
  return (
    <div className="h-min-screen flex flex-col ">
      <SiteHeader />
      <div className="container mx-auto px-4 min-h-[70vh] flex-1 py-8">
        <Outlet />
      </div>
      <SiteFooter />
    </div>
  );
}
