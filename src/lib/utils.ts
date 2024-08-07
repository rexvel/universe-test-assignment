import { Nullish } from '@/types';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const encodePdfDataUrl = (pdfBase64: string | Nullish): string =>
  `data:application/pdf;base64,${pdfBase64 ?? ''}`;
