import React, { useState } from 'react';
import { Layout, Button, Textarea, Only, PDFViewer, SavedPDF, ErrorBoundary } from '@/components';
import { convertToPdf } from '@/api';
import { useSavedPDFs } from '@/hooks';

import '@/App.css';
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';

export interface PdfFileData {
  id?: string;
  text: string;
  pdfUrl: string | null;
}

const App: React.FC = () => {
  const [text, setText] = useState<string>('');
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  const { savedEntries, addPdf } = useSavedPDFs();

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
      await addPdf({ text, pdfUrl: url });
      setPdfUrl(url);
    } catch (error) {
      console.error('Error converting to PDF:', error);
    }
  };

  return (
    <ErrorBoundary
      fallback={({ error }) => (
        <div>
          <h2>Oops! Something went wrong.</h2>
          <pre>{error?.message}</pre>
        </div>
      )}
    >
      <Layout>
        <main className="flex h-screen">
          <div className="w-1/2 p-4 flex flex-col">
            <Textarea value={text} onChange={handleTextChange} className="flex-grow mb-4" />
            <Button onClick={handleConvert} className="w-full">
              Convert file
            </Button>
            <SavedPDF savedPdfData={savedEntries} className="mt-4">
              <SavedPDF.List savedPdfData={savedEntries} onEntryClick={handleSavedEntryClick} />
            </SavedPDF>
          </div>
          <div className="w-1/2 p-4 flex justify-center">
            <Only when={pdfUrl}>
              <PDFViewer file={`data:application/pdf;base64,${pdfUrl}`} />
            </Only>
          </div>
        </main>
      </Layout>
    </ErrorBoundary>
  );
};

export default App;
