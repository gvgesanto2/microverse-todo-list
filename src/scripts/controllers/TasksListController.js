import TasksList from '../models/TasksList.js';
import StorageService from '../services/StorageService.js';
import TasksListView from '../views/TasksListView.js';

export default class TasksListController {
  constructor(tasksListContainerId, tasksStorageKey) {
    this.tasksListContainerId = tasksListContainerId;
    this.storageService = new StorageService(tasksStorageKey);
    this.tasksList = new TasksList(this.storageService.getData());
    this.tasksListView = new TasksListView(this.tasksList.getTasks);
  }

  build = () => {
    this.tasksListView.render(this.tasksListContainerId);
  };

  addNewTask = (description) => {
    const newTask = this.tasksList.createAndAddTask({
      description,
      isCompleted: false,
    });
    this.tasksListView.renderNewTask(newTask);
    this.storageService.storeData(this.tasksList.getTasks);
  };
}
