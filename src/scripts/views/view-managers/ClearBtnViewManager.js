import ViewManager from './ViewManager.js';

export default class ClearBtnViewManager extends ViewManager {
  addEventHandler = (callback) => {
    this.htmlElem.addEventListener('click', callback);
  };
}
