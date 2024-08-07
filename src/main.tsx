import { StrictMode } from 'react';
import App from '@/App';
import '@/index.css';
import { pdfjs } from 'react-pdf';
import { createRoot } from 'react-dom/client';

pdfjs.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.mjs', import.meta.url).toString();

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
} else {
  console.error('Root element not found. Failed to initialize React app.');
}
