import TasksList from '../models/TasksList.js';
import StorageService from '../services/StorageService.js';
import TasksListView from '../views/TasksListView.js';

export default class TasksListController {
  constructor(tasksListContainerId, tasksStorageKey) {
    this.tasksListContainerId = tasksListContainerId;
    this.storageService = new StorageService(tasksStorageKey);
    this.tasksList = new TasksList(this.storageService.getData());

    const eventHandlers = {
      handleToggleBtn: this.handleToggleIsCompleted,
      handleEditTask: this.handleEditTask,
      handleRemoveTask: () => { console.log('handleRemoveTask'); },
    };
    this.tasksListView = new TasksListView(this.tasksList.getTasks, eventHandlers);
  }

  build = () => {
    this.tasksListView.render(this.tasksListContainerId);
  };

  updateStorage = () => {
    this.storageService.storeData(this.tasksList.getTasks);
  }

  addNewTask = (description) => {
    const newTask = this.tasksList.createAndAddTask({
      description,
      isCompleted: false,
    });
    this.tasksListView.renderNewTask(newTask);
    this.updateStorage();
  };

  handleToggleIsCompleted = (taskId) => {
    const newIsCompleted = this.tasksList.toggleTaskIsCompleted(taskId);
    this.tasksListView.updateTaskIsCompleted(taskId, newIsCompleted);
    this.updateStorage();
  };

  handleEditTask = (taskId, newDescription) => {
    this.tasksList.setTaskDescription(taskId, newDescription);
    this.tasksListView.handleTaskEditingState(taskId);
    this.updateStorage();
  }
}
