import React from 'react';
import { PdfFileData } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components';

interface SavedPDFItemProps {
  entry: PdfFileData;
  onClick: (entry: PdfFileData) => void;
}

export const SavedPDFItem: React.FC<SavedPDFItemProps> = ({ entry, onClick }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('uk-UA', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }).format(date);
  };

  const displayedDate = formatDate(entry.creationDate);

  return (
    <Card onClick={() => onClick(entry)} className="w-full mb-4 last:mb-0">
      <CardHeader>
        <CardTitle className="text-lg">{entry.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-500">Created: {displayedDate}</p>
      </CardContent>
    </Card>
  );
};
