import { LOCAL_STORAGE_KEYS } from "./constants";

class Storage {
  static get<T>(key: string, defaultValue?: T): T | null {
    try {
      const item = window.localStorage.getItem(key);
      if (item === null) return defaultValue || null;
      return JSON.parse(item);
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return defaultValue || null;
    }
  }

  static set<T>(key: string, value: T): void {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  }

  static remove(key: string): void {
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.warn(`Error removing localStorage key "${key}":`, error);
    }
  }

  static clear(): void {
    try {
      window.localStorage.clear();
    } catch (error) {
      console.warn("Error clearing localStorage:", error);
    }
  }

  static getToken(): string | null {
    return this.get<string>(LOCAL_STORAGE_KEYS.TOKEN);
  }

  static setToken(token: string): void {
    this.set(LOCAL_STORAGE_KEYS.TOKEN, token);
  }

  static removeToken(): void {
    this.remove(LOCAL_STORAGE_KEYS.TOKEN);
  }

  static getTheme(): string | null {
    return this.get<string>(LOCAL_STORAGE_KEYS.THEME);
  }

  static setTheme(theme: string): void {
    this.set(LOCAL_STORAGE_KEYS.THEME, theme);
  }

  static getUserPreferences(): any {
    return this.get(LOCAL_STORAGE_KEYS.USER_PREFERENCES, {});
  }

  static setUserPreferences(preferences: any): void {
    this.set(LOCAL_STORAGE_KEYS.USER_PREFERENCES, preferences);
  }

  static getLastVisited(): string | null {
    return this.get<string>(LOCAL_STORAGE_KEYS.LAST_VISITED);
  }

  static setLastVisited(path: string): void {
    this.set(LOCAL_STORAGE_KEYS.LAST_VISITED, path);
  }
}

export default Storage;
