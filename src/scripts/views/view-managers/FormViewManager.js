import ViewManager from './ViewManager.js';

export default class FormViewManager extends ViewManager {
  addEventHandler = (callback) => {
    this.htmlElem.addEventListener('submit', callback);
  };

  getInputValueByName = (inputName) => this.htmlElem.elements[inputName].value;

  getInputElems = () => {
    const inputsArr = [];
    Object.values(this.htmlElem.elements).forEach((formElem) => {
      if (formElem.nodeName !== 'BUTTON' && !inputsArr.includes(formElem)) {
        inputsArr.push(formElem);
      }
    });
    return inputsArr;
  };

  clearInputs = () => {
    const inputElems = this.getInputElems();
    inputElems.forEach((input) => {
      input.value = '';
    });
  };
}
