import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { INITIAL_DOCUMENTS } from "@/lib/constants";
import { ShieldCheck, ShieldAlert } from 'lucide-react';

export function OverallStatusCard() {
  const totalDocs = INITIAL_DOCUMENTS.length;
  const verifiedDocs = INITIAL_DOCUMENTS.filter(doc => doc.status === 'verified').length;
  const verificationProgress = totalDocs > 0 ? (verifiedDocs / totalDocs) * 100 : 0;
  const isFullyVerified = verifiedDocs === totalDocs && totalDocs > 0;

  return (
    <Card className="shadow-lg rounded-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {isFullyVerified ? <ShieldCheck className="h-6 w-6 text-green-500" /> : <ShieldAlert className="h-6 w-6 text-yellow-500" />}
          Verification Status
        </CardTitle>
        <CardDescription>
          {isFullyVerified ? "All your documents are verified!" : "Complete your document verification for full access."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-medium">Verification Progress</span>
            <span className="text-muted-foreground">{verifiedDocs} / {totalDocs} Documents Verified</span>
          </div>
          <Progress value={verificationProgress} aria-label={`${verificationProgress.toFixed(0)}% verified`} className={isFullyVerified ? '[&>div]:bg-green-500' : ''} />
          { !isFullyVerified && totalDocs > 0 && (
            <p className="text-xs text-muted-foreground pt-2">
                You have {totalDocs - verifiedDocs} document(s) remaining to complete your profile.
            </p>
          )}
          { totalDocs === 0 && (
             <p className="text-xs text-muted-foreground pt-2">
                Start by adding your documents to see your verification progress.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
