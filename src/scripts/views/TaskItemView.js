import createHtmlElem from '../utils/createElem.utils.js';
import View from './View.js';

const TASK_BASE_ID = 'task';

export default class TaskItemView extends View {
  static BASE_ID = TASK_BASE_ID;

  constructor(task) {
    super();
    this.id = `${TaskItemView.BASE_ID}-${task.id}`;
    this.task = { ...task, baseDescriptionHeight: 2 };
  }

  createElem = () => {
    const { description, isCompleted, baseDescriptionHeight } = this.task;

    // Creates an 'li' HTML element for the Task Item
    const taskItem = createHtmlElem({
      tag: 'li',
      id: this.id,
      className: 'u-horizontal-flex u-pl--sm u-pr--xsm',
    });

    // Creates a 'button' HTML element for the Toggle Button
    const toggleBtn = createHtmlElem({
      tag: 'button',
      className: `m-icon-btn m-toggle-btn ${
        isCompleted ? 'm-toggle-btn--active' : ''
      }`,
    });
    toggleBtn.type = 'button';
    toggleBtn.innerHTML = `
      <svg class="a-icon--sm">
        <use xlink:href="#sprite_${isCompleted ? 'check' : 'square'}"></use>
      </svg>
    `;

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

    // Creates a 'button' HTML element for the Task Button
    const taskBtn = createHtmlElem({
      tag: 'button',
      className: 'm-icon-btn m-icon-btn--move',
    });
    taskBtn.innerHTML = `
      <svg class="a-icon--sm">
        <use xlink:href="#sprite_more-vertical"></use>
      </svg>
    `;

    // Appends all the Task Item's children
    taskItem.appendChild(toggleBtn);
    taskItem.appendChild(taskDescription);
    taskItem.appendChild(taskBtn);

    return taskItem;
  };
}
