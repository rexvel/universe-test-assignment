import React, { useState } from 'react';
import { Document, pdfjs, Page } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import '@react-pdf-viewer/core/lib/styles/index.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.mjs', import.meta.url).toString();

const options = {
  cMapUrl: '/cmaps/',
  standardFontDataUrl: '/standard_fonts/',
};

type Props = {
  file: string | ArrayBuffer | { data: ArrayBuffer };
};

const PdfView: React.FC<Props> = ({ file }) => {
  const [, setNumPages] = useState<number>(0);
  const [pageNumber] = useState<number>(1);
  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }): void => {
    setNumPages(numPages);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="border border-gray-500 max-w-[650px]">
        <Document
          loading={<div className="text-pink font-medium text-xl flex  justify-center items-center ">Loading...</div>}
          file={file}
          onLoadSuccess={onDocumentLoadSuccess}
          options={options}
        >
          <Page pageNumber={pageNumber} />
        </Document>
      </div>
    </div>
  );
};

export default PdfView;
