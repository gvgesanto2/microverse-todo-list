import createHtmlElem from '../../utils/createElem.utils.js';
import View from './View.js';

export default class IconBtnView extends View {
  constructor(buttonData) {
    super();
    this.button = buttonData;
  }

  #genBtnIconMarkup = (iconName) => `
    <svg class="a-icon--sm">
      <use xlink:href="#sprite_${iconName}"></use>
    </svg>
  `;

  createElem = () => {
    const {
      extraClasses, moveCursor, iconName, handleClick,
    } = this.button;
    const btnElem = createHtmlElem({
      tag: 'button',
      className: `m-icon-btn ${moveCursor ? 'm-icon-btn--move' : ''} ${extraClasses || ''}`,
    });
    btnElem.type = 'button';
    btnElem.innerHTML = this.#genBtnIconMarkup(iconName);
    btnElem.addEventListener('click', handleClick);
    return btnElem;
  }

  updateIcon = (newIconName) => {
    this.htmlElem.innerHTML = this.#genBtnIconMarkup(newIconName);
  }
}
