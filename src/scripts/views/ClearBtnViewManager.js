export default class ClearBtnViewManager {
  constructor(clearBtnId) {
    this.id = clearBtnId;
    this.clearBtn = document.getElementById(clearBtnId);
  }

  addEventHandler = (callback) => {
    this.clearBtn.addEventListener('click', callback);
  };
}
