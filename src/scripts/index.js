import TasksListPresenter from './presenters/TasksListPresenter.js';
import AddTaskFormPresenter from './presenters/AddTaskFormPresenter.js';
import ClearBtnPresenter from './presenters/ClearBtnPresenter.js';

import '../scss/main.scss';
import '../assets/images/icons/sprite.svg';

const TASKS_LIST_CONTAINER_ID = 'tasks-list-container';
const TASKS_LOCAL_STORAGE_KEY = 'tasks';
const ADD_TASK_FORM_ID = 'add-task-form';
const CLEAR_BUTTON_ID = 'clear-btn';

const tasksListPresenter = new TasksListPresenter(
  TASKS_LIST_CONTAINER_ID,
  TASKS_LOCAL_STORAGE_KEY,
);
tasksListPresenter.build();

const addTaskFormPresenter = new AddTaskFormPresenter(
  ADD_TASK_FORM_ID,
  tasksListPresenter,
);
addTaskFormPresenter.init();

const clearBtnPresenter = new ClearBtnPresenter(CLEAR_BUTTON_ID);
clearBtnPresenter.init(tasksListPresenter.handleClearCompletedTasks);
