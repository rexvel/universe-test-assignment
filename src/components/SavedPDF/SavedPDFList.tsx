import React from 'react';
import { PdfFileData } from '@/App';
import { SavedPDFItem } from '@/components/SavedPDF';

interface SavedPDFListProps {
  savedPdfData: PdfFileData[];
  onEntryClick: (pdf: PdfFileData) => void;
}

export const SavedPDFList: React.FC<SavedPDFListProps> = ({ savedPdfData, onEntryClick }) => {
  return (
    <ul>
      {savedPdfData.map((pdfData: PdfFileData) => (
        <SavedPDFItem key={pdfData.id} entry={pdfData} onClick={onEntryClick} />
      ))}
    </ul>
  );
};
