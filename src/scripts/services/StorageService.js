export default class StorageService {
  constructor(key) {
    this.key = key;
  }

  storeData = (data) => {
    this.storeStringifiedData(JSON.stringify(data));
  };

  getData = () => {
    const dataStored = this.getStringifiedData();
    return dataStored ? JSON.parse(dataStored) : dataStored;
  };

  storeStringifiedData = (dataStringified) => {
    localStorage.setItem(this.key, dataStringified);
  }

  getStringifiedData = () => localStorage.getItem(this.key);
}
