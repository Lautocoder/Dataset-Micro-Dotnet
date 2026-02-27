
import {
  NavigationMenu,
  // NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  // NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";
import { Search, Rocket } from "lucide-react";
import { Button } from "./ui/button";

// const entityFeatures: { title: string; href: string; description: string }[] = [
//   {
//     title: "Entity Definition",
//     href: "/entities/create",
//     description:
//       "Define entities with custom attributes, types and constraints for your dataset.",
//   },
//   {
//     title: "Sub-Entities",
//     href: "/entities/sub-entities",
//     description:
//       "Create nested entities and define parent-child relationships.",
//   },
//   {
//     title: "Attribute Types",
//     href: "/entities/attributes",
//     description:
//       "Configure STRING, INTEGER, FLOAT, BOOLEAN, DATE and ENUM attribute types.",
//   },
//   {
//     title: "Constraints",
//     href: "/entities/constraints",
//     description: "Set min/max values, distributions and validation rules.",
//   },
//   {
//     title: "Browse Templates",
//     href: "/entities/templates",
//     description:
//       "Explore pre-built entity templates for common use cases.",
//   },
//   {
//     title: "Import Schema",
//     href: "/entities/import",
//     description:
//       "Import existing schemas from JSON or CSV files.",
//   },
// ];

// const exportFormats: { title: string; href: string; description: string }[] = [
//   {
//     title: "JSON Export",
//     href: "/export/json",
//     description: "Export datasets in JSON format with customizable structure.",
//   },
//   {
//     title: "CSV Export",
//     href: "/export/csv",
//     description: "Generate CSV files with headers and configurable delimiters.",
//   },
//   {
//     title: "XML Export",
//     href: "/export/xml",
//     description: "Create XML documents with proper schema definition.",
//   },
//   {
//     title: "SQL Export",
//     href: "/export/sql",
//     description: "Generate SQL INSERT statements for direct database import.",
//   },
// ];

export function NavigationMenuSite() {
  return (
    <NavigationMenu>
      <NavigationMenuList >
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link to="/">Dashboard</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link to="/projects">Projects</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        {/* <NavigationMenuItem>
          <NavigationMenuTrigger>Projects</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="w-96 p-3">
              <ListItem href="/projects" title="My Projects">
                View and manage all your dataset generation projects.
              </ListItem>
              <ListItem href="/projects/create" title="Create Project">
                Start a new dataset generation project from scratch.
              </ListItem>
              <ListItem href="/projects/templates" title="Templates">
                Choose from pre-built project templates (e-commerce, IoT, population).
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem className="hidden md:flex">
          <NavigationMenuTrigger>Entities</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-100 gap-2 md:w-125 md:grid-cols-2 lg:w-150 p-3">
              {entityFeatures.map((feature) => (
                <ListItem
                  key={feature.title}
                  title={feature.title}
                  href={feature.href}
                >
                  {feature.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Export</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-100 gap-2 md:w-100 md:grid-cols-2 p-3">
              {exportFormats.map((format) => (
                <ListItem
                  key={format.title}
                  title={format.title}
                  href={format.href}
                >
                  {format.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem> */}

        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link to="/docs/swagger-docs">Documentation</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link to="/search">
              <Search className="h-4 w-4" />
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link to="/generate">
              <Button size="sm" className="h-8 gap-1.5">
                <Rocket className="h-3.5 w-3.5" />
                Generate
              </Button>
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

// function ListItem({
//   title,
//   children,
//   href,
//   ...props
// }: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
//   return (
//     <li {...props}>
//       <NavigationMenuLink asChild>
//         <Link to={href}>
//           <div className="flex flex-col gap-1 text-sm">
//             <div className="leading-none font-medium">{title}</div>
//             <div className="text-muted-foreground line-clamp-2">{children}</div>
//           </div>
//         </Link>
//       </NavigationMenuLink>
//     </li>
//   );
// }
