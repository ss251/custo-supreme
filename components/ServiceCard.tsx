// app/components/ServiceCard.tsx

import { Card, CardContent } from "@/components/ui/card";

export function ServiceCard({ icon, title, description }: { icon: any, title: any, description: any }) {
  return (
    <Card className="bg-background hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="mb-4">{icon}</div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
