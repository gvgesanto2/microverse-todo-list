import TasksList from '../models/TasksList.js';
import TasksListView from '../views/TasksListView.js';

export default class TasksListController {
  constructor(tasksListContainerId, initialTasks) {
    this.tasksListContainerId = tasksListContainerId;
    this.tasksList = new TasksList(initialTasks);
    this.tasksListView = new TasksListView(this.tasksList.getTasks);
  }

  build = () => {
    this.tasksListView.render(this.tasksListContainerId);
  }
}
