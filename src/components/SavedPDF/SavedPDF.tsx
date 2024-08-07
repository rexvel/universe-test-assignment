import React, { ReactNode } from 'react';
import { PdfFileData } from '@/App';
import { SAVED_DOCS_EMPTY_LENGTH } from '@/constants';
import { SavedPDFList } from '@/components/SavedPDF';

interface SavedPDFProps {
  savedPdfData: PdfFileData[];
  children: ReactNode;
  className?: string;
}

export const SavedPDF: React.FC<SavedPDFProps> & {
  List: typeof SavedPDFList;
} = ({ savedPdfData, children, className }) => {
  return (
    <div className={className}>
      <h3>Saved Entries</h3>
      {savedPdfData.length === SAVED_DOCS_EMPTY_LENGTH ? <p>No saved entries yet.</p> : children}
    </div>
  );
};

SavedPDF.List = SavedPDFList;
