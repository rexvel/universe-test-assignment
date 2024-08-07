import { useState, useEffect, useCallback } from 'react';

interface UseIndexedDBOptions {
  dbName: string;
  storeName: string;
  version?: number;
}

export const useIndexedDB = <T>({ dbName, storeName, version = 1 }: UseIndexedDBOptions) => {
  const [db, setDb] = useState<IDBDatabase | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const request = indexedDB.open(dbName, version);

    request.onerror = (event) => {
      console.error('IndexedDB error:', (event.target as IDBOpenDBRequest).error);
    };

    request.onsuccess = (event) => {
      const database = (event.target as IDBOpenDBRequest).result;
      setDb(database);
      setIsReady(true);

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

  const performTransaction = useCallback(
    <R>(mode: IDBTransactionMode, callback: (store: IDBObjectStore) => IDBRequest<R>): Promise<R> => {
      const { promise, resolve, reject } = Promise.withResolvers<R>();

      if (!db) {
        reject(new Error('Database not initialized'));
        return promise;
      }

      const transaction = db.transaction(storeName, mode);
      const store = transaction.objectStore(storeName);
      const request = callback(store);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);

      return promise;
    },
    [db, storeName],
  );

  const add = useCallback(
    (item: T) => performTransaction('readwrite', (store) => store.add(item)),
    [performTransaction],
  );

  const getAll = useCallback(() => performTransaction('readonly', (store) => store.getAll()), [performTransaction]);

  return { add, getAll, isReady };
};
