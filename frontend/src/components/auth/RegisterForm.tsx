'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AuthLayout } from '@/components/auth-layout';
import { useToast } from '@/hooks/use-toast';
import generateKeys from '@/utils/generateKeys';
import { generateNCid } from '@/utils/generateVCid';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { DOCUMENT_TYPES } from '@/lib/constants';
import { Label } from '../ui/label';
import { Paperclip } from 'lucide-react';
import { ethers, BrowserProvider } from "ethers";
import { checkForExistingUser } from '@/api/blockchain';
import { uploadDoc } from '@/api/pinata';
import { validateDoc } from '@/api/docs';
import { getPublicKey } from '@/api/extension';

const stages = [
  { title: "Connecting to Web3 Wallet", message:"An wallet is required to perform transaction and contact the Smart Contract",approxTime:10},
  { title: "Checking if user already exists", message: "Checking blockchain records", approxTime: 60 },
  { title: "Validating Document", message: "Checking authenticity", approxTime: 60 },
  { title: "Deleting the Document", message: "We want to store zero info about you.", approxTime: 60 },
  { title: "Creating Private Key", message: "Securely storing key", approxTime: 60 },
  { title: "On-Chain Registration", message: "Sending transaction", approxTime: 60 },
  { title: "Requesting Owner to Update Status", message: "Awaiting admin review", approxTime: 60 },
  { title: "Appending verified Doc on-chain", message: "Adding the given document on-chain to make to visible to everyone.", approxTime: 60 },
]; 

export default function RegisterForm({setShowModal,setStages,increementStageNumber,setStageNumber}:{
  setShowModal: (show: boolean) => void;
  setStages: (stages: any) => void;
  increementStageNumber: () => void;  
  setStageNumber:(stage:number)=>void
}) {

  useEffect(() => {
    setStages(stages);
  }, []);

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [address, setAddress] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [documentType, setDocumentType] = useState('');

  const router = useRouter();
  const { toast } = useToast();


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

    if (!documentType) {
      toast({
        title: 'Document Type Required',
        description: 'Please select a document type.',
        variant: 'destructive',
      });
      return;
    }

    if (!selectedFile) {
      toast({
        title: 'File Required',
        description: 'Please select a file to upload.',
        variant: 'destructive',
      });
      return;
    }

    setIsRegistering(true);
    setShowModal(true);
    
    try {
      const { publicKey, privateKey } = generateKeys();

      const formData = new FormData();
      formData.append('password', password);
      formData.append('publicKey', publicKey);
      // formData.append('VCid', VCid);
      // formData.append('address', address);
      formData.append('documentType', documentType);
      formData.append('documentFile', selectedFile);

      console.log('FormData contents:');
      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }

      //step-1 Wallet Connect
      const provider = new  BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const walletAddress = await signer.getAddress();
      setAddress(walletAddress);
      const NCid = generateNCid(walletAddress);
      increementStageNumber();

      //step-2 Check for user
      const promise=()=>new Promise((res,rej)=>{
        setTimeout(()=>{
          res("success");
        },5000)
      })
      const res1=await checkForExistingUser(signer,walletAddress);
      increementStageNumber();

      //step-5 validating the doc
      const fileName = selectedFile.name;
      const res4=await validateDoc(documentType,selectedFile)
      increementStageNumber();

      //step-6 deleting the doc
      const res5=await promise();
      increementStageNumber();

      //step-7 creating private key on extension
      const res6=await getPublicKey();
      increementStageNumber();

      //step-8 on-chain registration
      const res7=await promise();
      increementStageNumber();

      //step-9 requesting owner to update status
      const res8=await promise();
      increementStageNumber();

      //step-10 appending verified doc to chain
      const res9=await promise();

      toast({
        title: 'Data Prepared',
        description: 'FormData has been prepared and logged to console.',
      });

    } catch (err: any) {
      console.log('Registration error:', err);
      const msg = err?.response?.data?.message || err.message || 'Something went wrong.';
      toast({
        title: 'Registration Failed',
        description: msg,
        variant: 'destructive',
      });
    } finally {
      setIsRegistering(false);
      setShowModal(false)
      setStageNumber(0);
    }
  };

  return (
    <AuthLayout
      title="Create Your Null Card Account"
      description="Join us and take control of your digital identity."
    >
      <form className="w-full" onSubmit={handleSubmit}>
        <div>
          <div className="border-2 rounded-3xl p-4 border-green-500/40 mb-8">
            <div className="w-full">
              <h1 className="text-sm mb-4 font-semibold text-green-700">
                A document is required to register.
              </h1>
              <Select onValueChange={setDocumentType} disabled={isRegistering}>
                <SelectTrigger className="col-span-3" id="document-type">
                  <SelectValue placeholder="Select document type" />
                </SelectTrigger>
                <SelectContent>
                  {DOCUMENT_TYPES.map((docType) => (
                    <SelectItem key={docType.value} value={docType.value} disabled={isRegistering}>
                      <div className="flex items-center gap-2">
                        <docType.icon className="h-4 w-4 text-muted-foreground" />
                        {docType.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="mt-4">
              <Button
                asChild
                variant="outline"
                className="w-full justify-start text-muted-foreground"
                disabled={isRegistering}
              >
                <Label htmlFor="file-upload" className="cursor-pointer">
                  <Paperclip className="mr-2 h-4 w-4" />
                  {'Choose file...'}
                </Label>
              </Button>
              <Input
                id="file-upload"
                type="file"
                className="sr-only"
                disabled={isRegistering}
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    setSelectedFile(e.target.files[0]);
                  }
                }}
              />
              <p className="mt-1 text-xs text-muted-foreground">
                {selectedFile && `Selected: ${selectedFile?.name}`}
              </p>
            </div>
          </div>

          <Input
            required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="my-4"
            disabled={isRegistering}
          />
          <Input
            required
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            className="mb-4"
            disabled={isRegistering}
          />

          <Button type="submit" disabled={isRegistering} className="w-1/2">
            {isRegistering ? 'Registering...' : 'Create Account'}
          </Button>

          {address && (
            <p className="text-xs text-green-800 mt-2">
              Linked Wallet Address: {address}
            </p>
          )}
        </div>
      </form>
    </AuthLayout>
  );
}
