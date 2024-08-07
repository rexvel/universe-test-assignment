export interface PdfFileData {
  id?: string;
  text: string;
  pdfUrl: string | null;
  creationDate: string;
  name: string;
}

export type Nullish = null | undefined;
