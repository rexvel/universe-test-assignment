import { renderHook, act } from '@testing-library/react-hooks';
import { useIndexedDB } from '@/hooks';
import { beforeEach, describe, expect, it } from 'vitest';

describe('useIndexedDB', () => {
  const dbName = 'TestDB';
  const storeName = 'TestStore';
  const item = { id: 1, name: 'Test Item' };

  beforeEach(() => {
    return new Promise<void>((resolve, reject) => {
      const deleteRequest = indexedDB.deleteDatabase(dbName);
      deleteRequest.onsuccess = () => resolve();
      deleteRequest.onerror = () => reject(deleteRequest.error);
    });
  });

  it('should initialize the database and set isReady to true', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useIndexedDB({ dbName, storeName }));

    await waitForNextUpdate();

    expect(result.current.isReady).toBe(true);
    expect(result.current.add).toBeDefined();
    expect(result.current.getAll).toBeDefined();
  });

  it('should add an item to the store', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useIndexedDB({ dbName, storeName }));

    await waitForNextUpdate();

    await act(async () => {
      await result.current.add(item);
    });

    const items = await result.current.getAll();

    expect(items).toEqual([item]);
  });

  it('should retrieve all items from the store', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useIndexedDB({ dbName, storeName }));

    await waitForNextUpdate();

    await act(async () => {
      await result.current.add(item);
    });

    const items = await result.current.getAll();

    expect(items).toEqual([item]);
  });
});
