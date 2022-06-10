/**
 * @jest-environment jsdom
 */

/* eslint-disable max-classes-per-file */

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
  };
}

class ViewWithNoCreateElemImplementation extends View {}

let view;
let parentElem;

describe('View.constructor() Method', () => {
  it('should NOT be able to create an instance of the Abstract View class', () => {
    expect(() => new View()).toThrow(Error);
  });
});

describe('View.createElem() Method', () => {
  it('should NOT be able to call an abstract method before implementing it in the subclass', () => {
    expect(() => new ViewWithNoCreateElemImplementation().createElem()).toThrow(Error);
  });
});

describe('View.appendToParent() Method', () => {
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

  it("should NOT be able to render itself again if it's already rendered on the screen", () => {
    const NUM_TO_RENDER = 3;

    for (let i = 0; i < NUM_TO_RENDER; i += 1) {
      view.appendToParent(parentElem);
    }
    const allDivChildren = document.querySelectorAll(`.${CREATED_ELEM_CLASS}`);

    expect(allDivChildren).toHaveLength(1);
  });
});

describe('View.render() Method', () => {
  beforeEach(() => {
    view = new ViewMock();
    createDivContainerMock();
  });
  it('should gets parents id and appends element to the screen', () => {
    view.render(DIV_CONTAINER_ID);

    const childrenOfDiv = document.querySelectorAll(`.${CREATED_ELEM_CLASS}`);
    expect(childrenOfDiv).toHaveLength(1);
  });
});

const NUM_CHILDREN = 4;
let viewHtmlElem;

describe('View.remove() Method', () => {
  beforeEach(() => {
    view = new ViewMock();
    viewHtmlElem = view.createElem();
    Object.defineProperty(view, 'htmlElem', {
      value: viewHtmlElem,
    });
    createDivContainerMock();
    parentElem = document.getElementById(DIV_CONTAINER_ID);

    for (let i = 0; i < NUM_CHILDREN - 1; i += 1) {
      const otherViewObj = new ViewMock();
      const otherViewHtmlElem = otherViewObj.createElem();
      parentElem.appendChild(otherViewHtmlElem);
    }

    parentElem.appendChild(viewHtmlElem);
  });

  it('should be able to remove the right HTML element from the screen', () => {
    view.remove();
    const allDivChildren = document.querySelectorAll(`.${CREATED_ELEM_CLASS}`);

    expect(allDivChildren).toHaveLength(NUM_CHILDREN - 1);
    expect(allDivChildren).not.toContain(viewHtmlElem);
  });
});
