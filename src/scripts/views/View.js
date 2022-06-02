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
  }

  createElem = () => {
    throw new Error('Method "createElem()" must be implemented.');
  };

  render = (parentElemId) => {
    const parentElem = document.getElementById(parentElemId);
    parentElem.appendChild(this.createElem());
  };
}
