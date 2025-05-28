import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ONE_CARD_EXTENSION_LINK } from '@/lib/constants';
import { Puzzle, ExternalLink } from 'lucide-react';
import Image from "next/image";

export function InstallExtensionCard() {
  return (
    <Card className="shadow-lg rounded-xl overflow-hidden">
      <CardHeader className="bg-primary/10 p-4">
        <CardTitle className="flex items-center gap-2 text-primary">
          <Puzzle className="h-6 w-6" />
          OneCard Extension
        </CardTitle>
        <CardDescription className="text-primary/80">
          Unlock seamless KYC and manage your digital identity.
        </CardDescription>
      </CardHeader>
      <CardContent className=" text-center">
        <Image 
          src="/null.png" 
          alt="Browser Extension Illustration" 
          width={100} 
          height={150} 
          className="mx-auto mb-4 rounded-lg"
          data-ai-hint="browser extension" 
        />
        <p className="mb-4 text-sm text-muted-foreground">
          Install the OneCard browser extension to securely use your OneCard ID across the web.
        </p>
        <Button asChild className="w-full">
          <a href={ONE_CARD_EXTENSION_LINK} target="_blank" rel="noopener noreferrer">
            Install Extension <ExternalLink className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </CardContent>
    </Card>
  );
}
