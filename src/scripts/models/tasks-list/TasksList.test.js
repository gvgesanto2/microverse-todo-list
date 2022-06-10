import TasksList from './TasksList.js';

const isArrayUnique = (arr) => Array.isArray(arr) && new Set(arr).size === arr.length;

const DESCRIPTION_EXAMPLE = 'Some Description';

let tasksList;
let fakeTasks;

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

describe('TasksList.findTaskById() Method', () => {
  beforeEach(() => {
    fakeTasks = [
      {
        id: 1, description: 'description 1', isCompleted: false, index: 1,
      },
      {
        id: 2, description: 'description 2', isCompleted: false, index: 2,
      },
      {
        id: 3, description: 'description 3', isCompleted: false, index: 3,
      },
    ];
    tasksList = new TasksList();
    Object.defineProperty(tasksList, 'tasks', {
      value: fakeTasks,
    });
  });
  it('should be able to find and return the right task from the list', () => {
    const taskToFindId = 2;

    const foundTask = tasksList.findTaskById(taskToFindId);

    expect(foundTask).toBe(fakeTasks[taskToFindId - 1]);
  });
});

describe('TasksList.toggleTaskIsCompleted() Method', () => {
  beforeEach(() => {
    fakeTasks = [
      {
        id: 1, description: 'description 1', isCompleted: false, index: 1,
      },
      {
        id: 2, description: 'description 2', isCompleted: false, index: 2,
      },
    ];
    const mockFindTaskById = (taskId) => fakeTasks[taskId - 1];
    tasksList = new TasksList();
    Object.defineProperty(tasksList, 'findTaskById', {
      value: mockFindTaskById,
    });
  });
  it('should be able to toggle the isCompleted property value of the right task', () => {
    const taskToToggleId = 2;
    const taskArrIndex = taskToToggleId - 1;
    const currIsCompleted = fakeTasks[taskArrIndex].isCompleted;

    tasksList.toggleTaskIsCompleted(taskToToggleId);
    const newIsCompleted = fakeTasks[taskArrIndex].isCompleted;

    expect(newIsCompleted).toBe(!currIsCompleted);
  });
});

describe('TasksList.setTaskDescription() Method', () => {
  beforeEach(() => {
    fakeTasks = [
      {
        id: 1, description: 'description 1', isCompleted: false, index: 1,
      },
      {
        id: 2, description: 'description 2', isCompleted: false, index: 2,
      },
    ];
    const mockFindTaskById = (taskId) => fakeTasks[taskId - 1];
    tasksList = new TasksList();
    Object.defineProperty(tasksList, 'findTaskById', {
      value: mockFindTaskById,
    });
  });
  it('should be able to set the description of the right task', () => {
    const taskId = 2;
    const taskArrIndex = taskId - 1;
    const NEW_DESCRIPTION = 'NEW_DESCRIPTION';

    tasksList.setTaskDescription(taskId, NEW_DESCRIPTION);
    const newDescription = fakeTasks[taskArrIndex].description;

    expect(newDescription).toBe(NEW_DESCRIPTION);
  });
});

describe('TasksList.updateTasksIndexes() Method', () => {
  beforeEach(() => {
    fakeTasks = [
      {
        id: 1, description: 'description 1', isCompleted: true, index: 0,
      },
      {
        id: 2, description: 'description 2', isCompleted: false, index: 3,
      },
      {
        id: 3, description: 'description 3', isCompleted: true, index: 1,
      },
    ];
    tasksList = new TasksList();
    Object.defineProperty(tasksList, 'tasks', {
      value: fakeTasks,
    });
  });
  it('should be able to update the tasks indexes', () => {
    const expectedIndexes = [1, 2, 3];

    tasksList.updateTasksIndexes();
    const tasksIndexes = tasksList.getTasks.map((task) => task.index);

    expect(tasksIndexes).toEqual(expectedIndexes);
  });
});

describe('TasksList.removeCompletedTasks() Method', () => {
  beforeEach(() => {
    fakeTasks = [
      {
        id: 1, description: 'description 1', isCompleted: true, index: 1,
      },
      {
        id: 2, description: 'description 2', isCompleted: false, index: 2,
      },
      {
        id: 3, description: 'description 3', isCompleted: true, index: 3,
      },
      {
        id: 4, description: 'description 4', isCompleted: true, index: 4,
      },
      {
        id: 5, description: 'description 5', isCompleted: false, index: 5,
      },
    ];
    tasksList = new TasksList();
    Object.defineProperty(tasksList, 'tasks', {
      value: fakeTasks,
    });
    Object.defineProperty(tasksList, 'updateTasksIndexes', {
      value: () => {},
    });
  });
  it('should be able to remove all completed tasks', () => {
    const NUM_COMPLETED_TASKS = 3;
    const initialTasksLength = tasksList.getTasks.length;

    const hasCompletedTasks = (tasks) => tasks.some((task) => task.isCompleted);

    tasksList.removeCompletedTasks();

    expect(tasksList.getTasks).toHaveLength(initialTasksLength - NUM_COMPLETED_TASKS);
    expect(hasCompletedTasks(tasksList.getTasks)).toBe(false);
  });
});
