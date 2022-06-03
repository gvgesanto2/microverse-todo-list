import TasksList from '../models/TasksList.js';
import StorageService from '../services/StorageService.js';
import ClearBtnViewManager from '../views/ClearBtnViewManager.js';
import TasksListView from '../views/TasksListView.js';

export default class TasksListController {
  constructor(tasksListContainerId, clearBtnId, tasksStorageKey) {
    this.tasksListContainerId = tasksListContainerId;
    this.storageService = new StorageService(tasksStorageKey);
    this.tasksList = new TasksList(this.storageService.getData());

    const eventHandlers = {
      handleToggleBtn: this.handleToggleIsCompleted,
      handleEditTask: this.handleEditTask,
      handleRemoveTask: this.handleRemoveTask,
    };
    this.tasksListView = new TasksListView(this.tasksList.getTasks, eventHandlers);

    const clearBtnViewManager = new ClearBtnViewManager(clearBtnId);
    clearBtnViewManager.addEventHandler(this.handleClearCompletedTasks);
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
    if (newDescription) {
      this.tasksList.setTaskDescription(taskId, newDescription);
      this.tasksListView.handleTaskEditingState(taskId);
      this.updateStorage();
    } else {
      this.handleRemoveTask(taskId);
    }
  }

  handleRemoveTask = (taskId) => {
    this.tasksListView.removeTaskFromScreen(taskId);
    this.tasksList.removeTaskById(taskId);
    this.tasksList.updateTasksIndexes();
    this.updateStorage();
  }

  handleClearCompletedTasks = () => {
    const completedTasksRemoved = this.tasksList.removeCompletedTasks();
    console.log(completedTasksRemoved);
    completedTasksRemoved.forEach((task) => {
      this.tasksListView.removeTaskFromScreen(task.id);
    });
    this.updateStorage();
  }
}
