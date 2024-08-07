import React from 'react';
import { PdfFileData } from '@/App';
import { DOCS_NAME_MAX_DISPLAYED_CHARS } from '@/constants';

interface SavedPDFItemProps {
  entry: PdfFileData;
  onClick: (entry: PdfFileData) => void;
}

export const SavedPDFItem: React.FC<SavedPDFItemProps> = ({ entry, onClick }) => {
  return (
    <li onClick={() => onClick(entry)}>
      {entry.text.substring(0, DOCS_NAME_MAX_DISPLAYED_CHARS)}
      {entry.text.length > DOCS_NAME_MAX_DISPLAYED_CHARS ? '...' : ''}
    </li>
  );
};
