import AddTaskFormViewManager from '../views/view-managers/AddTaskFormViewManager.js';

export default class AddTaskFormPresenter {
  constructor(addTaskFormId, tasksListPresenter) {
    this.tasksListPresenter = tasksListPresenter;
    this.addTaskFormViewManager = new AddTaskFormViewManager(addTaskFormId);
  }

  init = () => {
    this.addTaskFormViewManager.addEventHandler((event) => {
      event.preventDefault();
      const inputDescriptionValue = this.addTaskFormViewManager.getInputDescriptionValue();
      this.tasksListPresenter.addNewTask(inputDescriptionValue);
      this.addTaskFormViewManager.clearInputs();
    });
  };
}
