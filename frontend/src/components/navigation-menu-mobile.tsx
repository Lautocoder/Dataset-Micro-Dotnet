
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
import { 
  LayoutDashboard, 
  FolderKanban, 
  // Database, 
  // FileDown, 
  BookOpen } from "lucide-react";

// const projectOptions: { title: string; href: string; description: string }[] = [
//   {
//     title: "My Projects",
//     href: "/projects",
//     description:
//       "View and manage all your dataset generation projects.",
//   },
//   {
//     title: "Create Project",
//     href: "/projects/create",
//     description:
//       "Start a new dataset generation project from scratch.",
//   },
//   {
//     title: "Templates",
//     href: "/projects/templates",
//     description:
//       "Choose from pre-built project templates.",
//   },
// ];

// const entityOptions: { title: string; href: string; description: string }[] = [
//   {
//     title: "Entity Definition",
//     href: "/entities/create",
//     description:
//       "Define entities with custom attributes and types.",
//   },
//   {
//     title: "Sub-Entities",
//     href: "/entities/sub-entities",
//     description:
//       "Create nested entities with relationships.",
//   },
//   {
//     title: "Attribute Types",
//     href: "/entities/attributes",
//     description:
//       "Configure different attribute types and constraints.",
//   },
// ];

// const exportOptions: { title: string; href: string; description: string }[] = [
//   {
//     title: "JSON Export",
//     href: "/export/json",
//     description: "Export datasets in JSON format.",
//   },
//   {
//     title: "CSV Export",
//     href: "/export/csv",
//     description: "Generate CSV files with headers.",
//   },
//   {
//     title: "SQL Export",
//     href: "/export/sql",
//     description: "Generate SQL INSERT statements.",
//   },
// ];

export function NavigationMenuMobile() {
  return (
    <NavigationMenu>
      <NavigationMenuList className="grid grid-cols-1 ">
        <NavigationMenuItem className="flex px-4 items-baseline-last">
          <LayoutDashboard className="h-4 w-4" />
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link to="/"> Dashboard</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem className="flex px-4 items-baseline-last">
          <FolderKanban className="h-4 w-4" />
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link to="/projects">Projects</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        {/* <NavigationMenuItem className="flex px-4 items-baseline-last">
          <FolderKanban className="h-4 w-4" />
          <NavigationMenuTrigger>Projects</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="w-96 p-2">
              {projectOptions.map((option) => (
                <ListItem
                  key={option.title}
                  title={option.title}
                  href={option.href}
                >
                  {option.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem> 
        <NavigationMenuItem className="flex px-4 items-baseline-last">
          <Database className="h-4 w-4" />
          <NavigationMenuTrigger>Entities</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="w-96 p-2">
              {entityOptions.map((option) => (
                <ListItem
                  key={option.title}
                  title={option.title}
                  href={option.href}
                >
                  {option.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem className="flex px-4 items-baseline-last">
          <FileDown className="h-4 w-4" />
          <NavigationMenuTrigger>Export</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="w-96 p-2">
              {exportOptions.map((option) => (
                <ListItem
                  key={option.title}
                  title={option.title}
                  href={option.href}
                >
                  {option.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>*/}
        <NavigationMenuItem className="flex px-4 items-baseline-last">
          <BookOpen className="h-4 w-4" />
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link to="/docs/swagger-docs">Documentation</Link>
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
