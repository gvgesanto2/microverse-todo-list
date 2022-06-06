import createHtmlElem from '../../utils/createElem.utils.js';
import TaskItemView from './TaskItemView.js';
import View from './View.js';

export default class TasksListView extends View {
  constructor(initialTasks, eventHandlersObj) {
    super();
    this.initialTasks = initialTasks;
    this.eventHandlersObj = eventHandlersObj;
    this.taskItemViews = {};
  }

  createElem = () => {
    const tasksList = createHtmlElem({
      tag: 'ul',
      className: 'o-todo__list',
    });

    this.initialTasks.forEach((task) => {
      const taskItemView = new TaskItemView(task, this.eventHandlersObj);
      taskItemView.appendToParent(tasksList);
      this.taskItemViews[task.id] = taskItemView;
    });

    return tasksList;
  };

  renderNewTask = (newTask) => {
    const taskItemView = new TaskItemView(newTask, this.eventHandlersObj);
    this.taskItemViews[newTask.id] = taskItemView;
    taskItemView.appendToParent(this.htmlElem);
  };

  setTaskIsCompletedState = (taskId, newIsCompleted) => {
    this.taskItemViews[taskId].setIsCompletedState(newIsCompleted);
  };

  setTaskEditingStateToDefault = (taskId) => {
    this.taskItemViews[taskId].setEditingStateToDefault();
  };

  removeTaskFromScreen = (taskId) => {
    this.taskItemViews[taskId].remove();
    delete this.taskItemViews[taskId];
  };
}
