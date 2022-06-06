/**
 * Abstract Class ViewManager
 * Used as a type of interface for the ViewManager Components
 *
 * @class ViewManager
 */
export default class ViewManager {
  constructor(viewElemId) {
    if (this.constructor === ViewManager) {
      throw new Error("Abstract classes can't be instantiated.");
    }
    this.htmlElem = document.getElementById(viewElemId);
  }
}
