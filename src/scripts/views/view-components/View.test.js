/**
 * @jest-environment jsdom
 */

import View from './View.js';

const DIV_CONTAINER_ID = 'div-container';
const CREATED_ELEM_CLASS = 'created-elem';

const createDivContainerMock = () => {
  document.body.innerHTML = `
    <div id=${DIV_CONTAINER_ID}></div>
  `;
};

class ViewMock extends View {
  createElem = () => {
    const elem = document.createElement('div');
    elem.className = CREATED_ELEM_CLASS;
    return elem;
  }
}

let view;
let parentElem;

describe('View.appendToParent Method', () => {
  beforeEach(() => {
    view = new ViewMock();
    createDivContainerMock();
    parentElem = document.getElementById(DIV_CONTAINER_ID);
  });

  it('should be able to render/append its HTML element representation into some HTML container', () => {
    view.appendToParent(parentElem);
    const allDivChildren = document.querySelectorAll(`.${CREATED_ELEM_CLASS}`);

    expect(allDivChildren).toHaveLength(1);
  });

  it('should NOT be able to render itself again if it\'s already rendered on the screen', () => {
    const NUM_TO_RENDER = 3;

    for (let i = 0; i < NUM_TO_RENDER; i += 1) {
      view.appendToParent(parentElem);
    }
    const allDivChildren = document.querySelectorAll(`.${CREATED_ELEM_CLASS}`);

    expect(allDivChildren).toHaveLength(1);
  });
});
