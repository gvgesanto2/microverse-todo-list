import { genNewIdForElem, genNewIndexForElem } from '../utils/id.utils.js';
import Task from './Task.js';

export default class TasksList {
  constructor(initialTasks) {
    this.tasks = initialTasks || [];
  }

  get getTasks() {
    return this.tasks;
  }

  findTaskById = (taskId) => this.tasks.find((task) => task.id === taskId);

  toggleTaskIsCompleted = (taskId) => {
    const taskToToggle = this.findTaskById(taskId);
    taskToToggle.isCompleted = !taskToToggle.isCompleted;
    return taskToToggle.isCompleted;
  };

  setTaskDescription = (taskId, newDescription) => {
    this.findTaskById(taskId).description = newDescription;
  };

  createAndAddTask({ description, isCompleted }) {
    const newTask = new Task(
      genNewIndexForElem(this.tasks),
      genNewIdForElem(this.tasks),
      description,
      isCompleted,
    );
    this.tasks.push(newTask);
    return newTask;
  }

  removeTaskById(taskId) {
    this.tasks = this.tasks.filter((task) => task.id !== taskId);
  }

  removeCompletedTasks() {
    const completedTasks = [];
    this.tasks = this.tasks.filter((task) => {
      const filterExpression = task.isCompleted === false;
      if (!filterExpression) {
        completedTasks.push(task);
      }
      return filterExpression;
    });
    this.updateTasksIndexes();
    return completedTasks;
  }

  updateTasksIndexes() {
    this.tasks.forEach((task, index) => {
      task.index = index + 1;
    });
  }
}
