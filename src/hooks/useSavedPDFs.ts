import { useState, useEffect, useCallback } from 'react';
import { PdfFileData } from '@/App';
import { useIndexedDB } from '@/hooks';
import { indexedDbConfig } from '@/constants';

export const useSavedPDFs = () => {
  const { add, getAll, isReady } = useIndexedDB<PdfFileData>(indexedDbConfig);
  const [savedEntries, setSavedEntries] = useState<PdfFileData[]>([]);

  const loadSavedPDF = useCallback(async () => {
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
    loadSavedPDF();
  }, [loadSavedPDF]);

  const addPdf = async (pdfData: PdfFileData) => {
    await Promise.all([add(pdfData), loadSavedPDF()]);
  };

  return {
    savedEntries,
    addPdf,
    loadSavedPDF,
    isReady,
  };
};
