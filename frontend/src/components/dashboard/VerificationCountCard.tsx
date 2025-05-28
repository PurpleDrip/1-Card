import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MOCK_VERIFICATION_COUNT } from '@/lib/constants';
import { TrendingUp} from 'lucide-react';

// Using lucide-react's TrendingUp, as CheckBadgeIcon isn't standard.
// If a specific badge icon is needed, an SVG or a different icon library would be required.

export function VerificationCountCard() {
  return (
    <Card className="shadow-lg rounded-xl">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          Total Verifications
        </CardTitle>
        <TrendingUp className="h-5 w-5 text-primary" />
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-primary">
          {MOCK_VERIFICATION_COUNT}
        </div>
        <p className="text-xs text-muted-foreground pt-1">
          Number of times your OneCard has been used for KYC.
        </p>
      </CardContent>
    </Card>
  );
}
