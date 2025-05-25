'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AuthLayout } from '@/components/auth-layout';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { connectWallet } from '@/lib/connectWallet';
import { generateNCid } from '@/utils/generateVCid';
import { registerUser, registerUserOnChain } from '@/api/auth/registerUser';
import { generateKeyPair } from 'node:crypto';
import { generateKeys } from '@/utils/generateKeys';

export default function RegisterForm() {
  const [showPrivateKey, setShowPrivateKey] = useState(false);
  const [step, setStep] = useState<'idle' | 'charging' | 'key' | 'extension'>('idle');
  const [walletConnected, setWalletConnected] = useState(false)

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [address, setAddress] = useState('');
  const [balance, setBalance] = useState('');

  const [privateKey, setPrivateKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleConnectWallet = async () => {
    setIsLoading(true);
    try {
      const walletResult = await connectWallet();
      if (!walletResult || !walletResult.address) {
        throw new Error('Could not retrieve wallet info');
      }
      setAddress(walletResult.address);
      setBalance(walletResult.balance);
      toast({
        title: 'Wallet Connected',
        description: 'Your wallet has been connected successfully.',
      });
      setWalletConnected(true)
    } catch (err) {
      console.error(err);
      toast({
        title: 'Wallet Connection Failed',
        description: 'Please ensure MetaMask is installed and try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {

    if(!walletConnected){
      toast({
        title:"Wallet not Linked",
        description:"A Wallet is required to register.",
        variant:"destructive"
      })
      return;
    }

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

      const OCid=generateNCid(address);

      await registerUser(address,OCid,password);
      const {publicKey,privateKey}=await generateKeys(address)
      await registerUserOnChain(OCid,publicKey)

      toast({
        title: 'Account Created',
        description: 'MATIC charged. Private key generated successfully.',
      });
    } catch (err) {
      console.error(err);
      toast({
        title: 'Transaction Failed',
        description: 'Could not complete the registration process.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Create Your Null Card Account"
      description="Join us and take control of your digital identity."
    >
      <form className="w-full space-y-6" onSubmit={(e) => e.preventDefault()}>
        {step === 'idle' && (
          <div className="space-y-6">
            {/* Wallet Connection */}
            <Button type="button" onClick={handleConnectWallet} disabled={isLoading || walletConnected}>
              {walletConnected? "Wallet Connected" : isLoading ? 'Connecting...' : 'Connect Wallet'}
            </Button>
            {address && (
              <p className="text-sm text-muted-foreground">Wallet Address: {address}</p>
            )}

            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            <Input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
            />

            <Button
              type="button"
              onClick={handleSubmit}
              disabled={!address || isLoading}
            >
              {isLoading ? 'Registering...' : 'Create Account'}
            </Button>
          </div>
        )}

      </form>
    </AuthLayout>
  );
}
