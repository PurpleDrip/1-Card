'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AuthLayout } from '@/components/auth-layout';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { registerUser } from '@/api/auth/registerUser';
import generateKeys from '@/utils/generateKeys';

export default function RegisterForm() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [address, setAddress] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const { toast } = useToast();

  const connectWallet = async () => {
    if (!window.ethereum) {
      throw new Error("MetaMask is not installed.");
    }
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    if (!accounts || accounts.length === 0) {
      throw new Error("No Ethereum accounts found.");
    }
    return accounts[0];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast({
        title: 'Password Mismatch',
        description: 'Please make sure your passwords match.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    try {
      const walletPublicAddress = await connectWallet();
      setAddress(walletPublicAddress);

      const { publicKey, privateKey } = generateKeys();
      setPrivateKey(privateKey);

      await registerUser(password, publicKey, walletPublicAddress);

      toast({
        title: 'Account Created',
        description: 'MATIC charged. Save your private key securely.',
      });

      setShowKey(true); // Show private key UI
    } catch (err: any) {
      console.log('Registration error:', err);
      const msg = err?.response?.data?.message || err.message || 'Something went wrong.';
      toast({
        title: 'Registration Failed',
        description: msg,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeySaved = () => {
    setShowKey(false);
    router.push('/dashboard');
  };

  return (
    <AuthLayout
      title="Create Your Null Card Account"
      description="Join us and take control of your digital identity."
    >
      {showKey ? (
        <div className="space-y-4">
          <Alert>
            <AlertTitle>Private Key (Only shown once)</AlertTitle>
            <AlertDescription className="break-words">
              {privateKey}
            </AlertDescription>
          </Alert>
          <Button onClick={handleKeySaved}>I've saved it safely</Button>
        </div>
      ) : (
        <form className="w-full space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-6">
            {address && (
              <p className="text-sm text-muted-foreground">Wallet Address: {address}</p>
            )}

            <Input
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            <Input
              required
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
            />

            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Registering...' : 'Create Account'}
            </Button>
          </div>
        </form>
      )}
    </AuthLayout>
  );
}
