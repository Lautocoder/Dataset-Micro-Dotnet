import { Link, useNavigate } from "react-router-dom";
import { ThemeModeToggle } from "./theme/mode-toggle";
import {
  Command,
  Bell,
  LogOut,
  Menu,
  Settings,
  User,
  UserPlus,
  Rocket,
} from "lucide-react";
import { Button } from "./ui/button";

import {
  SheetContent,
  Sheet,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { useState } from "react";
import { useAuth } from "@/auth/AuthProvider";
import { NavigationMenuMobile } from "./navigation-menu-mobile";

export default function MobileMenu() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();


  const handleSignInClick = () => {
    setMobileMenuOpen(false);
    navigate("/login");
  };

  const handleSignUpClick = () => {
    setMobileMenuOpen(false);
    navigate("/signup");
  };

  const handleLogoutClick = () => {
    setMobileMenuOpen(false);
    logout();
  };

  const handleMyAccountClick = () => {
    setMobileMenuOpen(false);
    navigate("/account");
  };

  return (
    <div className="md:hidden flex items-center gap-2">
      {/* Theme Toggle - visible on all screens */}
      <div className="md:hidden flex items-center gap-1">
        <ThemeModeToggle />
        <Button variant="ghost" size="icon" className="h-9 w-9" asChild>
          <Link to="/generate">
            <Rocket className="h-4 w-4" />
          </Link>
        </Button>
      </div>

      {/* Quick Actions - visible on tablet */}
      <div className="hidden md:flex lg:hidden items-center gap-1">
        <Button variant="ghost" size="icon" className="h-9 w-9" asChild>
          <Link to="/notifications">
            <Bell className="h-4 w-4" />
          </Link>
        </Button>
        <Button variant="ghost" size="icon" className="h-9 w-9" asChild>
          <Link to="/settings">
            <Settings className="h-4 w-4" />
          </Link>
        </Button>
      </div>

      {/* Mobile/Tablet Menu */}
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetTrigger asChild className="lg:hidden">
          <Button variant="ghost" size="icon" className="h-9 w-9">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-75 sm:w-100  dark:bg-muted">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <div className="bg-sidebar text-sidebar-primary-foreground flex aspect-square size-10 items-center justify-center rounded-full">
                <Command className="size-4" />
              </div>
              {"Menu"}
            </SheetTitle>
          </SheetHeader>
          <div className="flex flex-col gap-4 mt-0">
            {/* Navigation */}
            <div className="flex flex-col pb-4 border-b">
              <NavigationMenuMobile />
            </div>

            {/* Quick Links */}
            <div className="flex flex-col gap-2 pb-4 border-b">
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => setMobileMenuOpen(false)}
                asChild
              >
                <Link to="/notifications">
                  <Bell className="mr-2 h-4 w-4" />
                  Notifications
                </Link>
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => setMobileMenuOpen(false)}
                asChild
              >
                <Link to="/settings">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Link>
              </Button>
              <Button
                className="w-full justify-start gap-2"
                onClick={() => setMobileMenuOpen(false)}
                asChild
              >
                <Link to="/generate">
                  <Rocket className="h-4 w-4" />
                  Generate Dataset
                </Link>
              </Button>
            </div>

            {/* User Actions */}
            <div className="flex flex-col gap-2 ">
              {isAuthenticated ? (
                <>
                  <Button
                    variant="ghost"
                    className="justify-start"
                    onClick={handleMyAccountClick}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    My Account
                  </Button>
                  <Button
                    variant="ghost"
                    className="justify-start"
                    onClick={handleLogoutClick}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="ghost"
                    className="justify-start"
                    onClick={handleSignInClick}
                  >
                    <User className="mr-2 h-4 w-4" />
                    Sign In
                  </Button>
                  <Button
                    variant="ghost"
                    className="justify-start"
                    onClick={handleSignUpClick}
                  >
                    <UserPlus className="mr-2 h-4 w-4" />
                    Sign Up
                  </Button>
                </>
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
