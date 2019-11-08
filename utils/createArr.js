function createArr(length = 10, rangeStart = 0, rangeEnd = 1) {
  const result = [];
  for (let i = 0; i < length; i++) {
    result.push(Math.random() * rangeEnd + rangeStart);
  }

  return result;
}

module.exports = createArr;
