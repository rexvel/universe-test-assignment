import React from 'react';
import { PdfFileData } from '@/types';
import { ScrollArea, SavedPDFItem } from '@/components';

interface SavedPDFListProps {
  savedPdfData: PdfFileData[];
  onEntryClick: (pdf: PdfFileData) => void;
}

export const SavedPDFList: React.FC<SavedPDFListProps> = ({ savedPdfData, onEntryClick }) => {
  return (
    <>
      <ScrollArea className="h-[200px] rounded-md border p-4 flex-start">
        <div className="flex flex-col items-start">
          {savedPdfData.map((pdfData: PdfFileData) => (
            <SavedPDFItem key={pdfData.id} entry={pdfData} onClick={onEntryClick} />
          ))}
        </div>
      </ScrollArea>
    </>
  );
};
