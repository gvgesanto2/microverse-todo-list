export default class FormViewManager {
  constructor(formId) {
    this.id = formId;
    this.form = document.getElementById(formId);
  }

  addEventHandler = (callback) => {
    this.form.addEventListener('submit', callback);
  };

  getInputValueByName = (inputName) => this.form.elements[inputName].value;

  getInputElems = () => {
    const inputsArr = [];
    Object.values(this.form.elements).forEach((formElem) => {
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
