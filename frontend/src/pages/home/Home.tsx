import { Link } from "react-router-dom";
import {
  Database,
  FolderKanban,
  FileDown,
  Rocket,
  TrendingUp,
  Clock,
  Activity,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CreateProjectModal from "../projects/CreateProjectModal";

export default function Home() {
  // Données mockées pour la démo
  const stats = [
    {
      title: "Total Projects",
      value: "12",
      change: "+3 this month",
      icon: FolderKanban,
      trend: "up",
    },
    {
      title: "Entities Created",
      value: "48",
      change: "+12 this week",
      icon: Database,
      trend: "up",
    },
    {
      title: "Datasets Generated",
      value: "156",
      change: "+24 today",
      icon: Activity,
      trend: "up",
    },
    {
      title: "Exports",
      value: "89",
      change: "JSON, CSV, SQL",
      icon: FileDown,
      trend: "neutral",
    },
  ];

  const recentProjects = [
    {
      id: 1,
      name: "E-commerce Dataset",
      entities: 8,
      lastGenerated: "2 hours ago",
      status: "active",
    },
    {
      id: 2,
      name: "IoT Sensors",
      entities: 5,
      lastGenerated: "1 day ago",
      status: "active",
    },
    {
      id: 3,
      name: "Population Data",
      entities: 12,
      lastGenerated: "3 days ago",
      status: "completed",
    },
  ];

  const quickActions = [
    {
      title: "Create Project",
      description: "Start a new dataset generation project",
      icon: FolderKanban,
      href: "/projects/create",
      color: "primary",
    },
    {
      title: "Define Entity",
      description: "Create entities with custom attributes",
      icon: Database,
      href: "/entities/create",
      color: "secondary",
    },
    {
      title: "Generate Data",
      description: "Generate datasets from your definitions",
      icon: Rocket,
      href: "/generate",
      color: "accent",
    },
    {
      title: "Export Data",
      description: "Export in JSON, CSV, XML or SQL",
      icon: FileDown,
      href: "/export",
      color: "muted",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="border-b bg-muted/50">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
              Welcome to Dataset Generator
            </h1>
            <p className="text-lg text-muted-foreground mb-6">
              Create custom datasets with flexible entity definitions and export in multiple formats.
              Perfect for testing, demos, and machine learning projects.
            </p>
            <div className="flex flex-wrap gap-3">
              <CreateProjectModal />
              <Button asChild variant="outline" size="lg">
                <Link to="/docs/swagger-docs">
                  View API Documentation
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    {stat.trend === "up" && (
                      <TrendingUp className="h-3 w-3 text-green-600" />
                    )}
                    {stat.change}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold tracking-tight mb-4">Quick Actions</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <Card
                  key={index}
                  className="hover:border-primary transition-colors cursor-pointer group"
                >
                  <Link to={action.href}>
                    <CardHeader>
                      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-lg">{action.title}</CardTitle>
                      <CardDescription>{action.description}</CardDescription>
                    </CardHeader>
                  </Link>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Recent Projects */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold tracking-tight">Recent Projects</h2>
            <Button asChild variant="ghost">
              <Link to="/projects">View All</Link>
            </Button>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {recentProjects.map((project) => (
              <Card key={project.id} className="hover:border-primary transition-colors">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{project.name}</CardTitle>
                      <CardDescription className="flex items-center gap-2 mt-2">
                        <Database className="h-3 w-3" />
                        {project.entities} entities
                      </CardDescription>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      project.status === "active"
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                        : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                    }`}>
                      {project.status}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {project.lastGenerated}
                    </div>
                    <Button asChild size="sm" variant="outline">
                      <Link to={`/projects/${project.id}`}>
                        Open
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Getting Started */}
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Rocket className="h-5 w-5 text-primary" />
              Getting Started
            </CardTitle>
            <CardDescription>
              New to Dataset Generator? Follow these steps to create your first dataset.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="flex gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold">
                  1
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Create a Project</h4>
                  <p className="text-sm text-muted-foreground">
                    Define your dataset project with a name and description
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold">
                  2
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Define Entities</h4>
                  <p className="text-sm text-muted-foreground">
                    Add entities with attributes, types, and constraints
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold">
                  3
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Generate & Export</h4>
                  <p className="text-sm text-muted-foreground">
                    Generate data and export in your preferred format
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <Button asChild>
                <Link to="/docs">
                  Read Full Documentation
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
