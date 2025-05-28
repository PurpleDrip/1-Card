"use client";

import { useState, type FormEvent } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { DocumentInfo } from '@/types';
import { DOCUMENT_TYPES } from '@/lib/constants';
import { UploadCloud, Paperclip } from 'lucide-react';

interface UploadDocumentDialogProps {
  onDocumentAdd: (newDocument: DocumentInfo) => void;
  children: React.ReactNode;
}

export function UploadDocumentDialog({ onDocumentAdd, children }: UploadDocumentDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [documentType, setDocumentType] = useState<DocumentInfo['type'] | ''>('');
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!documentType || !file) {
      alert('Please select a document type and choose a file.');
      return;
    }

    const selectedDocType = DOCUMENT_TYPES.find(dt => dt.value === documentType);
    if (!selectedDocType) return;

    const newDocument: DocumentInfo = {
      id: crypto.randomUUID(),
      name: selectedDocType.label,
      type: selectedDocType.value,
      status: 'pending',
      icon: selectedDocType.icon,
      file: file,
      issueDate: new Date().toISOString().split('T')[0], // Placeholder issue date
    };
    onDocumentAdd(newDocument);
    setIsOpen(false);
    setDocumentType('');
    setFile(null);
    setFileName('');
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UploadCloud className="h-6 w-6 text-primary" />
            Add New Document
          </DialogTitle>
          <DialogDescription>
            Upload your document for verification. It will be securely processed.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="document-type" className="text-right">
                Type
              </Label>
              <Select value={documentType} onValueChange={(value) => setDocumentType(value as DocumentInfo['type'])}>
                <SelectTrigger className="col-span-3" id="document-type">
                  <SelectValue placeholder="Select document type" />
                </SelectTrigger>
                <SelectContent>
                  {DOCUMENT_TYPES.map((docType) => (
                    <SelectItem key={docType.value} value={docType.value}>
                      <div className="flex items-center gap-2">
                        <docType.icon className="h-4 w-4 text-muted-foreground" />
                        {docType.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="file-upload" className="text-right">
                File
              </Label>
              <div className="col-span-3">
                <Button asChild variant="outline" className="w-full justify-start text-muted-foreground">
                  <Label htmlFor="file-upload" className="cursor-pointer">
                    <Paperclip className="mr-2 h-4 w-4" />
                    {fileName || "Choose file..."}
                  </Label>
                </Button>
                <Input id="file-upload" type="file" className="sr-only" onChange={handleFileChange} />
                 {fileName && <p className="mt-1 text-xs text-muted-foreground">Selected: {fileName}</p>}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
            <Button type="submit" disabled={!documentType || !file}>
              <UploadCloud className="mr-2 h-4 w-4" />
              Upload & Verify
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
