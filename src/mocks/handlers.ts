import { http, HttpResponse } from 'msw';

interface CreatePdfRequestBody {
  text: string;
}

const API_KEY = '';

// TODO move url to constants
export const handlers = [
  http.post<CreatePdfRequestBody>(`http://95.217.134.12:4010/create-pdf`, async ({ request }) => {
    const url = new URL(request.url);

    const apiKey = url.searchParams.get('apiKey');
    if (apiKey !== API_KEY) {
      return new HttpResponse(null, { status: 401, statusText: 'Unauthorized' });
    }

    let body: string;
    try {
      body = await request.text();
    } catch (error) {
      return new HttpResponse(null, { status: 400, statusText: 'Bad Request' });
    }

    const params = new URLSearchParams(body);
    const text = params.get('text');

    if (!text) {
      return new HttpResponse(null, { status: 400, statusText: 'Bad Request' });
    }

    const pdfContent = `Mock PDF content for: ${text}`;
    const blob = new Blob([pdfContent], { type: 'application/pdf' });

    const filename = `document_${Date.now()}.pdf`;

    return new HttpResponse(blob, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    });
  }),
];
