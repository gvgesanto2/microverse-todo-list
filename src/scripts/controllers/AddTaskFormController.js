import AddTaskFormViewManager from '../views/AddTaskFormViewManager.js';

export default class AddTaskFormController {
  constructor(addTaskFormId, tasksListController) {
    this.tasksListController = tasksListController;
    this.addTaskFormViewManager = new AddTaskFormViewManager(addTaskFormId);
  }

  init = () => {
    this.addTaskFormViewManager.addEventHandler((event) => {
      event.preventDefault();
      const inputDescriptionValue = this.addTaskFormViewManager.getInputDescriptionValue();
      this.tasksListController.addNewTask(inputDescriptionValue);
      this.addTaskFormViewManager.clearInputs();
    });
  };
}
