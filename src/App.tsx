import React, { useState } from 'react';
import { Layout, Button, Textarea, Only, PDFViewer, SavedPDF, ErrorBoundary, SavedPDFList } from '@/components';
import { useSavedPDFs } from '@/hooks';
import { convertToPdf } from '@/api';
import { encodePdfDataUrl } from '@/lib/utils';
import { ErrorFallback } from '@/components/Fallback';
import { Nullish, PdfFileData } from '@/types';

import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import '@/App.css';

const App: React.FC = () => {
  const [text, setText] = useState('');
  const [pdfUrl, setPdfUrl] = useState<string | Nullish>();

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
    <ErrorBoundary fallback={ErrorFallback}>
      <Layout>
        <main className="flex h-screen">
          <div className="w-1/2 p-4 flex flex-col">
            <Textarea value={text} onChange={handleTextChange} className="flex-grow mb-4" />
            <Button onClick={handleConvert} className="w-full">
              Convert text to pdf
            </Button>
            <SavedPDF savedPdfData={savedEntries} className="mt-4">
              <SavedPDFList savedPdfData={savedEntries} onEntryClick={handleSavedEntryClick} />
            </SavedPDF>
          </div>
          <div className="w-1/2 p-4 flex justify-center">
            <Only when={pdfUrl}>
              <PDFViewer file={encodePdfDataUrl(pdfUrl)} />
            </Only>
          </div>
        </main>
      </Layout>
    </ErrorBoundary>
  );
};

export default App;
