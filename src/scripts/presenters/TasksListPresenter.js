import TasksList from '../models/TasksList.js';
import StorageService from '../services/StorageService.js';
import TasksListView from '../views/view-components/TasksListView.js';

export default class TasksListPresenter {
  constructor(tasksListContainerId, tasksStorageKey) {
    this.tasksListContainerId = tasksListContainerId;
    this.storageService = new StorageService(tasksStorageKey);
    this.tasksList = new TasksList(this.storageService.getData());

    const eventHandlers = {
      handleToggleTaskIsCompleted: this.handleToggleTaskIsCompleted,
      handleEditTaskDescription: this.handleEditTaskDescription,
      handleRemoveTask: this.handleRemoveTask,
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

  handleToggleTaskIsCompleted = (taskId) => {
    const newIsCompleted = this.tasksList.toggleTaskIsCompleted(taskId);
    this.tasksListView.setTaskIsCompletedState(taskId, newIsCompleted);
    this.updateStorage();
  };

  handleEditTaskDescription = (taskId, newDescription) => {
    if (newDescription) {
      this.tasksList.setTaskDescription(taskId, newDescription);
      this.tasksListView.setTaskEditingStateToDefault(taskId);
      this.updateStorage();
    } else {
      this.handleRemoveTask(taskId);
    }
  }

  handleRemoveTask = (taskId) => {
    this.tasksList.removeTaskById(taskId);
    this.tasksListView.removeTaskFromScreen(taskId);
    this.tasksList.updateTasksIndexes();
    this.updateStorage();
  }

  handleClearCompletedTasks = () => {
    const completedTasksRemoved = this.tasksList.removeCompletedTasks();
    completedTasksRemoved.forEach((task) => {
      this.tasksListView.removeTaskFromScreen(task.id);
    });
    this.updateStorage();
  }
}
