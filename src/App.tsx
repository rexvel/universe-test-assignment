import React, { useState } from 'react';
import { Layout, Button, Textarea, PDFViewer, SavedPDF, ErrorBoundary, SavedPDFList } from '@/components';
import { useSavedPDFs } from '@/hooks';
import { convertToPdf } from '@/api';
import { ErrorFallback } from '@/components/Fallback';
import { Nullish, PdfFileData } from '@/types';

import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import '@/App.css';

const App: React.FC = () => {
  const [text, setText] = useState('');
  const [pdfUrl, setPdfUrl] = useState<string | Nullish>();

  const { savedPDFs, addPdf } = useSavedPDFs();

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setText(event.target.value);
  };

  const handleSavedEntryClick = (pdf: PdfFileData) => {
    setText(pdf.text);
    setPdfUrl(pdf.pdfUrl);
  };

  const handleConvert = async (): Promise<void> => {
    try {
      const url = await convertToPdf(text);
      await addPdf({
        text,
        pdfUrl: url,
        creationDate: new Date().toISOString(),
        name: 'Saved PDF file',
      });
      setPdfUrl(url);
    } catch (error) {
      console.error('Error converting to PDF:', error);
    }
  };
  return (
    <ErrorBoundary fallback={ErrorFallback}>
      <Layout>
        <main className="flex h-screen">
          <div className="w-1/2 p-4 flex flex-col">
            <Textarea value={text} onChange={handleTextChange} className="min-h-[100px] mb-4" />
            <Button onClick={handleConvert} className="w-full">
              Convert text to pdf
            </Button>
            <SavedPDF savedPdfData={savedPDFs} className="mt-4">
              <SavedPDFList savedPdfData={savedPDFs} onEntryClick={handleSavedEntryClick} />
            </SavedPDF>
          </div>
          <div className="w-1/2 p-4 flex justify-center">
            <PDFViewer pdfUrl={pdfUrl} />
          </div>
        </main>
      </Layout>
    </ErrorBoundary>
  );
};

export default App;
