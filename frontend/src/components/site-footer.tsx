import { useAuth } from "@/auth/AuthProvider";
import { cn } from "@/lib/utils";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Mail, Code2, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { TbDatabaseCog } from "react-icons/tb";

export function SiteFooter() {
  const { isAuthenticated } = useAuth();

  return (
    <footer className={cn("bg-zinc-950 dark:bg-muted text-zinc-200 w-full")}>
      {/* TOP */}
      <div className="pt-8 pb-8">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 md:gap-10 md:grid-cols-2 lg:grid-cols-12">
            {/* col-lg-3 */}
            <div className="lg:col-span-3">
              <div className="space-y-2 md:space-y-4">
                <Link
                  to="/"
                  className="flex items-center gap-2 justify-center md:justify-start"
                >
                  <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-primary text-primary-foreground">
                    <TbDatabaseCog className="h-5 w-5" />
                  </div>
                  <h2 className="text-xl font-bold text-white">
                    Dataset Generator
                  </h2>
                </Link>

                <p className="text-sm leading-relaxed text-zinc-400 text-center md:text-left">
                  A powerful Spring Boot REST API for generating custom datasets
                  with flexible entity definitions and multiple export formats.
                </p>
              </div>

              <div className="mt-2 md:mt-6">
                <ul className="flex justify-center md:justify-start gap-3">
                  <li>
                    <a
                      href="https://github.com/MBDS-HAITI/spring-project-rest-Lautocoder"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 hover:bg-white/10 transition-colors"
                      aria-label="GitHub Repository"
                    >
                      <FaGithub className="h-4 w-4" />
                    </a>
                  </li>

                  <li>
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 hover:bg-white/10 transition-colors"
                      aria-label="LinkedIn"
                    >
                      <FaLinkedin className="h-4 w-4" />
                    </a>
                  </li>

                  <li>
                    <Link
                      to="/docs"
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 hover:bg-white/10 transition-colors"
                      aria-label="Documentation"
                    >
                      <BookOpen className="h-4 w-4" />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* col-lg-2 */}
            <div className="lg:col-span-2">
              <h6 className="mb-2 md:mb-4 text-sm font-semibold uppercase tracking-wide text-white flex flex-col items-center md:items-start">
                Quick Links
              </h6>
              <ul className="space-y-2 text-sm text-zinc-400 flex flex-col items-center md:items-start">
                <li>
                  <Link className="hover:text-white transition-colors" to="/">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    className="hover:text-white transition-colors"
                    to="/projects"
                  >
                    My Projects
                  </Link>
                </li>
                <li>
                  <Link
                    className="hover:text-white transition-colors"
                    to="/projects/create"
                  >
                    Create Project
                  </Link>
                </li>
                <li>
                  <Link
                    className="hover:text-white transition-colors"
                    to="/docs"
                  >
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link
                    className="hover:text-white transition-colors"
                    to="/about"
                  >
                    About
                  </Link>
                </li>
              </ul>
            </div>

            {/* col-lg-2 */}
            <div className="hidden md:block lg:col-span-2">
              <h6 className="mb-2 md:mb-4 text-sm font-semibold uppercase tracking-wide text-white flex flex-col items-center md:items-start">
                Features
              </h6>
              <ul className="space-y-2 text-sm text-zinc-400 flex flex-col items-center md:items-start">
                <li>
                  <Link
                    className="hover:text-white transition-colors"
                    to="/entities/create"
                  >
                    Entity Definition
                  </Link>
                </li>
                <li>
                  <Link
                    className="hover:text-white transition-colors"
                    to="/entities/attributes"
                  >
                    Attribute Types
                  </Link>
                </li>
                <li>
                  <Link
                    className="hover:text-white transition-colors"
                    to="/export"
                  >
                    Data Export
                  </Link>
                </li>
                <li>
                  <Link
                    className="hover:text-white transition-colors"
                    to="/projects/templates"
                  >
                    Templates
                  </Link>
                </li>
                <li>
                  <Link
                    className="hover:text-white transition-colors"
                    to="/generate"
                  >
                    Generate Data
                  </Link>
                </li>
              </ul>
            </div>

            {/* col-lg-2 */}
            {/* My Account */}
            <div className="lg:col-span-2">
              <h6 className="mb-2 md:mb-4 text-sm font-semibold uppercase tracking-wide text-white flex flex-col items-center md:items-start">
                My Account
              </h6>
              <ul className="space-y-2 text-sm text-zinc-400 flex flex-col items-center md:items-start">
                {isAuthenticated ? (
                  <>
                    <li>
                      <Link className="hover:text-white" to="/account">
                        My Account
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link className="hover:text-white" to="/login">
                        SignIn
                      </Link>
                    </li>
                    <li>
                      <Link className="hover:text-white" to="/signup">
                        Signup
                      </Link>
                    </li>
                  </>
                )}

                <li>
                  <Link className="hover:text-white" to="/terms">
                    Terms
                  </Link>
                </li>
              </ul>
            </div>

            {/* col-lg-3 */}
            {/* Project Info */}
            <div className="lg:col-span-3">
              <h6 className="mb-2 md:mb-4 text-sm font-semibold uppercase tracking-wide text-white flex flex-col items-center md:items-start">
                Project Info
              </h6>

              <ul className="space-y-3 text-sm text-zinc-400 flex flex-col items-center md:items-start">
                <li className="flex gap-3">
                  <Code2 className="mt-0.5 h-4 w-4 text-zinc-300 shrink-0" />
                  <div>
                    <p className="text-zinc-400 text-xs mt-1">
                      Spring Boot REST API
                    </p>
                    <p className="text-zinc-400 text-xs mt-0.5">
                      MBDS Haiti - 2026
                    </p>
                  </div>
                </li>

                <li className="flex gap-3">
                  <Mail className="mt-0.5 h-4 w-4 text-zinc-300 shrink-0" />
                  <a
                    className="hover:text-white transition-colors"
                    href="mailto:contact@dataset-generator.dev"
                  >
                    contact@dataset-generator.dev
                  </a>
                </li>

                <li className="flex gap-3">
                  <BookOpen className="mt-0.5 h-4 w-4 text-zinc-300 shrink-0" />
                  <div>
                    <Link
                      className="hover:text-white transition-colors"
                      to="/docs/api"
                    >
                      API Documentation
                    </Link>
                    <p className="text-xs mt-1">REST API Reference & Guides</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="border-t border-white/10 py-3 md:py-4">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <p className="text-center text-sm text-zinc-400 md:text-left">
              © 2026 Dataset Generator. Built by Stanley LAFLEUR (MBDS Haiti)
              with Spring Boot & React.
            </p>
            <div className="flex justify-center gap-4 text-xs text-zinc-400">
              <Link
                to="/privacy"
                className="hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-white transition-colors">
                Terms of Use
              </Link>
              <a
                href="https://github.com/Master-2-MIAGE-MBDS-ANTENNES/spring-project-rest-Lautocoder"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors"
              >
                View Source
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
