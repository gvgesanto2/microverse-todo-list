const createHtmlElem = ({
  tag, className, id, style, text,
}) => {
  const elem = document.createElement(tag);
  if (className) {
    elem.className = className;
  }

  if (id) {
    elem.id = id;
  }

  if (style) {
    Object.keys(style).forEach((propKey) => {
      elem.style[propKey] = style[propKey];
    });
  }

  if (text) {
    const textNode = document.createTextNode(text);
    elem.appendChild(textNode);
  }

  return elem;
};

export default createHtmlElem;
