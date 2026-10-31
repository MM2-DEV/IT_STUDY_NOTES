import { useSyncExternalStore } from "react";

/**
 * A string setting remembered in localStorage and shared by every component that
 * reads it. `isValid` rejects stale or edited values; `fallback` is used for those,
 * on the server, and on the first visit.
 */
export function createStoredValue(key: string, fallback: string, isValid: (value: string) => boolean) {
  const listeners = new Set<() => void>();
  // Fallback when localStorage is unavailable (for example, blocked in private mode).
  let memoryValue = fallback;

  function read(): string {
    try {
      const value = localStorage.getItem(key);
      return value !== null && isValid(value) ? value : fallback;
    } catch {
      return memoryValue;
    }
  }

  function subscribe(listener: () => void) {
    listeners.add(listener);
    window.addEventListener("storage", listener);
    return () => {
      listeners.delete(listener);
      window.removeEventListener("storage", listener);
    };
  }

  function write(value: string) {
    memoryValue = value;
    try {
      localStorage.setItem(key, value);
    } catch {
      // Storage unavailable: memoryValue keeps the choice until the page is reloaded.
    }
    listeners.forEach((listener) => listener());
  }

  return function useStoredValue(): [string, (value: string) => void] {
    const value = useSyncExternalStore(subscribe, read, () => fallback);
    return [value, write];
  };
}
