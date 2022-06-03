import createHtmlElem from '../utils/createElem.utils.js';
import TaskItemView from './TaskItemView.js';
import View from './View.js';

const TASKS_LIST_ID = 'tasks-list';

export default class TasksListView extends View {
  constructor(tasks, eventHandlersObj) {
    super();
    this.id = TASKS_LIST_ID;
    this.tasks = tasks;
    this.eventHandlers = {
      ...eventHandlersObj,
      handleOnFocus: this.handleTaskEditingState,
    };
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
      const taskItemView = new TaskItemView(task, this.eventHandlers);
      tasksList.appendChild(taskItemView.createElem());
    });

    return tasksList;
  };

  renderNewTask = (newTask) => {
    const taskItemView = new TaskItemView(newTask, this.eventHandlers);
    taskItemView.render(this.id);
  };

  updateTaskIsCompleted = (taskId, newIsCompleted) => {
    const TASK_ELEM_ID = `${TaskItemView.BASE_ID}-${taskId}`;

    const taskElem = document.getElementById(TASK_ELEM_ID);
    const toggleBtnElem = document.getElementById(
      `${TaskItemView.TOGGLE_BTN_BASE_ID}-${TASK_ELEM_ID}`,
    );

    if (newIsCompleted) {
      taskElem.classList.add(TaskItemView.ACTIVE_STATE_CLASS);
    } else if (taskElem.classList.contains(TaskItemView.ACTIVE_STATE_CLASS)) {
      taskElem.classList.remove(TaskItemView.ACTIVE_STATE_CLASS);
    }
    toggleBtnElem.innerHTML = TaskItemView.genToggleBtnMarkup(newIsCompleted);
  };

  handleTaskEditingState = (taskId) => {
    const TASK_ELEM_ID = `${TaskItemView.BASE_ID}-${taskId}`;

    const taskElem = document.getElementById(TASK_ELEM_ID);
    const removeBtnElem = document.getElementById(
      `${TaskItemView.REMOVE_BTN_BASE_ID}-${TASK_ELEM_ID}`,
    );
    const moveBtnElem = document.getElementById(
      `${TaskItemView.MOVE_BTN_BASE_ID}-${TASK_ELEM_ID}`,
    );

    if (taskElem.classList.contains(TaskItemView.EDIT_STATE_CLASS)) {
      taskElem.classList.remove(TaskItemView.EDIT_STATE_CLASS);

      setTimeout(() => {
        removeBtnElem.classList.add(TaskItemView.HIDDEN_STATE_CLASS);
        if (moveBtnElem.classList.contains(TaskItemView.HIDDEN_STATE_CLASS)) {
          moveBtnElem.classList.remove(TaskItemView.HIDDEN_STATE_CLASS);
        }
      }, 100);
    } else {
      taskElem.classList.add(TaskItemView.EDIT_STATE_CLASS);
      if (removeBtnElem.classList.contains(TaskItemView.HIDDEN_STATE_CLASS)) {
        removeBtnElem.classList.remove(TaskItemView.HIDDEN_STATE_CLASS);
      }
      moveBtnElem.classList.add(TaskItemView.HIDDEN_STATE_CLASS);
    }
  };

  removeTaskFromScreen = (taskId) => {
    const taskElem = document.getElementById(`${TaskItemView.BASE_ID}-${taskId}`);
    taskElem?.remove();
  };
}
