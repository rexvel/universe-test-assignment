import { apiKey, apiURl } from '@/constants';

const handleErrorMessage = (error: unknown) => (error instanceof Error ? error.message : 'Unknown error');

export async function convertToPdf(text: string): Promise<string | null> {
  const apiUrl = `${apiURl}/create-pdf?apiKey=${apiKey}`;

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/pdf',
      },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const buffer = await response.arrayBuffer();
    const base64String = btoa(String.fromCharCode(...new Uint8Array(buffer)));
    return base64String;
  } catch (error) {
    console.error('Error generating PDF:', handleErrorMessage(error));
    return null;
  }
}
