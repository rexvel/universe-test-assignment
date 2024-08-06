import React, { ReactNode } from 'react';
import { PdfFileData } from '@/App';
import { DOCS_NAME_MAX_DISPLAYED_CHARS, SAVED_DOCS_EMPTY_LENGTH } from '@/constants';

interface SavedPDFProps {
  savedPdfData: PdfFileData[];
  children: ReactNode;
  className?: string;
}

type SavedPDFList = Omit<SavedPDFProps, 'children'>;

interface SavedPDFListProps extends SavedPDFList {
  onEntryClick: (pdf: PdfFileData) => void;
}

interface ItemProps {
  entry: PdfFileData;
  onClick: (entry: PdfFileData) => void;
}

export const SavedPDF: React.FC<SavedPDFProps> & {
  List: React.FC<SavedPDFListProps>;
} = ({ savedPdfData, children }) => {
  return (
    <div>
      <h3>Saved Entries</h3>
      {savedPdfData.length === SAVED_DOCS_EMPTY_LENGTH ? <p>No saved entries yet.</p> : children}
    </div>
  );
};

const Item: React.FC<ItemProps> = ({ entry, onClick }) => {
  return (
    <li onClick={() => onClick(entry)}>
      {entry.text.substring(0, DOCS_NAME_MAX_DISPLAYED_CHARS)}
      {entry.text.length > DOCS_NAME_MAX_DISPLAYED_CHARS ? '...' : ''}
    </li>
  );
};

const List: React.FC<SavedPDFListProps> = ({ savedPdfData, onEntryClick }) => {
  return (
    <ul>
      {savedPdfData.map((pdfData: PdfFileData) => (
        <Item key={pdfData.id} entry={pdfData} onClick={onEntryClick} />
      ))}
    </ul>
  );
};

SavedPDF.List = List;
