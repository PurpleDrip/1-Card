import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DASHBOARD_STATS } from "@/lib/constants";

export function DashboardStatsGrid() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {DASHBOARD_STATS.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.id} className="shadow-lg rounded-xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <Icon className="h-5 w-5 text-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.trend}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
