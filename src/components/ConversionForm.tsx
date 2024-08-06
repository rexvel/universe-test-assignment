import { ReactNode } from 'react';
import { Button } from './Button';
import { Textarea } from './Textarea';

export const ConversionForm = {
  Root: ({ children }: { children: ReactNode }) => (
    <main className="flex flex-col items-center justify-center space-y-4 max-w-md mx-auto">{children}</main>
  ),
  TextArea: () => <Textarea placeholder="Enter text to convert..." className="w-full min-h-[100px]" />,
  SubmitButton: ({ children }: { children: ReactNode }) => (
    <Button variant="secondary" className="w-full">
      {children}
    </Button>
  ),
};
