/**
 * @jest-environment jsdom
 */

import StorageService from './StorageService.js';

const STORAGE_KEY = 'somekey';
let storageService;

describe('StorageService.storeData Method', () => {
  beforeEach(() => {
    storageService = new StorageService(STORAGE_KEY);
    localStorage.clear();
  });

  it('should be able to store a non-string data', () => {
    const someDataArr = [
      { a: 'some_data' },
      { a: 'other_data' },
    ];

    storageService.storeData(someDataArr);
    const dataStored = JSON.parse(localStorage.getItem(STORAGE_KEY));

    expect(dataStored).toEqual(someDataArr);
  });
});

describe('StorageService.storeStringifiedData Method', () => {
  beforeEach(() => {
    storageService = new StorageService(STORAGE_KEY);
    localStorage.clear();
  });

  it('should be able to store a string data', () => {
    const str = 'some_str';

    storageService.storeStringifiedData(str);
    const dataStored = localStorage.getItem(STORAGE_KEY);

    expect(dataStored).toBe(str);
  });
});

describe('StorageService.getData Method', () => {
  beforeEach(() => {
    storageService = new StorageService(STORAGE_KEY);
    localStorage.clear();
  });

  it('should be able to get a non-string data', () => {
    const someDataArr = [
      { a: 'some_data' },
      { a: 'other_data' },
    ];

    localStorage.setItem(STORAGE_KEY, JSON.stringify(someDataArr));
    const dataStored = storageService.getData();

    expect(dataStored).toEqual(someDataArr);
  });

  it('should return NULL in case of no data with the specified key is found', () => {
    storageService = new StorageService('non-existing-key');

    const storedData = storageService.getData();

    expect(storedData).toBe(null);
  });
});

describe('StorageService.getStringifiedData Method', () => {
  beforeEach(() => {
    storageService = new StorageService(STORAGE_KEY);
    localStorage.clear();
  });

  it('should be able to get a non-string data', () => {
    const str = 'some_str';

    localStorage.setItem(STORAGE_KEY, str);
    const dataStored = storageService.getStringifiedData();

    expect(dataStored).toBe(str);
  });
});
