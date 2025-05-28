import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MOCK_ACTIVITIES } from '@/lib/constants';
import type { ActivityItem as ActivityItemType } from '@/types';
import { History } from 'lucide-react';

function ActivityItem({ activity }: { activity: ActivityItemType }) {
  const Icon = activity.icon;
  return (
    <div className="flex items-start gap-3 p-3 hover:bg-secondary/50 rounded-md transition-colors">
      <Icon className="h-5 w-5 text-muted-foreground mt-1 flex-shrink-0" />
      <div>
        <p className="text-sm">{activity.description}</p>
        <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
      </div>
    </div>
  );
}

export function RecentActivitiesCard() {
  return (
    <Card className="shadow-lg rounded-xl flex flex-col h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <History className="h-6 w-6 text-primary" />
          Recent Activity
        </CardTitle>
        <CardDescription>Track your recent account activities and verifications.</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow overflow-hidden">
        {MOCK_ACTIVITIES.length > 0 ? (
        <ScrollArea className="h-[250px] pr-3"> {/* Adjust height as needed */}
          <div className="space-y-1">
            {MOCK_ACTIVITIES.map((activity) => (
              <ActivityItem key={activity.id} activity={activity} />
            ))}
          </div>
        </ScrollArea>
        ) : (
           <div className="text-center text-muted-foreground py-8">
            <p>No recent activity to display.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
