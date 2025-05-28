"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DocumentItem } from "./DocumentItem";
import type { DocumentInfo } from '@/types';
import { INITIAL_DOCUMENTS } from '@/lib/constants';
import { FileCheck2, Info } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useState } from 'react';
import { UploadDocumentDialog } from "./UploadDocumentDialog";


export function ConsiderAddingCard() {
  // This state would ideally be managed globally or fetched if documents can be added from here
  const [documents, setDocuments] = useState<DocumentInfo[]>(INITIAL_DOCUMENTS);

  const handleDocumentAdd = (newDocument: DocumentInfo) => {
    setDocuments(prevDocs => {
      const existingDocIndex = prevDocs.findIndex(doc => doc.type === newDocument.type && doc.status === 'not_uploaded');
      if (existingDocIndex !== -1) {
        const updatedDocs = [...prevDocs];
        updatedDocs[existingDocIndex] = { ...newDocument, id: prevDocs[existingDocIndex].id }; // Keep original ID
        return updatedDocs;
      }
      return [...prevDocs, newDocument]; // Should not happen if only "not_uploaded" are actionable
    });
  };


  const documentsToConsider = documents.filter(doc => doc.status === 'not_uploaded');

  return (
    <Card className="shadow-lg rounded-xl flex flex-col h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileCheck2 className="h-6 w-6 text-primary" />
          Complete Your Profile
        </CardTitle>
        <CardDescription>Add these documents to enhance your OneCard.</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        {documentsToConsider.length > 0 ? (
          <ScrollArea className="h-[180px] pr-3"> {/* Adjust height as needed */}
            <div className="space-y-2">
              {documentsToConsider.map((doc) => (
                 <div key={doc.id} className="flex items-center justify-between p-3 hover:bg-secondary/50 rounded-md transition-colors border">
                    <DocumentItem document={doc} />
                    <UploadDocumentDialog onDocumentAdd={handleDocumentAdd}>
                       <Button size="sm" variant="outline">Add</Button>
                    </UploadDocumentDialog>
                 </div>
              ))}
            </div>
          </ScrollArea>
        ) : (
          <div className="text-center text-muted-foreground py-8 flex flex-col items-center justify-center h-full">
            <Info className="h-10 w-10 mb-2 text-green-500" />
            <p className="font-semibold">All suggested documents added!</p>
            <p className="text-sm">Your profile is looking great.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
