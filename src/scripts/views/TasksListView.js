import createHtmlElem from '../utils/createElem.utils.js';
import TaskItemView from './TaskItemView.js';
import View from './View.js';

const TASKS_LIST_ID = 'tasks-list';

export default class TasksListView extends View {
  constructor(tasks) {
    super();
    this.id = TASKS_LIST_ID;
    this.tasks = tasks;
  }

  createElem = () => {
    // Creates an 'ul' HTML element for the Tasks List
    const tasksList = createHtmlElem({
      tag: 'ul',
      id: this.id,
      className: 'o-todo__list',
    });

    // Creates and appends all the Task Items into the Tasks List
    this.tasks.forEach((task) => {
      const taskItemView = new TaskItemView(task);
      tasksList.appendChild(taskItemView.createElem());
    });

    return tasksList;
  };

  renderNewTask = (newTask) => {
    const taskItemView = new TaskItemView(newTask);
    taskItemView.render(this.id);
  }
}
