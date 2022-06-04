import TasksListController from './controllers/TasksListController.js';
import AddTaskFormController from './controllers/AddTaskFormController.js';

import '../scss/main.scss';
import '../assets/images/icons/sprite.svg';

const TASKS_LIST_CONTAINER_ID = 'tasks-list-container';
const TASKS_LOCAL_STORAGE_KEY = 'tasks';
const ADD_TASK_FORM_ID = 'add-task-form';
const CLEAR_BUTTON_ID = 'clear-btn';

const tasksListController = new TasksListController(
  TASKS_LIST_CONTAINER_ID,
  CLEAR_BUTTON_ID,
  TASKS_LOCAL_STORAGE_KEY,
);
tasksListController.build();

const addTaskFormController = new AddTaskFormController(
  ADD_TASK_FORM_ID,
  tasksListController,
);
addTaskFormController.init();
