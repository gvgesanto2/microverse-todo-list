import createHtmlElem from '../../utils/createElem.utils.js';
import View from './View.js';

export default class IconBtnView extends View {
  constructor({ icon, ...otherButtonProps }) {
    super();
    this.button = otherButtonProps;
    this.icon = icon;
  }

  #genBtnIconMarkup = () => `
    <svg class="a-icon--${this.icon.size}">
      <use xlink:href="#sprite_${this.icon.name}"></use>
    </svg>
  `;

  createElem = () => {
    const { extraClasses, moveCursor, handleClick } = this.button;
    const btnElem = createHtmlElem({
      tag: 'button',
      className: `m-icon-btn ${moveCursor ? 'm-icon-btn--move' : ''} ${
        extraClasses || ''
      }`,
    });
    btnElem.type = 'button';
    btnElem.innerHTML = this.#genBtnIconMarkup();
    btnElem.addEventListener('click', handleClick);
    return btnElem;
  };

  updateIcon = (newIconName, newIconSize) => {
    this.icon = {
      name: newIconName || this.icon.name,
      size: newIconSize || this.icon.size,
    };
    this.htmlElem.innerHTML = this.#genBtnIconMarkup();
  };
}
