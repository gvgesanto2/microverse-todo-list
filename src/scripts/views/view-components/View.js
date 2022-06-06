/**
 * Abstract Class View
 * Used as a type of interface for the View Components
 *
 * @class View
 */
export default class View {
  constructor() {
    if (this.constructor === View) {
      throw new Error("Abstract classes can't be instantiated.");
    }
    this.htmlElem = null;
  }

  createElem = () => {
    throw new Error('Method "createElem()" must be implemented.');
  };

  render = (parentElemId) => {
    this.appendToParent(document.getElementById(parentElemId));
  };

  appendToParent = (parentElem) => {
    if (!this.htmlElem) {
      this.htmlElem = this.createElem();
      parentElem.appendChild(this.htmlElem);
    }
  };

  remove = () => {
    this.htmlElem?.remove();
    this.htmlElem = null;
  };
}
