import StorageService from '../services/StorageService.js';
import TodoTitleViewManager from '../views/view-managers/TodoTitleViewManager.js';

export default class TodoTitlePresenter {
  constructor(todoTitleId, todoHeaderId, todoTitleStorageKey) {
    this.todoTitleViewManager = new TodoTitleViewManager(todoTitleId, todoHeaderId);
    this.storageService = new StorageService(todoTitleStorageKey);
    this.title = this.storageService.getStringifiedData() || 'To-Do List Demo';
  }

  init = () => {
    this.todoTitleViewManager.init(this.title, this.handleUpdateTitle);
  }

  handleUpdateTitle = (newTodoTitle) => {
    this.title = newTodoTitle.trim() !== '' ? newTodoTitle : this.title;
    this.todoTitleViewManager.setTitle(this.title);
    this.storageService.storeStringifiedData(this.title);
  }
}
