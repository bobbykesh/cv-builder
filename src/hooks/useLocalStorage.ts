'use client';

import { useState, useEffect, useCallback } from 'react';

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void, () => void] {
  // State to store the value
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize from localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        setStoredValue(JSON.parse(item));
      }
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
    }

    setIsInitialized(true);
  }, [key]);

  // Update localStorage when value changes
  useEffect(() => {
    if (!isInitialized || typeof window === 'undefined') return;

    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue, isInitialized]);

  // Setter function
  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      setStoredValue((prev) => {
        const newValue = value instanceof Function ? value(prev) : value;
        return newValue;
      });
    },
    []
  );

  // Remove function
  const removeValue = useCallback(() => {
    if (typeof window === 'undefined') return;

    try {
      window.localStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  }, [key, initialValue]);

  return [storedValue, setValue, removeValue];
}

// Hook for checking if localStorage is available
export function useLocalStorageAvailable(): boolean {
  const [isAvailable, setIsAvailable] = useState(false);

  useEffect(() => {
    try {
      const test = '__storage_test__';
      window.localStorage.setItem(test, test);
      window.localStorage.removeItem(test);
      setIsAvailable(true);
    } catch {
      setIsAvailable(false);
    }
  }, []);

  return isAvailable;
}

// Hook for storage usage
export function useStorageUsage(): {
  used: number;
  available: number;
  percentage: number;
} {
  const [usage, setUsage] = useState({ used: 0, available: 0, percentage: 0 });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const calculateUsage = () => {
      let used = 0;
      for (const key in window.localStorage) {
        if (Object.prototype.hasOwnProperty.call(window.localStorage, key)) {
          used += (window.localStorage.getItem(key) || '').length * 2; // UTF-16
        }
      }

      const available = 5 * 1024 * 1024; // 5MB typical limit
      const percentage = (used / available) * 100;

      setUsage({ used, available, percentage });
    };

    calculateUsage();

    // Recalculate on storage events
    window.addEventListener('storage', calculateUsage);
    return () => window.removeEventListener('storage', calculateUsage);
  }, []);

  return usage;
}
