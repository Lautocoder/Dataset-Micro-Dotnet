import React from "react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

export default function TopLink({
  icon: Icon,
  label,
  to = "#",
}: {
  icon: React.ElementType;
  label: string;
  to?: string;
}) {
  return (
    <Button
      asChild
      variant="ghost"
      size="sm"
      className="h-7 px-2 text-xs font-normal text-muted-foreground hover:text-foreground"
    >
      <Link to={to} className="inline-flex items-center gap-1.5">
        <Icon className="h-3.5 w-3.5" />
        <span>{label}</span>
      </Link>
    </Button>
  );
}
