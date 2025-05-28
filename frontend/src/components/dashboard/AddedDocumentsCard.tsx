"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DocumentItem } from "./DocumentItem";
import { UploadDocumentDialog } from "./UploadDocumentDialog";
import type { DocumentInfo } from '@/types';
import { INITIAL_DOCUMENTS } from '@/lib/constants';
import { FilePlus2, Files } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

export function AddedDocumentsCard() {
  const [documents, setDocuments] = useState<DocumentInfo[]>(
    INITIAL_DOCUMENTS.filter(doc => doc.status !== 'not_uploaded')
  );

  const handleDocumentAdd = (newDocument: DocumentInfo) => {
    setDocuments(prevDocs => [...prevDocs, newDocument]);
    // Here you would typically call an API to upload and start verification
    // For now, we just update the local state.
    // You might also want to update INITIAL_DOCUMENTS or a shared state.
  };

  const uploadedDocuments = documents.filter(doc => doc.status !== 'not_uploaded');

  return (
    <Card className="flex flex-col h-full shadow-lg rounded-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Files className="h-6 w-6 text-primary" />
          Your Documents
        </CardTitle>
        <CardDescription>Manage your uploaded and verified documents.</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow overflow-hidden">
        {uploadedDocuments.length > 0 ? (
          <ScrollArea className="h-[200px] pr-3"> {/* Adjust height as needed */}
            <div className="space-y-2">
              {uploadedDocuments.map((doc) => (
                <DocumentItem key={doc.id} document={doc} />
              ))}
            </div>
          </ScrollArea>
        ) : (
          <div className="text-center text-muted-foreground py-8">
            <p>No documents added yet.</p>
            <p>Click "Add Document" to get started.</p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <UploadDocumentDialog onDocumentAdd={handleDocumentAdd}>
          <Button className="w-full">
            <FilePlus2 className="mr-2 h-4 w-4" /> Add Document
          </Button>
        </UploadDocumentDialog>
      </CardFooter>
    </Card>
  );
}
