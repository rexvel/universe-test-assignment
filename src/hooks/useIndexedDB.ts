import { useState, useEffect, useCallback } from 'react';

interface UseIndexedDBOptions {
  dbName: string;
  storeName: string;
  version?: number;
}

export const useIndexedDB = <T>({ dbName, storeName, version = 1 }: UseIndexedDBOptions) => {
  const [db, setDb] = useState<IDBDatabase | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    const request = indexedDB.open(dbName, version);

    request.onerror = (event) => {
      console.error('IndexedDB error:', (event.target as IDBOpenDBRequest).error);
    };

    request.onsuccess = (event) => {
      const database = (event.target as IDBOpenDBRequest).result;
      setDb(database);
      setIsReady(true);
      updateCount(database);

      database.addEventListener('versionchange', () => {
        database.close();
        setDb(null);
        setIsReady(false);
      });
    };

    request.onupgradeneeded = (event) => {
      const database = (event.target as IDBOpenDBRequest).result;
      if (!database.objectStoreNames.contains(storeName)) {
        database.createObjectStore(storeName, { keyPath: 'id', autoIncrement: true });
      }
    };

    return () => {
      db?.close();
    };
  }, [dbName, storeName, version]);

  const updateCount = useCallback(
    (database: IDBDatabase) => {
      const transaction = database.transaction(storeName, 'readonly');
      const store = transaction.objectStore(storeName);
      const countRequest = store.count();
      countRequest.onsuccess = () => {
        setCount(countRequest.result);
      };
    },
    [storeName],
  );

  const performTransaction = useCallback(
    <R>(mode: IDBTransactionMode, callback: (store: IDBObjectStore) => IDBRequest<R>): Promise<R> => {
      return new Promise((resolve, reject) => {
        if (!db) {
          reject(new Error('Database not initialized'));
          return;
        }

        const transaction = db.transaction(storeName, mode);
        const store = transaction.objectStore(storeName);
        const request = callback(store);

        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve(request.result);
      });
    },
    [db, storeName],
  );

  const add = useCallback(
    (item: T) => performTransaction('readwrite', (store) => store.add(item)),
    [performTransaction],
  );

  const getAll = useCallback(() => performTransaction('readonly', (store) => store.getAll()), [performTransaction]);

  const get = useCallback(
    (id: IDBValidKey) => performTransaction('readonly', (store) => store.get(id)),
    [performTransaction],
  );

  const update = useCallback(
    async (id: IDBValidKey, changes: Partial<T>): Promise<IDBValidKey> => {
      const item = (await get(id)) as T;
      if (!item) throw new Error('Item not found');
      return performTransaction('readwrite', (store) => store.put({ ...item, ...changes }));
    },
    [get, performTransaction],
  );

  const remove = useCallback(
    (id: IDBValidKey) => performTransaction('readwrite', (store) => store.delete(id)),
    [performTransaction],
  );

  return { add, getAll, get, update, remove, isReady, count };
};
