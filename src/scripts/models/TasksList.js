import { genNewIdForElem } from '../utils/id.utils.js';
import Task from './Task.js';

export default class TasksList {
  constructor(initialTasks) {
    this.tasks = initialTasks || [];
  }

  get getTasks() {
    return this.tasks;
  }

  createAndAddTask({ description, isCompleted }) {
    const newTask = new Task(
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
}
