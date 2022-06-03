import FormViewManager from './base/FormViewManager.js';

export default class AddTaskFormViewManager extends FormViewManager {
  getInputDescriptionValue = () => this.getInputValueByName('description');
}
