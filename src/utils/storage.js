import { LOCAL_STORAGE_KEYS } from "./constants";

class Storage {
  static get(key, defaultValue) {
    try {
      const item = window.localStorage.getItem(key);
      if (item === null) return defaultValue || null;
      return JSON.parse(item);
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return defaultValue || null;
    }
  }

  static set(key, value) {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  }

  static remove(key) {
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.warn(`Error removing localStorage key "${key}":`, error);
    }
  }

  static clear() {
    try {
      window.localStorage.clear();
    } catch (error) {
      console.warn("Error clearing localStorage:", error);
    }
  }

  static getToken() {
    return this.get(LOCAL_STORAGE_KEYS.TOKEN);
  }

  static setToken(token) {
    this.set(LOCAL_STORAGE_KEYS.TOKEN, token);
  }

  static removeToken() {
    this.remove(LOCAL_STORAGE_KEYS.TOKEN);
  }

  static getTheme() {
    return this.get(LOCAL_STORAGE_KEYS.THEME);
  }

  static setTheme(theme) {
    this.set(LOCAL_STORAGE_KEYS.THEME, theme);
  }

  static getUserPreferences() {
    return this.get(LOCAL_STORAGE_KEYS.USER_PREFERENCES, {});
  }

  static setUserPreferences(preferences) {
    this.set(LOCAL_STORAGE_KEYS.USER_PREFERENCES, preferences);
  }

  static getLastVisited() {
    return this.get(LOCAL_STORAGE_KEYS.LAST_VISITED);
  }

  static setLastVisited(path) {
    this.set(LOCAL_STORAGE_KEYS.LAST_VISITED, path);
  }
}

export default Storage;
