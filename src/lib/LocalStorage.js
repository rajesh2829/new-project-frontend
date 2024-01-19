

class LocalStorage {
    static get(name, localStorageCb, defaultcb) {
      const localStorageValue = localStorage.getItem(name);
      if (localStorageValue) {
        const value = JSON.parse(localStorageValue);
        return localStorageCb(value);
      } else {
        return defaultcb();
      }
    }
    
  }
  export default LocalStorage;
  