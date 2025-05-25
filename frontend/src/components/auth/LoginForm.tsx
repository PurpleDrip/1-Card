'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AuthLayout } from '@/components/auth-layout';
import { useToast } from '@/hooks/use-toast';
import { BadgeInfo, KeyRound } from 'lucide-react';

export default function LoginForm() {
  const [vcId, setVcId] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);

    if (vcId === 'testuser' && password === 'password') {
      toast({
        title: 'Login Successful',
        description: 'Welcome back!',
      });
      router.push('/dashboard');
    } else {
      toast({
        title: 'Login Failed',
        description: 'Invalid VCid or password. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <AuthLayout title="Login to Your Account" description="Access your Null Card dashboard.">
      <form onSubmit={handleSubmit} className="w-full space-y-6">
        <div className="space-y-2">
          <Label htmlFor="vcid" className="flex items-center">
            <BadgeInfo className="mr-2 h-4 w-4 text-muted-foreground" />
            VCid
          </Label>
          <Input
            id="vcid"
            type="text"
            placeholder="Enter your VCid"
            value={vcId}
            onChange={(e) => setVcId(e.target.value)}
            required
            className="bg-input"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password" className="flex items-center">
            <KeyRound className="mr-2 h-4 w-4 text-muted-foreground" />
            Password
          </Label>
          <Input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="bg-input"
          />
        </div>
        <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-500 text-accent-foreground" disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </Button>
      </form>
    </AuthLayout>
  );
}
