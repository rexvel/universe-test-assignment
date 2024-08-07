import React from 'react';
import { PdfFileData } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '../Card';

interface SavedPDFItemProps {
  entry: PdfFileData;
  onClick: (entry: PdfFileData) => void;
}

export const SavedPDFItem: React.FC<SavedPDFItemProps> = ({ entry, onClick }) => {
  return (
    <Card onClick={() => onClick(entry)} className="w-full mb-4 last:mb-0">
      <CardHeader>
        <CardTitle className="text-lg">{entry.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-500">Created: {new Date(entry.creationDate).toLocaleString()}</p>
      </CardContent>
    </Card>
  );
};
