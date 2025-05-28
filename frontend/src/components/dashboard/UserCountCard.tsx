
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from 'lucide-react';
import { MOCK_PLATFORM_USER_COUNT } from '@/lib/constants';

export function UserCountCard() {
  return (
    <Card className="shadow-lg rounded-xl">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          Total Platform Users
        </CardTitle>
        <Users className="h-5 w-5 text-primary" />
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-primary">
          {MOCK_PLATFORM_USER_COUNT.toLocaleString()}
        </div>
        <p className="text-xs text-muted-foreground pt-1">
          Current number of registered users on the platform.
        </p>
      </CardContent>
    </Card>
  );
}
