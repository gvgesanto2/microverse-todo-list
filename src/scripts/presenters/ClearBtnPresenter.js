import ClearBtnViewManager from '../views/view-managers/ClearBtnViewManager.js';

export default class ClearBtnPresenter {
  constructor(clearBtnId) {
    this.clearBtnViewManager = new ClearBtnViewManager(clearBtnId);
  }

  init = (handleClick) => {
    this.clearBtnViewManager.addEventHandler(handleClick);
  };
}
