import TasksList from './TasksList.js';

const isArrayUnique = (arr) => Array.isArray(arr) && new Set(arr).size === arr.length;

const DESCRIPTION_EXAMPLE = 'Some Description';

let tasksList;

describe('TasksList.createAndAddTask() Method', () => {
  beforeEach(() => {
    tasksList = new TasksList();
  });
  it('should be able to create and add a new task to the Tasks List', () => {
    const taskToCreate = {
      description: DESCRIPTION_EXAMPLE,
      isCompleted: false,
    };

    const createdTask = tasksList.createAndAddTask(taskToCreate);

    expect(tasksList.getTasks.length).toBe(1);
    expect(createdTask).toHaveProperty('id');
  });

  it('should be able to assign unique IDs for each new created task', () => {
    const taskToCreate = {
      description: DESCRIPTION_EXAMPLE,
      isCompleted: false,
    };
    const createdTasksIds = [];
    const NUM_TASKS_TO_CREATE = 3;

    for (let i = 0; i < NUM_TASKS_TO_CREATE; i += 1) {
      const createdTask = tasksList.createAndAddTask(taskToCreate);
      createdTasksIds.push(createdTask.id);
    }

    expect(tasksList.getTasks.length).toBe(NUM_TASKS_TO_CREATE);
    expect(isArrayUnique(createdTasksIds)).toBeTruthy();
  });
});

describe('TasksList.removeTaskById() Method', () => {
  beforeEach(() => {
    tasksList = new TasksList();
  });
  it('should be able to remove the correct task from the list', () => {
    const taskToCreate = {
      description: DESCRIPTION_EXAMPLE,
      isCompleted: false,
    };
    const createdTasks = [];
    const NUM_TASKS_TO_CREATE = 3;

    for (let i = 0; i < NUM_TASKS_TO_CREATE; i += 1) {
      createdTasks.push(tasksList.createAndAddTask(taskToCreate));
    }
    const taskToRemove = createdTasks[1];
    tasksList.removeTaskById(taskToRemove.id);

    expect(tasksList.getTasks.length).toBe(NUM_TASKS_TO_CREATE - 1);
    expect(tasksList.getTasks).not.toContain(taskToRemove);
  });
});
