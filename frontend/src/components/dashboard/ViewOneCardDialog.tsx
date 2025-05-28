"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MOCK_USER_PROFILE } from '@/lib/constants';
import { Copy, Eye, QrCode } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input"; // Assuming Input might be part of a more complex QR display later

interface ViewOneCardDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export function ViewOneCardDialog({ isOpen, onOpenChange }: ViewOneCardDialogProps) {
  const [ocIdVisible, setOcIdVisible] = useState(false);
  const { toast } = useToast();

  const handleCopyOcId = () => {
    navigator.clipboard.writeText(MOCK_USER_PROFILE.ocId)
      .then(() => {
        toast({
          title: "Copied!",
          description: "OneCard ID copied to clipboard.",
        });
      })
      .catch(err => {
        console.error("Failed to copy OCID: ", err);
        toast({
          title: "Error",
          description: "Failed to copy OneCard ID.",
          variant: "destructive",
        });
      });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6 text-primary"
            >
              <rect x="2" y="5" width="20" height="14" rx="2" />
              <line x1="2" y1="10" x2="22" y2="10" />
            </svg>
            Your OneCard ID
          </DialogTitle>
          <DialogDescription>Your unique identifier for seamless KYC.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="flex items-center justify-between p-3 bg-secondary rounded-md">
            <span className="font-mono text-sm sm:text-base break-all">
              {ocIdVisible ? MOCK_USER_PROFILE.ocId : `OCID-${MOCK_USER_PROFILE.ocId.substring(5, 9)}••••••••`}
            </span>
            <div className="flex gap-1">
              <Button variant="ghost" size="icon" onClick={() => setOcIdVisible(!ocIdVisible)} aria-label={ocIdVisible ? "Hide OCID" : "Show OCID"}>
                <Eye className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" onClick={handleCopyOcId} aria-label="Copy OCID">
                <Copy className="h-5 w-5" />
              </Button>
            </div>
          </div>
          <Button variant="outline" className="w-full" onClick={() => toast({ title: "QR Code", description: "QR Code display functionality to be implemented."})}>
            <QrCode className="mr-2 h-4 w-4" /> Show QR Code
          </Button>
          {/* Placeholder for QR Code display area */}
          {/* <div className="mt-4 p-4 border rounded-md text-center text-muted-foreground">
            QR Code will be displayed here.
          </div> */}
        </div>
      </DialogContent>
    </Dialog>
  );
}
