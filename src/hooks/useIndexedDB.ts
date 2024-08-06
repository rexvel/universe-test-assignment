import { useState, useEffect, useCallback } from 'react';

interface UseIndexedDBOptions {
  dbName: string;
  storeName: string;
  version?: number;
}

const useIndexedDB = <T>({ dbName, storeName, version = 1 }: UseIndexedDBOptions) => {
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

      database.addEventListener('versionchange', () => {
        database.close();
        setDb(null);
        setIsReady(false);
      });

      updateCount(database);
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

  const add = useCallback(
    async (item: T): Promise<IDBValidKey> => {
      return new Promise((resolve, reject) => {
        if (!db) {
          reject(new Error('Database not initialized'));
          return;
        }

        const transaction = db.transaction(storeName, 'readwrite');
        const store = transaction.objectStore(storeName);
        const request = store.add(item);

        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve(request.result);
      });
    },
    [db, storeName],
  );

  const getAll = useCallback(async (): Promise<T[]> => {
    return new Promise((resolve, reject) => {
      if (!db) {
        reject(new Error('Database not initialized'));
        return;
      }

      const transaction = db.transaction(storeName, 'readonly');
      const store = transaction.objectStore(storeName);
      const request = store.getAll();

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
    });
  }, [db, storeName]);

  const get = useCallback(
    async (id: IDBValidKey): Promise<T | undefined> => {
      return new Promise((resolve, reject) => {
        if (!db) {
          reject(new Error('Database not initialized'));
          return;
        }

        const transaction = db.transaction(storeName, 'readonly');
        const store = transaction.objectStore(storeName);
        const request = store.get(id);

        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve(request.result);
      });
    },
    [db, storeName],
  );

  const update = useCallback(
    async (id: IDBValidKey, changes: Partial<T>): Promise<IDBValidKey> => {
      return new Promise((resolve, reject) => {
        if (!db) {
          reject(new Error('Database not initialized'));
          return;
        }

        const transaction = db.transaction(storeName, 'readwrite');
        const store = transaction.objectStore(storeName);
        const request = store.get(id);

        request.onerror = () => reject(request.error);
        request.onsuccess = () => {
          const item = { ...request.result, ...changes };
          const updateRequest = store.put(item);
          updateRequest.onerror = () => reject(updateRequest.error);
          updateRequest.onsuccess = () => resolve(updateRequest.result);
        };
      });
    },
    [db, storeName],
  );

  const remove = useCallback(
    async (id: IDBValidKey): Promise<void> => {
      return new Promise((resolve, reject) => {
        if (!db) {
          reject(new Error('Database not initialized'));
          return;
        }

        const transaction = db.transaction(storeName, 'readwrite');
        const store = transaction.objectStore(storeName);
        const request = store.delete(id);

        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve();
      });
    },
    [db, storeName],
  );

  return { add, getAll, get, update, remove, isReady, count };
};

export default useIndexedDB;
