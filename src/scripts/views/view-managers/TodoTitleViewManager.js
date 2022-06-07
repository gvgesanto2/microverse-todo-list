import { EDITING_STATE_CLASS } from '../../data/global-classes.data.js';
import ViewManager from './ViewManager.js';

export default class TodoTitleViewManager extends ViewManager {
  constructor(todoTitleId, todoHeaderId) {
    super(todoTitleId);
    this.todoHeader = document.getElementById(todoHeaderId);
    this.state = {
      clickCount: 0,
      editing: false,
    };
  }

  init = (initialTitle, handleUpdateTitleCallback) => {
    this.setTitle(initialTitle);
    this.htmlElem.addEventListener('click', this.handleDoubleClick);
    this.htmlElem.addEventListener('keyup', (event) => {
      if (event.key === 'Enter') {
        this.handleEditTitle(handleUpdateTitleCallback);
      }
    });
    this.htmlElem.addEventListener('focusout', () => {
      this.handleEditTitle(handleUpdateTitleCallback);
    });
  };

  handleEditTitle = (handleUpdateTitleCallback) => {
    this.state.clickCount = 0;
    if (this.state.editing) {
      handleUpdateTitleCallback(this.htmlElem.value);
      this.setEditingStateToDefault();
    }
  }

  setTitle = (newTitle) => {
    this.htmlElem.value = newTitle;
  }

  handleDoubleClick = () => {
    if (this.state.clickCount > 0) {
      this.setEditingStateToActive();
    } else {
      this.state.clickCount += 1;
    }
  }

  setEditingStateToActive = () => {
    if (!this.state.editing) {
      this.todoHeader.classList.add(EDITING_STATE_CLASS);
      this.htmlElem.readOnly = false;
      this.state.editing = true;
    }
  };

  setEditingStateToDefault = () => {
    if (this.state.editing) {
      this.todoHeader.classList.remove(EDITING_STATE_CLASS);
      this.htmlElem.readOnly = true;
      this.state.editing = false;
    }
  };
}
