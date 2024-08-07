import { describe, it, expect, vi, beforeEach } from 'vitest';
import { convertToPdf } from '@/api';

type MockFetch = ReturnType<typeof vi.fn<typeof fetch>>;

const mockFetch = vi.fn() as MockFetch;
global.fetch = mockFetch;

describe('convertToPdf', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should successfully convert text to PDF', async () => {
    const mockArrayBuffer = new ArrayBuffer(8);
    const mockResponse = {
      ok: true,
      arrayBuffer: vi.fn().mockResolvedValue(mockArrayBuffer),
    };
    mockFetch.mockResolvedValue(mockResponse as unknown as Response);

    const result = await convertToPdf('Test text');

    expect(result).toBe(btoa(String.fromCharCode(...new Uint8Array(mockArrayBuffer))));
    expect(mockFetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/pdf',
        },
        body: JSON.stringify({ text: 'Test text' }),
      }),
    );
  });

  it('should handle HTTP errors', async () => {
    mockFetch.mockResolvedValue({
      ok: false,
      status: 400,
    } as Response);

    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const result = await convertToPdf('Test text');

    expect(result).toBeNull();
    expect(consoleSpy).toHaveBeenCalledWith('Error generating PDF:', 'HTTP error! status: 400');
    consoleSpy.mockRestore();
  });

  it('should handle network errors', async () => {
    mockFetch.mockRejectedValue(new Error('Network error'));

    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const result = await convertToPdf('Test text');

    expect(result).toBeNull();
    expect(consoleSpy).toHaveBeenCalledWith('Error generating PDF:', 'Network error');
    consoleSpy.mockRestore();
  });
});
