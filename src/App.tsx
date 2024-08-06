import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { convertToPdf } from '@/api';
import { Button, Textarea } from '@/components';
import PdfView from '@/components/PDFViewer';

import '@/App.css';
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import { Only } from '@/components/Only';

const App: React.FC = () => {
  const [text, setText] = useState<string>('');
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setText(event.target.value);
  };

  const handleConvert = async (): Promise<void> => {
    try {
      const url = await convertToPdf(text);
      setPdfUrl(url);
    } catch (error) {
      console.error('Error converting to PDF:', error);
    }
  };

  return (
    <Layout>
      <main className="flex flex-col items-center justify-center space-y-4 max-w-md mx-auto">
        <Textarea value={text} onChange={handleTextChange} />
        <Button onClick={handleConvert}>Convert file</Button>
        <Only when={pdfUrl}>
          <PdfView file={`data:application/pdf;base64,${pdfUrl}`} />
        </Only>
      </main>
    </Layout>
  );
};

export default App;
