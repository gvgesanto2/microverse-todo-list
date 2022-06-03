export default class StorageService {
  constructor(key) {
    this.key = key;
  }

  storeData = (data) => {
    localStorage.setItem(this.key, JSON.stringify(data));
  };

  getData = () => {
    const dataStored = localStorage.getItem(this.key);
    return dataStored ? JSON.parse(dataStored) : dataStored;
  };
}
