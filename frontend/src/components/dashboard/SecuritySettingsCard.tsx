import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Shield, KeyRound, BellRing } from 'lucide-react';

export function SecuritySettingsCard() {
  return (
    <Card className="shadow-lg rounded-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-6 w-6 text-primary" />
          Security Settings
        </CardTitle>
        <CardDescription>Manage your account security and preferences.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="two-factor-auth" className="font-medium">Two-Factor Authentication</Label>
            <p className="text-xs text-muted-foreground">Enhance your account security.</p>
          </div>
          <Switch id="two-factor-auth" aria-label="Toggle Two-Factor Authentication" />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="login-alerts" className="font-medium">Login Alerts</Label>
            <p className="text-xs text-muted-foreground">Get notified about new logins.</p>
          </div>
          <Switch id="login-alerts" defaultChecked aria-label="Toggle Login Alerts" />
        </div>
        <Button variant="outline" className="w-full">
          <KeyRound className="mr-2 h-4 w-4" /> Change Password
        </Button>
        <Button variant="outline" className="w-full">
          <BellRing className="mr-2 h-4 w-4" /> Manage Notification Preferences
        </Button>
      </CardContent>
    </Card>
  );
}
