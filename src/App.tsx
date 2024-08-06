import React, { useEffect, useState, useCallback } from 'react';
import useIndexedDB from '@/hooks/useIndexedDB';
import { Layout, Button, Textarea, Only, PDFViewer, SavedPDF } from '@/components';
import { convertToPdf } from '@/api';

import '@/App.css';
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';

export interface PdfFileData {
  text: string;
  pdfUrl: string | null;
}

const App: React.FC = () => {
  const [text, setText] = useState<string>('');
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [savedEntries, setSavedEntries] = useState<PdfFileData[]>([]);

  const { add, getAll, isReady } = useIndexedDB<PdfFileData>({
    dbName: 'PdfDatabase',
    storeName: 'pdfs',
    version: 1,
  });

  const loadSavedDocs = useCallback(async () => {
    if (isReady) {
      try {
        const entries = await getAll();
        setSavedEntries(entries);
      } catch (error) {
        console.error('Error loading saved entries:', error);
      }
    }
  }, [isReady, getAll]);

  useEffect(() => {
    loadSavedDocs();
  }, [loadSavedDocs]);

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
      setPdfUrl(url);
      await add({ text, pdfUrl: url });
      await loadSavedDocs();
    } catch (error) {
      console.error('Error converting to PDF:', error);
    }
  };

  return (
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
  );
};

export default App;
