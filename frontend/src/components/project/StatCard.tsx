import { Card, CardContent } from "@/components/ui/card";
import { FiGrid } from "react-icons/fi";

export default function StatCard({title, value}: {title:string, value:number}) {
  return (
    <Card className="border-primary/10">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              {title}
            </p>
            <p className="text-2xl font-bold text-primary">
              {value || 0}
            </p>
          </div>
          <FiGrid className="size-8 text-primary/30" />
        </div>
      </CardContent>
    </Card>
  );
}
