import React from 'react';
import { Document, Page } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import { DEFAULT_PAGE_NUMBER } from '@/constants';
import { encodePdfDataUrl } from '@/lib/utils';
import { Nullish } from '@/types';
import { Card, CardContent } from './Card';

const options = {
  cMapUrl: '/cmaps/',
  standardFontDataUrl: '/standard_fonts/',
};

type Props = {
  pdfUrl: string | Nullish;
};

export const PDFViewer: React.FC<Props> = ({ pdfUrl }) => {
  console.log(pdfUrl);
  if (!pdfUrl) {
    return (
      <Card className="w-full h-[500px] flex items-center justify-center">
        <CardContent>
          <p className="text-gray-500 text-center">Select a PDF file to preview its content</p>
        </CardContent>
      </Card>
    );
  }
  const file = encodePdfDataUrl(pdfUrl);
  return (
    <div className="flex flex-col items-center  h-[600px]">
      <Document loading={<div className="text-center py-4">Loading PDF...</div>} file={file} options={options}>
        <div className="border border-gray-200 rounded-md overflow-hidden w-[490px]">
          <Page
            pageNumber={DEFAULT_PAGE_NUMBER}
            width={400}
            className="mx-auto"
            renderTextLayer={false}
            renderAnnotationLayer={false}
          />
        </div>
      </Document>
    </div>
  );
};
