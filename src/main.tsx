import React from 'react';
import App from '@/App';
import { pdfjs } from 'react-pdf';
import { createRoot } from 'react-dom/client';
import '@/index.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.mjs', import.meta.url).toString();

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
