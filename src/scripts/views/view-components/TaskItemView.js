import createHtmlElem from '../../utils/createElem.utils.js';
import View from './View.js';
import IconBtnView from './IconBtnView.js';

import { EDITING_STATE_CLASS, HIDDEN_STATE_CLASS } from '../../data/global-classes.data.js';
import addHidingFeatureToView from '../decorators/hiding-feature.decorator.js';

export default class TaskItemView extends View {
  static COMPLETED_STATE_CLASS = 'o-task--active';

  constructor(initialTaskData, eventHandlersObj) {
    super();
    this.initialTaskData = initialTaskData;
    this.eventHandlers = eventHandlersObj;
    this.state = {
      isCompleted: false,
      editing: false,
    };
    this.buttonViews = {};
  }

  #getToggleBtnIconName = () => (this.state.isCompleted ? 'check' : 'square');

  createElem = () => {
    const { id, description, isCompleted } = this.initialTaskData;
    this.state.isCompleted = isCompleted;

    const baseDescriptionHeight = 2;

    // Creates an 'li' HTML element for the Task Item
    const taskItem = createHtmlElem({
      tag: 'li',
      className: `u-horizontal-flex u-pl--sm u-pr--xsm ${
        isCompleted ? TaskItemView.COMPLETED_STATE_CLASS : ''
      }`,
    });

    // Creates a 'button' HTML element for the Toggle Button
    const toggleBtnView = new IconBtnView({
      icon: {
        name: this.#getToggleBtnIconName(),
        size: 'md',
      },
      extraClasses: 'o-task__toggle-btn',
      handleClick: () => {
        this.eventHandlers.handleToggleTaskIsCompleted(id);
      },
    });

    // Creates a 'textarea' HTML element for the Task Description
    const taskDescription = createHtmlElem({
      tag: 'textarea',
      className: 'a-data-input a-data-input--textarea',
      style: {
        height: `${baseDescriptionHeight}rem`,
      },
    });
    taskDescription.readOnly = true;
    taskDescription.maxLength = 255;
    taskDescription.ariaLabel = description;
    taskDescription.value = description;
    taskDescription.addEventListener('focus', (event) => {
      event.target.readOnly = false;
      this.setEditingStateToActive();
    });
    taskDescription.addEventListener('focusout', (event) => {
      event.preventDefault();
      event.target.readOnly = true;
      this.eventHandlers.handleEditTaskDescription(id, event.target.value);
    });

    // Creates a 'div' HTML element for the Task Button Group
    const taskBtnGroup = createHtmlElem({
      tag: 'div',
      className: 'o-task__btn-group',
    });

    // Creates a 'button' HTML element for the Move Button
    const moveBtnView = new IconBtnView({
      icon: {
        name: 'more-vertical',
        size: 'md',
      },
      moveCursor: true,
      handleClick: () => {},
    });
    addHidingFeatureToView(moveBtnView);

    // Creates a 'button' HTML element for the Remove Button
    const removeBtnView = new IconBtnView({
      icon: {
        name: 'trash-2',
        size: 'md',
      },
      extraClasses: `${HIDDEN_STATE_CLASS}`,
      handleClick: () => {
        this.eventHandlers.handleRemoveTask(id);
      },
    });
    addHidingFeatureToView(removeBtnView);

    // Set State Button Views Property
    this.buttonViews.toggleBtn = toggleBtnView;
    this.buttonViews.moveBtn = moveBtnView;
    this.buttonViews.removeBtn = removeBtnView;

    // Appends all the Task Item's children
    moveBtnView.appendToParent(taskBtnGroup);
    removeBtnView.appendToParent(taskBtnGroup);

    toggleBtnView.appendToParent(taskItem);
    taskItem.appendChild(taskDescription);
    taskItem.appendChild(taskBtnGroup);

    return taskItem;
  };

  setIsCompletedState = (newIsCompleted) => {
    if (newIsCompleted !== this.state.isCompleted) {
      if (newIsCompleted) {
        this.htmlElem.classList.add(TaskItemView.COMPLETED_STATE_CLASS);
      } else {
        this.htmlElem.classList.remove(TaskItemView.COMPLETED_STATE_CLASS);
      }
      this.state.isCompleted = newIsCompleted;
      this.buttonViews.toggleBtn.updateIcon(this.#getToggleBtnIconName());
    }
  };

  setEditingStateToActive = () => {
    if (!this.state.editing) {
      this.htmlElem.classList.add(EDITING_STATE_CLASS);
      this.buttonViews.removeBtn.show();
      this.buttonViews.moveBtn.hide();
      this.state.editing = true;
    }
  };

  setEditingStateToDefault = () => {
    if (this.state.editing) {
      this.htmlElem.classList.remove(EDITING_STATE_CLASS);
      setTimeout(() => {
        this.buttonViews.removeBtn.hide();
        this.buttonViews.moveBtn.show();
      }, 150);
      this.state.editing = false;
    }
  };
}
