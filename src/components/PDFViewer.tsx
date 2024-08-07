import React from 'react';
import { Document, Page } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import '@react-pdf-viewer/core/lib/styles/index.css';

const options = {
  cMapUrl: '/cmaps/',
  standardFontDataUrl: '/standard_fonts/',
};

type Props = {
  file: string | ArrayBuffer | { data: ArrayBuffer };
};

export const PDFViewer: React.FC<Props> = ({ file }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="border border-gray-500">
        <Document
          loading={
            <div className="text-pink font-medium text-xl flex justify-center items-center h-full">Loading...</div>
          }
          file={file}
          options={options}
        >
          <Page width={400} />
        </Document>
      </div>
    </div>
  );
};
