/**
 * IndexedDB and local storage utility for persistent portfolio editing and file uploads.
 * Handles large image files (base64/data URLs) beyond localStorage's 5MB limit.
 */

const DB_NAME = 'NoorUlAinPortfolioDB';
const DB_VERSION = 1;
const STORE_NAME = 'portfolio_store';
const KEY_DATA = 'portfolio_data';

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB not supported'));
      return;
    }
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function savePortfolioToStorage(data: unknown): Promise<void> {
  try {
    const db = await openDB();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.put(data, KEY_DATA);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch (e) {
    console.warn('IndexedDB failed, falling back to localStorage if size permits', e);
    try {
      localStorage.setItem('noor_ul_ain_portfolio_data', JSON.stringify(data));
    } catch (localStorageErr) {
      console.error('LocalStorage also full or failed', localStorageErr);
    }
  }
}

export async function loadPortfolioFromStorage<T>(fallbackData: T): Promise<T> {
  try {
    const db = await openDB();
    const data = await new Promise<T | undefined>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(KEY_DATA);
      req.onsuccess = () => resolve(req.result as T | undefined);
      req.onerror = () => reject(req.error);
    });
    if (data) {
      return data;
    }
  } catch (e) {
    console.warn('Failed reading from IndexedDB, checking localStorage', e);
  }

  try {
    const local = localStorage.getItem('noor_ul_ain_portfolio_data');
    if (local) {
      return JSON.parse(local) as T;
    }
  } catch {
    // fallback
  }

  return fallbackData;
}

export async function clearPortfolioStorage(): Promise<void> {
  try {
    const db = await openDB();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.delete(KEY_DATA);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch (e) {
    console.warn('Error clearing IndexedDB', e);
  }
  try {
    localStorage.removeItem('noor_ul_ain_portfolio_data');
  } catch {
    // ignore
  }
}

/**
 * Converts a browser File to base64 Data URL for persistent preview & storage
 */
export function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('Failed converting file to string'));
      }
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

/**
 * Export portfolio data to a downloaded JSON file
 */
export function exportPortfolioToFile(data: unknown, filename = 'noor_ul_ain_portfolio.json'): void {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
