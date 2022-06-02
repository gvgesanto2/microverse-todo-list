import FormViewManager from './FormViewManager.js';

export default class AddTaskFormViewManager extends FormViewManager {
  getInputDescriptionValue = () => this.getInputValueByName('description');
}
