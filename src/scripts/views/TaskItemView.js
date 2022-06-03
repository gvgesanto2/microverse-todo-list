import createHtmlElem from '../utils/createElem.utils.js';
import View from './base/View.js';

const TASK_BASE_ID = 'task';
const TOGGLE_BTN_BASE_ID = 'toggle-btn';
const MOVE_BTN_BASE_ID = 'move-btn';
const REMOVE_BTN_BASE_ID = 'remove-btn';

const TASK_ACTIVE_STATE_CLASS = 'o-task--active';
const TASK_EDIT_STATE_CLASS = 'u-is-editing';
const HIDDEN_STATE_CLASS = 'u-is-hidden';

export default class TaskItemView extends View {
  static BASE_ID = TASK_BASE_ID;

  static TOGGLE_BTN_BASE_ID = TOGGLE_BTN_BASE_ID;

  static MOVE_BTN_BASE_ID = MOVE_BTN_BASE_ID;

  static REMOVE_BTN_BASE_ID = REMOVE_BTN_BASE_ID;

  static ACTIVE_STATE_CLASS = TASK_ACTIVE_STATE_CLASS;

  static EDIT_STATE_CLASS = TASK_EDIT_STATE_CLASS;

  static HIDDEN_STATE_CLASS = HIDDEN_STATE_CLASS;

  constructor(task, eventHandlersObj) {
    super();
    this.id = `${TaskItemView.BASE_ID}-${task.id}`;
    this.task = { ...task, baseDescriptionHeight: 2 };
    this.eventHandlers = eventHandlersObj;
  }

  static genToggleBtnMarkup = (isCompleted) => `
      <svg class="a-icon--sm">
        <use xlink:href="#sprite_${isCompleted ? 'check' : 'square'}"></use>
      </svg>
    `;

  createElem = () => {
    const {
      id, description, isCompleted, baseDescriptionHeight,
    } = this.task;

    // Creates an 'li' HTML element for the Task Item
    const taskItem = createHtmlElem({
      tag: 'li',
      id: this.id,
      className: `u-horizontal-flex u-pl--sm u-pr--xsm ${
        isCompleted ? TaskItemView.ACTIVE_STATE_CLASS : ''
      }`,
    });

    // Creates a 'button' HTML element for the Toggle Button
    const toggleBtn = createHtmlElem({
      tag: 'button',
      id: `${TaskItemView.TOGGLE_BTN_BASE_ID}-${this.id}`,
      className: 'm-icon-btn o-task__toggle-btn',
    });
    toggleBtn.type = 'button';
    toggleBtn.innerHTML = TaskItemView.genToggleBtnMarkup(isCompleted);
    toggleBtn.addEventListener('click', () => {
      this.eventHandlers.handleToggleBtn(id);
    });

    // Creates a 'textarea' HTML element for the Task Description
    const taskDescription = createHtmlElem({
      tag: 'textarea',
      className: 'a-data-input a-data-input--textarea',
      style: {
        height: `${baseDescriptionHeight}rem`,
      },
    });
    taskDescription.maxLength = 255;
    taskDescription.ariaLabel = description;
    taskDescription.value = description;
    taskDescription.addEventListener(
      'focus',
      () => { this.eventHandlers.handleOnFocus(id); },
    );
    taskDescription.addEventListener(
      'focusout',
      (event) => {
        event.preventDefault();
        this.eventHandlers.handleEditTask(id, event.target.value);
      },
    );

    // Creates a 'div' HTML element for the Task Button Group
    const taskBtnGroup = createHtmlElem({
      tag: 'div',
      className: 'o-task__btn-group',
    });

    // Creates a 'button' HTML element for the Move Button
    const moveBtn = createHtmlElem({
      tag: 'button',
      id: `${TaskItemView.MOVE_BTN_BASE_ID}-${this.id}`,
      className: 'm-icon-btn m-icon-btn--move',
    });
    moveBtn.innerHTML = `
      <svg class="a-icon--sm">
        <use xlink:href="#sprite_more-vertical"></use>
      </svg>
    `;

    // Creates a 'button' HTML element for the Remove Button
    const removeBtn = createHtmlElem({
      tag: 'button',
      id: `${TaskItemView.REMOVE_BTN_BASE_ID}-${this.id}`,
      className: `m-icon-btn ${TaskItemView.HIDDEN_STATE_CLASS}`,
    });
    removeBtn.innerHTML = `
      <svg class="a-icon--sm">
        <use xlink:href="#sprite_trash-2"></use>
      </svg>
    `;
    removeBtn.addEventListener('click', () => {
      this.eventHandlers.handleRemoveTask(id);
    });

    // Appends all the Task Item's children
    taskBtnGroup.appendChild(moveBtn);
    taskBtnGroup.appendChild(removeBtn);

    taskItem.appendChild(toggleBtn);
    taskItem.appendChild(taskDescription);
    taskItem.appendChild(taskBtnGroup);

    return taskItem;
  };
}
