/* eslint-disable func-names */
import { HIDDEN_STATE_CLASS } from '../../data/global-classes.data.js';

const addHidingFeatureToView = (viewObj) => {
  viewObj.hide = function () {
    this.htmlElem?.classList.add(HIDDEN_STATE_CLASS);
  };
  viewObj.show = function () {
    if (this.htmlElem && this.htmlElem?.classList.contains(HIDDEN_STATE_CLASS)) {
      this.htmlElem.classList.remove(HIDDEN_STATE_CLASS);
    }
  };
};

export default addHidingFeatureToView;
