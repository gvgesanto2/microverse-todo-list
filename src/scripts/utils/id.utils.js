export const genNewIdForElem = (elemsArray) => {
  if (elemsArray.length > 0) {
    return elemsArray[elemsArray.length - 1].id + 1;
  }
  return 1;
};

export const genNewIndexForElem = (elemsArray) => {
  if (elemsArray.length > 0) {
    return elemsArray[elemsArray.length - 1].index + 1;
  }
  return 1;
};
