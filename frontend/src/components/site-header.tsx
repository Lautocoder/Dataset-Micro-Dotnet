import { Database, LogOut, User, UserPlus, Bell, Settings } from "lucide-react";
import { Separator } from "./ui/separator";
import TopLink from "./top-link";
import { NavigationMenuSite } from "./navigation-menu";
import { ThemeModeToggle } from "./theme/mode-toggle";
import { useAuth } from "@/auth/AuthProvider";
import { Button } from "./ui/button";
import MobileMenu from "./mobile-menu";
import { TbDatabaseCog } from "react-icons/tb";
import { Link } from "react-router-dom";

export function SiteHeader() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <header className="bg-background dark:bg-muted sticky top-0 left-0 right-0 z-50 w-full border-b md:border-none  shadow-lg shadow-b">
      {/* Top Bar - Hidden on mobile */}
      <div className="border-b hidden md:block bg-muted/50">
        <div className="container mx-auto flex h-10 justify-between items-center px-4">
          <div className="flex items-center space-x-3 text-muted-foreground text-sm">
            <div className="flex items-center gap-1.5">
              <Database className="h-3.5 w-3.5" />
              <span className="font-medium">Data Generation Platform</span>
            </div>
            <Separator orientation="vertical" className="h-4" />
            <div className="hidden lg:block text-xs">
              Spring REST Project - MBDS 2026
            </div>
          </div>
          <div>
            <div className="w-full">
              <div className="mx-auto flex h-9 max-w-7xl items-center justify-end px-4">
                <nav className="flex items-center">
                  <ThemeModeToggle />
                  <TopLink
                    icon={Bell}
                    label="Notifications"
                    to="/notifications"
                  />
                  <Separator orientation="vertical" className="mx-1 h-4" />

                  <TopLink icon={Settings} label="Settings" to="/settings" />
                  <Separator orientation="vertical" className="mx-1 h-4" />
                  {isAuthenticated ? (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 px-2 text-xs font-normal text-muted-foreground hover:text-foreground"
                      onClick={logout}
                    >
                      <div className="inline-flex items-center gap-1.5">
                        <LogOut className="h-3.5 w-3.5" />
                        <span>logout</span>
                      </div>
                    </Button>
                  ) : (
                    <div className="flex items-center">
                      <TopLink icon={User} label="Signin" to="/login" />
                      <Separator orientation="vertical" className="mx-1 h-4" />

                      <TopLink icon={UserPlus} label="Signup" to="/signup" />
                    </div>
                  )}
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto flex h-14 md:h-16 justify-between items-center px-4">
        <Link to="/">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center h-9 w-9 rounded-lg bg-primary text-primary-foreground">
              <TbDatabaseCog className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-base md:text-lg font-bold leading-none">
                Dataset Generator
              </span>
              <span className="text-xs text-muted-foreground hidden sm:block">
                Create & Export Data
              </span>
            </div>
          </div>
        </Link>
        {/* Desktop Navigation */}
        <div className="hidden lg:block">
          <NavigationMenuSite />
        </div>

        {/* Mobile/Tablet Actions */}
        <MobileMenu />
      </div>
    </header>
  );
}
