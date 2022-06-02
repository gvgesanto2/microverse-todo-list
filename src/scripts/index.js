import '../scss/main.scss';
import '../assets/images/icons/sprite.svg';
import TasksListController from './controllers/TasksListController.js';

const TASKS_LIST_CONTAINER_ID = 'tasks-list-container';

const initialTasks = [
  {
    id: 1,
    description: 'Taks 1',
    isCompleted: false,
  },
  {
    id: 2,
    description: 'Taks 2',
    isCompleted: false,
  },
  {
    id: 3,
    description: 'Taks 3',
    isCompleted: false,
  },
];

const tasksListController = new TasksListController(
  TASKS_LIST_CONTAINER_ID,
  initialTasks,
);
tasksListController.build();
